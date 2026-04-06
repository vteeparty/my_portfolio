'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Skills.module.css';

interface SkillCategory {
  title: string;
  color: string;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Cloud Platforms',
    color: '#6366f1',
    skills: [
      { name: 'AWS', level: 92 },
      { name: 'Azure', level: 85 },
      { name: 'EC2 / S3 / RDS', level: 90 },
      { name: 'IAM / VPC', level: 88 },
    ],
  },
  {
    title: 'IaC & Containers',
    color: '#8b5cf6',
    skills: [
      { name: 'Terraform', level: 90 },
      { name: 'CloudFormation', level: 82 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 78 },
    ],
  },
  {
    title: 'CI/CD & DevOps',
    color: '#06b6d4',
    skills: [
      { name: 'Jenkins', level: 88 },
      { name: 'Azure DevOps', level: 85 },
      { name: 'Git / GitHub', level: 92 },
      { name: 'Release Mgmt', level: 86 },
    ],
  },
  {
    title: 'Monitoring',
    color: '#10b981',
    skills: [
      { name: 'CloudWatch', level: 90 },
      { name: 'Splunk', level: 82 },
      { name: 'Grafana', level: 80 },
      { name: 'Incident Mgmt', level: 88 },
    ],
  },
  {
    title: 'Scripting & DB',
    color: '#f59e0b',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Bash', level: 90 },
      { name: 'SQL', level: 82 },
      { name: 'Oracle / Aurora', level: 78 },
    ],
  },
  {
    title: 'OS & Security',
    color: '#f43f5e',
    skills: [
      { name: 'Linux', level: 92 },
      { name: 'Windows Server', level: 80 },
      { name: 'SSH / SSL/TLS', level: 85 },
      { name: 'ServiceNow / Jira', level: 82 },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div className={styles.skillItem} ref={ref}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.skillTrack}>
        <motion.div
          className={styles.skillFill}
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] as any }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.section} id="skills" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label">Expertise</span>
          <h2 className="section-title">
            Technical <span className="gradient-text">Universe</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className={styles.card}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardDot} style={{ background: cat.color }} />
                <h3 className={styles.cardTitle}>{cat.title}</h3>
              </div>
              <div className={styles.skillList}>
                {cat.skills.map((skill, j) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    delay={0.1 + j * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          className={styles.certs}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={8}
        >
          <h3 className={styles.certsTitle}>Certified By</h3>
          <div className={styles.certGrid}>
            {[
              { abbr: 'AWS', name: 'Solutions Architect', org: 'Amazon Web Services' },
              { abbr: 'AZ', name: 'Azure Administrator', org: 'Microsoft' },
              { abbr: 'TF', name: 'Terraform Associate', org: 'HashiCorp' },
              { abbr: 'LF', name: 'Linux Sysadmin', org: 'Linux Foundation' },
            ].map((cert) => (
              <div key={cert.abbr} className={styles.certItem}>
                <span className={styles.certIcon}>{cert.abbr}</span>
                <div>
                  <span className={styles.certName}>{cert.name}</span>
                  <span className={styles.certOrg}>{cert.org}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
