import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Github, CheckCircle, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { projects } from '../data'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!project) return <Navigate to="/projects" replace />

  const gallery = project.gallery ?? []

  const prev = () => setLightbox(i => (i !== null && i > 0 ? i - 1 : gallery.length - 1))
  const next = () => setLightbox(i => (i !== null && i < gallery.length - 1 ? i + 1 : 0))

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

          {/* ── GALERIA ── */}
          <div className={styles.gallerySection}>
            <h2 className={styles.blockTitle}>Galeria</h2>
            {gallery.length > 0 ? (
              <div className={styles.gallery}>
                {gallery.map((img, i) => (
                  <div key={i} className={styles.galleryItem} onClick={() => setLightbox(i)}>
                    <img src={img} alt={`${project.title} screenshot ${i + 1}`} className={styles.galleryImg} />
                    <div className={styles.galleryOverlay}>
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noImages}>
                <ImageOff size={28} className={styles.noImagesIcon} />
                <p>Imagens do projeto em breve</p>
              </div>
            )}
          </div>

          <div className={styles.nav}>
            {(() => {
              const idx = projects.findIndex(p => p.slug === slug)
              const prevP = projects[idx - 1]
              const nextP = projects[idx + 1]
              return (
                <>
                  {prevP ? (
                    <Link to={`/projects/${prevP.slug}`} className={styles.navLink}>
                      <ArrowLeft size={14} /> {prevP.title}
                    </Link>
                  ) : <span />}
                  {nextP ? (
                    <Link to={`/projects/${nextP.slug}`} className={`${styles.navLink} ${styles.navLinkRight}`}>
                      {nextP.title} <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                    </Link>
                  ) : <span />}
                </>
              )
            })()}
          </div>
        </motion.div>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button className={styles.lbClose} onClick={() => setLightbox(null)}><X size={20} /></button>
            <button className={styles.lbPrev} onClick={e => { e.stopPropagation(); prev() }}><ChevronLeft size={24} /></button>
            <motion.img
              key={lightbox}
              src={gallery[lightbox]}
              alt={`${project.title} ${lightbox + 1}`}
              className={styles.lbImg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              onClick={e => e.stopPropagation()}
            />
            <button className={styles.lbNext} onClick={e => { e.stopPropagation(); next() }}><ChevronRight size={24} /></button>
            <span className={styles.lbCounter}>{lightbox + 1} / {gallery.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}