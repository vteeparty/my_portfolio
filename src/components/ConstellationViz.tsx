'use client';

import { useEffect, useRef } from 'react';
import styles from './ConstellationViz.module.css';

interface Node {
  x: number;
  y: number;
  label: string;
  category: string;
  size: number;
}

const NODES: Node[] = [
  // Cloud
  { x: 200, y: 80, label: 'AWS', category: 'cloud', size: 20 },
  { x: 340, y: 60, label: 'Azure', category: 'cloud', size: 18 },
  { x: 120, y: 160, label: 'EC2', category: 'cloud', size: 12 },
  { x: 300, y: 170, label: 'S3', category: 'cloud', size: 11 },
  // IaC
  { x: 80, y: 260, label: 'Terraform', category: 'iac', size: 17 },
  { x: 220, y: 220, label: 'Docker', category: 'iac', size: 16 },
  { x: 360, y: 240, label: 'K8s', category: 'iac', size: 16 },
  // CI/CD
  { x: 140, y: 340, label: 'Jenkins', category: 'cicd', size: 15 },
  { x: 290, y: 320, label: 'Git', category: 'cicd', size: 14 },
  { x: 400, y: 340, label: 'CI/CD', category: 'cicd', size: 13 },
  // Monitoring
  { x: 60, y: 420, label: 'Splunk', category: 'monitor', size: 14 },
  { x: 200, y: 400, label: 'Grafana', category: 'monitor', size: 13 },
  { x: 350, y: 420, label: 'CloudWatch', category: 'monitor', size: 14 },
  // Scripting
  { x: 130, y: 480, label: 'Python', category: 'script', size: 15 },
  { x: 280, y: 490, label: 'Bash', category: 'script', size: 13 },
  { x: 400, y: 470, label: 'SQL', category: 'script', size: 12 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 3],
  [0, 4], [0, 5], [1, 6],
  [4, 5], [5, 6],
  [5, 7], [5, 8], [6, 9],
  [7, 8], [8, 9],
  [7, 10], [8, 11], [9, 12],
  [10, 11], [11, 12],
  [10, 13], [11, 14], [12, 15],
  [13, 14], [14, 15],
];

const CATEGORY_COLORS: Record<string, string> = {
  cloud: '#6366f1',
  iac: '#8b5cf6',
  cicd: '#06b6d4',
  monitor: '#10b981',
  script: '#f59e0b',
};

export default function ConstellationViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 480;
    const H = 560;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    let time = 0;
    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw connections
      CONNECTIONS.forEach(([a, b]) => {
        const na = NODES[a];
        const nb = NODES[b];
        const midX = (na.x + nb.x) / 2;
        const midY = (na.y + nb.y) / 2;
        const distToMouse = Math.hypot(midX - mx, midY - my);
        const proximity = Math.max(0, 1 - distToMouse / 200);
        const baseAlpha = 0.06 + proximity * 0.12;

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${baseAlpha})`;
        ctx.lineWidth = 0.5 + proximity * 0.8;
        ctx.stroke();

        // Animated particle along line
        const t = (time * 0.5 + a * 0.1) % 1;
        const px = na.x + (nb.x - na.x) * t;
        const py = na.y + (nb.y - na.y) * t;
        ctx.beginPath();
        ctx.arc(px, py, 1 + proximity, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${0.15 + proximity * 0.3})`;
        ctx.fill();
      });

      // Draw nodes
      NODES.forEach((node, i) => {
        const distToMouse = Math.hypot(node.x - mx, node.y - my);
        const proximity = Math.max(0, 1 - distToMouse / 150);
        const breathe = Math.sin(time * 2 + i * 0.5) * 0.15;
        const color = CATEGORY_COLORS[node.category];
        const r = node.size * (0.35 + proximity * 0.25 + breathe * 0.05);

        // Glow
        if (proximity > 0.1) {
          const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3);
          grad.addColorStop(0, color + '30');
          grad.addColorStop(1, color + '00');
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color + (proximity > 0.3 ? 'cc' : '66');
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 3 + proximity * 3, 0, Math.PI * 2);
        ctx.strokeStyle = color + (proximity > 0.1 ? '40' : '15');
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        const labelAlpha = 0.4 + proximity * 0.6;
        ctx.font = `${proximity > 0.3 ? '600' : '500'} ${10 + proximity * 2}px Inter, system-ui, sans-serif`;
        ctx.fillStyle = `rgba(245, 245, 245, ${labelAlpha})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y + r + 14);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.legend}>
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: color }} />
            <span className={styles.legendLabel}>
              {cat === 'cloud' ? 'Cloud' : cat === 'iac' ? 'IaC' : cat === 'cicd' ? 'CI/CD' : cat === 'monitor' ? 'Monitoring' : 'Scripting'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
