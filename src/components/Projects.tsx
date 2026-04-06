'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './Projects.module.css';

const projects = [
  {
    title: 'Banking Platform Infrastructure',
    category: 'Cloud & IaC',
    desc: 'Automated provisioning of AWS infrastructure for banking workloads using Terraform. Achieved 40% faster environment setup with full compliance.',
    impact: ['40% faster provisioning', '99.98% uptime', 'Full audit compliance'],
    techs: ['AWS', 'Terraform', 'CloudFormation', 'Python'],
    color: '#6366f1',
  },
  {
    title: 'Proactive Monitoring & Incident Automation',
    category: 'Observability',
    desc: 'Built comprehensive monitoring dashboards and automated incident detection, reducing mean time to resolution by 35% across production systems.',
    impact: ['35% MTTR reduction', 'Proactive alerting', 'Automated runbooks'],
    techs: ['CloudWatch', 'Splunk', 'Grafana', 'Bash'],
    color: '#10b981',
  },
  {
    title: 'Enterprise CI/CD Pipeline',
    category: 'DevOps',
    desc: 'Designed and maintained CI/CD pipelines supporting multi-team releases. Reduced deployment incidents by 30% through automated validation gates.',
    impact: ['30% fewer incidents', 'Multi-team support', 'Automated gates'],
    techs: ['Jenkins', 'Azure DevOps', 'Git', 'Docker'],
    color: '#06b6d4',
  },
  {
    title: 'Batch Processing & Job Orchestration',
    category: 'Automation',
    desc: 'Managed enterprise batch scheduling for academic data pipelines, maintaining 99.9% job completion rates serving millions of student records.',
    impact: ['99.9% completion rate', 'Millions of records', '95% SLA adherence'],
    techs: ['AutoSys', 'SQL', 'Shell', 'ServiceNow'],
    color: '#8b5cf6',
  },
  {
    title: 'Cloud Cost Optimization',
    category: 'FinOps',
    desc: 'Analyzed cloud resource usage and drove Reserved Instance adoption, right-sizing, and cleanup automation to achieve measurable cost savings.',
    impact: ['12% cost reduction', 'RI adoption', 'Resource cleanup'],
    techs: ['AWS Cost Explorer', 'Python', 'Terraform', 'CloudWatch'],
    color: '#f59e0b',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className={styles.section} id="projects" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">
            Real-World <span className="gradient-text">Impact</span>
          </h2>
          <p className={styles.intro}>
            Infrastructure, automation, and reliability work with measurable outcomes.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              className={styles.card}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                borderColor: hoveredIdx === i ? `${proj.color}33` : undefined,
              }}
            >
              {/* Top accent */}
              <div
                className={styles.cardAccent}
                style={{ background: `linear-gradient(90deg, ${proj.color}, transparent)` }}
              />

              <div className={styles.cardCategory} style={{ color: proj.color }}>
                {proj.category}
              </div>
              <h3 className={styles.cardTitle}>{proj.title}</h3>
              <p className={styles.cardDesc}>{proj.desc}</p>

              <div className={styles.impactList}>
                {proj.impact.map((imp) => (
                  <div key={imp} className={styles.impactItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={proj.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{imp}</span>
                  </div>
                ))}
              </div>

              <div className={styles.techRow}>
                {proj.techs.map((t) => (
                  <span key={t} className={styles.techTag}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
