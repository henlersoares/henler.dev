import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, Send, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { profile, projects } from '../data'
import ProjectCard from '../components/ProjectCard'
import HeroShapes from '../components/HeroShapes'
import styles from './Home.module.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

export default function Home() {
  const featured = projects.filter(p => p.featured)

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(false)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          email: form.email,
          name: form.name,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSent(true)
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <HeroShapes />
        <div className={`page-container ${styles.heroContent}`}>
          <motion.div {...fade(0.1)} className={styles.badge}>
            <span className={styles.badgeDot} />
            Disponível para projetos e freelances
          </motion.div>

          <motion.h1 {...fade(0.2)} className={styles.h1}>
            Olá, sou o <span className={styles.accent}>{profile.name}</span>
            <br />
            {profile.role}
          </motion.h1>

          <motion.p {...fade(0.3)} className={styles.tagline}>
            {profile.tagline}
          </motion.p>

          <motion.div {...fade(0.4)} className={styles.heroActions}>
            <Link to="/projects" className="btn btn-primary">
              ver projetos <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div {...fade(0.5)} className={styles.socials}>
            <a href={profile.github} target="_blank" rel="noreferrer" className={styles.socialLink} aria-label="GitHub">
              <Github size={17} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href="#contato" className={styles.socialLink} aria-label="E-mail">
              <Mail size={17} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className={styles.section}>
        <div className="page-container">
          <div className={styles.sectionHead}>
            <div>
              <p className="section-eyebrow">trabalhos</p>
              <h2 className="section-title">Projetos em destaque</h2>
            </div>
            <Link to="/projects" className={styles.seeAll}>
              ver todos <ArrowRight size={13} />
            </Link>
          </div>
          <div className={styles.projectsGrid}>
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className={styles.cta}>
        <div className="page-container">
          <motion.div
            id="contato"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.ctaBox}
          >
            <div className={styles.ctaLeft}>
              <p className="section-eyebrow">contato</p>
              <h2 className={styles.ctaTitle}>Quer dar vida ao seu projeto?</h2>
              <p className={styles.ctaText}>
                Tem alguma dúvida ou quer transformar sua ideia em produto? Entre em contato comigo!
              </p>
              <div className={styles.ctaSocials}>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.ctaSocial}><Linkedin size={16} /> LinkedIn</a>
              </div>
            </div>

            <div className={styles.ctaRight}>
              {sent ? (
                <div className={styles.sentState}>
                  <CheckCircle size={36} className={styles.sentIcon} />
                  <p className={styles.sentTitle}>Mensagem enviada!</p>
                  <p className={styles.sentSub}>Obrigado pelo contato! Em breve sua mensagem será respondida.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Nome</label>
                      <input
                        className={styles.input}
                        type="text"
                        placeholder="Seu nome"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>E-mail</label>
                      <input
                        className={styles.input}
                        type="email"
                        placeholder="seu@email.com"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Assunto</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Digite o assunto"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Mensagem</label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Digite sua mensagem"
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>
                  {error && (
                    <p className={styles.errorMsg}>Algo deu errado. Tente novamente ou entre em contato pelo LinkedIn.</p>
                  )}
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={sending}>
                    {sending ? 'Enviando...' : <><Send size={14} /> Enviar mensagem</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}