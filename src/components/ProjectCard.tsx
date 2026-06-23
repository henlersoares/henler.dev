import { Link } from 'react-router-dom'
import { ArrowUpRight, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '../data'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/projects/${project.slug}`} className={styles.card}>
        <div className={styles.cover}>
          {project.image ? (
            <img src={project.image} alt={project.title} className={styles.coverImg} />
          ) : (
            <div className={styles.coverPlaceholder}>
              <span className={styles.coverPlaceholderText}>Imagens do projeto em breve</span>
            </div>
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.topRow}>
            <span className={`tag ${project.status === 'done' ? 'tag-done' : 'tag-wip'}`}>
              <span className={`${styles.dot} ${project.status === 'wip' ? styles.dotWip : ''}`} />
              {project.status === 'done' ? 'concluído' : 'em andamento'}
            </span>
          </div>

          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.desc}>{project.description}</p>

          <div className={styles.tech}>
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="tag tag-tech">{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="tag tag-tech">+{project.tech.length - 4}</span>
            )}
          </div>

          <div className={styles.footer}>
            <div className={styles.links}>
              {project.links.map(l => (
                <span
                  key={l.label}
                  className={styles.link}
                  onClick={e => { e.preventDefault(); window.open(l.url, '_blank') }}
                >
                  {l.label === 'GitHub' ? <Github size={12} /> : <ArrowUpRight size={12} />}
                  {l.label}
                </span>
              ))}
            </div>
            <span className={styles.readMore}>ver detalhes →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}