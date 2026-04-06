import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.logo}>PT</span>
          <span className={styles.copy}>
            &copy; {new Date().getFullYear()} Pavan Teeparty
          </span>
        </div>
        <div className={styles.right}>
          <a href="https://linkedin.com/in/pavanteeparty" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          <a href="https://github.com/pavanteeparty" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
          <a href="mailto:vkteeparty@gmail.com" className={styles.link}>Email</a>
        </div>
      </div>
    </footer>
  );
}
