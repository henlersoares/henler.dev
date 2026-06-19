import { Github, Linkedin } from 'lucide-react'
import { profile } from '../data'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`page-container ${styles.inner}`}>
        <span className={styles.copy}>
          © {year} {profile.name} — feito com React & Framer Motion
        </span>
        <div className={styles.socials}>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={styles.icon}><Github size={15} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.icon}><Linkedin size={15} /></a>
        </div>
      </div>
    </footer>
  )
}