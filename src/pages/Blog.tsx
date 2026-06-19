import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { posts } from '../data'
import styles from './Blog.module.css'

export default function Blog() {
  return (
    <main className={styles.page}>
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="section-eyebrow">escrita</p>
          <h1 className="section-title">Blog</h1>
          <p className={styles.subtitle}>Reflexões e aprendizados sobre desenvolvimento, arquitetura e carreira.</p>
        </motion.div>

        <div className={styles.list}>
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <Link to={`/blog/${post.slug}`} className={styles.postRow}>
                <div className={styles.postMeta}>
                  <span className={styles.postDate}>
                    {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  <span className={styles.postRead}>{post.readTime} min</span>
                </div>
                <div className={styles.postBody}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postSummary}>{post.summary}</p>
                  <div className={styles.postTags}>
                    {post.tags.map(t => <span key={t} className="tag tag-tech">{t}</span>)}
                  </div>
                </div>
                <span className={styles.arrow}>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
