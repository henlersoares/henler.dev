import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Github, CheckCircle } from 'lucide-react'
import { projects } from '../data'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) return <Navigate to="/projects" replace />

  return (
    <main className={styles.page}>
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/projects" className={styles.back}>
            <ArrowLeft size={14} /> projetos
          </Link>

          <div className={styles.header}>
            <div className={styles.headerTop}>
              <span className={`tag ${project.status === 'done' ? 'tag-done' : 'tag-wip'}`}>
                {project.status === 'done' ? 'concluído' : 'em andamento'}
              </span>
              <span className={styles.year}>{project.year}</span>
            </div>

            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.desc}>{project.description}</p>

            <div className={styles.actions}>
              {project.links.map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  {l.label === 'GitHub' ? <Github size={14} /> : <ArrowUpRight size={14} />}
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.main}>
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Contexto & solução</h2>
                <p className={styles.blockText}>{project.longDescription}</p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Destaques</h2>
                <ul className={styles.highlights}>
                  {project.highlights.map(h => (
                    <li key={h} className={styles.highlight}>
                      <CheckCircle size={15} className={styles.checkIcon} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sideCard}>
                <p className={styles.sideLabel}>tecnologias</p>
                <div className={styles.techList}>
                  {project.tech.map(t => (
                    <span key={t} className="tag tag-tech">{t}</span>
                  ))}
                </div>
              </div>

              <div className={styles.sideCard}>
                <p className={styles.sideLabel}>status</p>
                <span className={`tag ${project.status === 'done' ? 'tag-done' : 'tag-wip'}`}>
                  {project.status === 'done' ? 'concluído' : 'em andamento'}
                </span>
              </div>

              <div className={styles.sideCard}>
                <p className={styles.sideLabel}>ano</p>
                <span className={styles.sideValue}>{project.year}</span>
              </div>
            </aside>
          </div>

          <div className={styles.nav}>
            {(() => {
              const idx = projects.findIndex(p => p.slug === slug)
              const prev = projects[idx - 1]
              const next = projects[idx + 1]
              return (
                <>
                  {prev ? (
                    <Link to={`/projects/${prev.slug}`} className={styles.navLink}>
                      <ArrowLeft size={14} /> {prev.title}
                    </Link>
                  ) : <span />}
                  {next ? (
                    <Link to={`/projects/${next.slug}`} className={`${styles.navLink} ${styles.navLinkRight}`}>
                      {next.title} <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                    </Link>
                  ) : <span />}
                </>
              )
            })()}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
