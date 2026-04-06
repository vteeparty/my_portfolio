'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Experience.module.css';

const experiences = [
  {
    current: true,
    title: 'DevOps & Cloud Engineer',
    company: 'Silicon Valley Bank',
    location: 'Austin, TX',
    period: 'Nov 2023 — Present',
    desc: 'Engineering infrastructure automation and production reliability for banking workloads on AWS. Focused on IaC, monitoring, cost optimization, and incident reduction.',
    techs: ['AWS', 'Terraform', 'CloudWatch', 'Python', 'Aurora'],
    metrics: [
      { value: '40%', label: 'Faster Setup' },
      { value: '35%', label: 'Faster MTTR' },
      { value: '12%', label: 'Cost Savings' },
    ],
  },
  {
    current: false,
    title: 'DevOps Support Engineer',
    company: 'Miraki Technologies (Energizer)',
    location: 'Hyderabad, India',
    period: 'Feb 2020 — Sep 2022',
    desc: 'Supported Azure DevOps CI/CD pipelines for manufacturing and retail applications. Automated environment validation and improved release consistency.',
    techs: ['Azure DevOps', 'Azure Monitor', 'Bash', 'Git'],
    metrics: [
      { value: '30%', label: 'Fewer Incidents' },
      { value: '99.9%', label: 'Job Completion' },
      { value: '95%', label: 'SLA Met' },
    ],
  },
  {
    current: false,
    title: 'Production Support Engineer',
    company: 'Miraki Technologies (Savvas Learning)',
    location: 'Hyderabad, India',
    period: 'Feb 2020 — Sep 2022',
    desc: 'Managed enterprise batch scheduling and production support for academic data pipelines serving millions of students.',
    techs: ['AutoSys', 'SQL', 'Grafana', 'ServiceNow'],
    metrics: [],
  },
];

const education = [
  { degree: 'M.S. Information Technology & Management', school: 'Webster University, Orlando, FL', icon: 'MS' },
  { degree: 'B.E. Electronics & Communication', school: 'Pragati Engineering College, India', icon: 'BE' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.section} id="experience" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label">Career</span>
          <h2 className="section-title">
            Experience <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className={styles.timelineItem}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
            >
              <div className={styles.timelineDot}>
                {exp.current && <span className={styles.dotPulse} />}
              </div>
              <div className={styles.timelineCard}>
                <div className={styles.cardTop}>
                  <div>
                    {exp.current && <span className={styles.currentBadge}>Current</span>}
                    <h3 className={styles.role}>{exp.title}</h3>
                    <p className={styles.company}>{exp.company} <span className={styles.loc}>· {exp.location}</span></p>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <p className={styles.desc}>{exp.desc}</p>
                <div className={styles.techs}>
                  {exp.techs.map((t) => (
                    <span key={t} className={styles.tech}>{t}</span>
                  ))}
                </div>
                {exp.metrics.length > 0 && (
                  <div className={styles.metricsRow}>
                    {exp.metrics.map((m) => (
                      <div key={m.label} className={styles.metric}>
                        <span className={styles.metricVal}>{m.value}</span>
                        <span className={styles.metricLabel}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          className={styles.eduSection}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={5}
        >
          <h3 className={styles.eduTitle}>Education</h3>
          <div className={styles.eduGrid}>
            {education.map((edu) => (
              <div key={edu.icon} className={styles.eduCard}>
                <span className={styles.eduIcon}>{edu.icon}</span>
                <div>
                  <span className={styles.eduDegree}>{edu.degree}</span>
                  <span className={styles.eduSchool}>{edu.school}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
