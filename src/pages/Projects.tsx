import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data'
import ProjectCard from '../components/ProjectCard'
import styles from './Projects.module.css'

type Filter = 'all' | 'done' | 'wip'

const filterLabels: Record<Filter, string> = {
  all: 'todos',
  done: 'concluídos',
  wip: 'em andamento',
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter)

  return (
    <main className={styles.page}>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={styles.header}
        >
          <p className="section-eyebrow">trabalhos</p>
          <h1 className="section-title">Todos os meus projetos</h1>
          <p className={styles.subtitle}>
            Aqui estão todos os projetos produzidos por mim. Você pode acompanhar todos os detalhes e imagens.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.filters}
        >
          {(Object.keys(filterLabels) as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
            >
              {filterLabels[f]}
              <span className={styles.filterCount}>
                {f === 'all' ? projects.length : projects.filter(p => p.status === f).length}
              </span>
            </button>
          ))}
        </motion.div>

        <div className={styles.grid}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
