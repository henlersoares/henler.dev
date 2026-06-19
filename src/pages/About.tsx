import { motion } from 'framer-motion'
import { MapPin, Mail, Github, Linkedin } from 'lucide-react'
import { profile, experiences, skillGroups, education } from '../data'
import styles from './About.module.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
})

// SVG icons for each tech — simple recognizable logos
const techLogos: Record<string, string> = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'CSS / Tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'AWS (EC2/S3/RDS)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'GitHub Actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'Linux / VPS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
}

function TechIcon({ name }: { name: string }) {
  const src = techLogos[name]
  if (!src) return <span className={styles.techFallback}>{name[0]}</span>
  return <img src={src} alt={name} className={styles.techSvg} />
}

export default function About() {
  return (
    <main className={styles.page}>
      <div className="page-container">

        {/* ── INTRO ── */}
        <motion.section {...fade(0.1)} className={styles.intro}>
          <div className={styles.avatarWrap}>
            <img src="/avatar.jpg" alt={profile.name} className={styles.avatar} />
            <div className={styles.avatarMeta}>
              <span className={styles.metaItem}><MapPin size={13} /> {profile.location}</span>
              {profile.available && (
                <span className={`${styles.metaItem} ${styles.available}`}>
                  <span className={styles.availDot} /> Disponível
                </span>
              )}
            </div>
            <div className={styles.introLinks}>
              <a href={`mailto:${profile.email}`} className="btn btn-primary"><Mail size={14} /> E-mail</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost"><Github size={14} /> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost"><Linkedin size={14} /> LinkedIn</a>
            </div>
          </div>

          <div className={styles.introText}>
            <h1 className={styles.name}>{profile.name}</h1>
            <p className={styles.role}>{profile.role}</p>
            <div className={styles.bio}>
              <p>Sou desenvolvedor Full-Stack de Araçatuba, SP, graduado em Ciência da Computação pela Universidade Paulista e atualmente cursando pós-graduação em Cloud & DevOps pela Uninter.</p>
              <p>Meu interesse por tecnologia começou bem antes de eu saber o que era programação. Desde criança fui curioso sobre como os programas e jogos funcionavam por dentro, e essa curiosidade nunca parou.</p>
              <p>Antes de chegar onde estou hoje, passei por caminhos que podem parecer distantes da programação. Durante a faculdade fiz estágio em TI por dois anos, onde tive meu primeiro contato profissional com a área. No último ano da graduação, a pandemia chegou e com ela vieram dificuldades que me fizeram redirecionar o foco por um tempo. Com isso, segui por um caminho diferente e trabalhei durante alguns anos numa empresa de automação agrícola, onde fiz de tudo um pouco: conferência de material, almoxarifado, montagem, testes de qualidade e embalagem de computadores de bordo para colheitadeiras e estações meteorológicas. Apesar das diferenças com a programação, essa experiência me ensinou muito sobre como a tecnologia funciona na prática, atenção a processos e qualidade, coisas que carrego comigo até nos dias de hoje.</p>
              <p>Passei também por um período como assistente administrativo e depois como suporte técnico em uma empresa de automação comercial, onde tive meu primeiro contato real com banco de dados, acesso remoto e o ciclo de vida de um software.</p>
              <p>Hoje estou onde sempre quis estar: desenvolvendo. Atuo como Assistente Desenvolvedor Full-Stack, construindo produtos do banco de dados à interface. A trajetória foi longa, mas cada etapa me deu uma visão diferente de como as coisas funcionam, e isso aparece no jeito como penso em soluções.</p>
            </div>
          </div>
        </motion.section>

        {/* ── EXPERIENCE ── */}
        <motion.section {...fade(0.2)} className={styles.section} id="experience">
          <p className="section-eyebrow">trajetória</p>
          <h2 className="section-title">Experiência</h2>
          <div className={styles.timeline}>
            {experiences.map((exp, i) => (
              <div key={i} className={styles.tlItem}>
                <div className={styles.tlLeft}>
                  <div className={styles.tlDot} />
                  {i < experiences.length - 1 && <div className={styles.tlLine} />}
                </div>
                <div className={styles.tlContent}>
                  <div className={styles.tlHeader}>
                    <h3 className={styles.tlRole}>{exp.role}</h3>
                    <span className={styles.tlPeriod}>{exp.period}</span>
                  </div>
                  <p className={styles.tlCompany}>{exp.company}</p>
                  <p className={styles.tlDesc}>{exp.description}</p>
                  <div className={styles.tlTech}>
                    {exp.tech.map(t => <span key={t} className="tag tag-tech">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── EDUCATION ── */}
        <motion.section {...fade(0.25)} className={styles.section} id="education">
          <p className="section-eyebrow">formação</p>
          <h2 className="section-title">Formação acadêmica</h2>
          <div className={styles.eduGrid}>
            {education.map((e, i) => (
              <div key={i} className={styles.eduCard}>
                <p className={styles.eduDegree}>{e.degree}</p>
                <p className={styles.eduInst}>{e.institution}</p>
                <p className={styles.eduPeriod}>{e.period}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── SKILLS ── */}
        <motion.section {...fade(0.3)} className={styles.section} id="skills">
          <p className="section-eyebrow">habilidades</p>
          <h2 className="section-title">Stack & ferramentas</h2>
          <div className={styles.skillsGrid}>
            {skillGroups.map(group => (
              <div key={group.label} className={styles.skillGroup}>
                <p className={styles.skillGroupLabel}>{group.label}</p>
                <div className={styles.techIconsGrid}>
                  {group.skills.map(s => (
                    <div key={s.name} className={styles.techCard}>
                      <TechIcon name={s.name} />
                      <span className={styles.techName}>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  )
}