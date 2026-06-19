import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { profile } from '../data'
import styles from './Navbar.module.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projetos' },
  { to: '/about', label: 'Sobre' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.inner} page-container`}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoDot} />
          <span>{profile.name.split(' ')[0].toLowerCase()}.dev</span>
        </NavLink>

        <nav className={styles.links} aria-label="Navegação principal">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="/#contato" className="btn btn-primary" style={{ padding: '7px 14px', fontSize: '12px' }}>
            Entre em contato
          </a>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.active : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
