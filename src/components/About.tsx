'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

const capabilities = [
  {
    icon: '01',
    title: 'Cloud Native',
    desc: 'Multi-cloud expertise across AWS and Azure. Production-grade infrastructure automated with Terraform, cutting setup time by 40%.',
    color: 'var(--accent-indigo)',
  },
  {
    icon: '02',
    title: 'Automation First',
    desc: 'CI/CD pipelines and automation workflows that reduced deployment incidents by 30% and accelerated release cycles across teams.',
    color: 'var(--accent-violet)',
  },
  {
    icon: '03',
    title: 'Production Focused',
    desc: 'Monitoring, incident management, and performance tuning that reduced response time by 35% through proactive alerting.',
    color: 'var(--accent-cyan)',
  },
];

const metrics = [
  { value: '99.98%', label: 'Uptime', color: 'var(--accent-emerald)' },
  { value: '+40%', label: 'Deploy Speed', color: 'var(--accent-indigo)' },
  { value: '-35%', label: 'MTTR', color: 'var(--accent-cyan)' },
  { value: '12%', label: 'Cost Savings', color: 'var(--accent-amber)' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.section} id="about" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label">About</span>
          <h2 className="section-title">
            Engineering Reliability <span className="gradient-text">at Scale</span>
          </h2>
          <p className={styles.intro}>
            Over 5 years building production systems for banking, education, and enterprise —
            infrastructure that just works, monitored and automated to let teams focus on what matters.
          </p>
        </motion.div>

        {/* Metrics dashboard */}
        <div className={styles.metricsRow}>
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className={styles.metricCard}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
            >
              <span className={styles.metricValue} style={{ color: m.color }}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Capability cards */}
        <div className={styles.cards}>
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              className={styles.card}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 3}
            >
              <span className={styles.cardNumber} style={{ color: cap.color }}>{cap.icon}</span>
              <h3 className={styles.cardTitle}>{cap.title}</h3>
              <p className={styles.cardDesc}>{cap.desc}</p>
              <div className={styles.cardLine} style={{ background: cap.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
