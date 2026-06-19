import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'
import { posts } from '../data'
import styles from './BlogPost.module.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  return (
    <main className={styles.page}>
      <div className={`page-container ${styles.container}`}>
        <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Link to="/blog" className={styles.back}>
            <ArrowLeft size={14} /> blog
          </Link>

          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.date}>
                {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
              <span className={styles.dot}>·</span>
              <Clock size={12} />
              <span className={styles.read}>{post.readTime} min de leitura</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.summary}>{post.summary}</p>
            <div className={styles.tags}>
              {post.tags.map(t => <span key={t} className="tag tag-tech">{t}</span>)}
            </div>
          </header>

          <div className={styles.placeholder}>
            <p className={styles.placeholderText}>
              O conteúdo completo deste artigo vai aqui. Substitua esta seção pelo seu texto real — pode usar markdown com um parser como <code>react-markdown</code> ou simplesmente JSX.
            </p>
          </div>
        </motion.article>
      </div>
    </main>
  )
}
