import { useEffect, useRef } from 'react'
import styles from './HeroShapes.module.css'

interface Particle {
  x: number
  y: number
  baseY: number
  baseX: number
  phase: number
  speed: number
  size: number
  opacity: number
}

export default function HeroShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -999, y: -999 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const ACCENT = [165, 28, 14]
    const ACCENT_L = [211, 47, 30]
    const COLS = 24
    const ROWS = 12

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      initParticles()
    }

    const initParticles = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const cols = COLS
      const rows = ROWS
      const gapX = w / (cols + 1)
      const gapY = h / (rows + 1)
      const particles: Particle[] = []

      for (let col = 1; col <= cols; col++) {
        for (let row = 1; row <= rows; row++) {
          const bx = col * gapX
          const by = row * gapY
          particles.push({
            x: bx,
            y: by,
            baseX: bx,
            baseY: by,
            phase: Math.random() * Math.PI * 2,
            speed: 0.015 + Math.random() * 0.02,
            size: 1.5 + Math.random() * 1.5,
            opacity: 0.12 + Math.random() * 0.15,
          })
        }
      }
      particlesRef.current = particles
    }

    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -999, y: -999 } }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const animate = (ts: number) => {
      timeRef.current = ts
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const { x: mx, y: my } = mouseRef.current

      ctx.clearRect(0, 0, w, h)

      particlesRef.current.forEach(p => {
        p.phase += p.speed

        // wave displacement
        const waveX = Math.sin(p.phase + p.baseX * 0.012) * 10
        const waveY = Math.cos(p.phase * 0.8 + p.baseY * 0.012) * 10

        // mouse influence — pull toward mouse
        const dx = mx - p.baseX
        const dy = my - p.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const radius = 130
        let pullX = 0
        let pullY = 0
        let proximity = 0

        if (dist < radius) {
          proximity = 1 - dist / radius
          const eased = proximity * proximity
          pullX = dx * eased * 0.35
          pullY = dy * eased * 0.35
        }

        p.x = p.baseX + waveX + pullX
        p.y = p.baseY + waveY + pullY

        const color = proximity > 0.3 ? ACCENT_L : ACCENT
        const alpha = p.opacity + proximity * 0.55
        const size = p.size + proximity * 3.5

        // glow for nearby particles
        if (proximity > 0.2) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, size + 5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${ACCENT_L.join(',')}, ${proximity * 0.12})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color.join(',')}, ${alpha})`
        ctx.fill()
      })

      // draw subtle connection lines between nearby particles when mouse is close
      if (mx > 0) {
        const nearby = particlesRef.current.filter(p => {
          const dx = mx - p.baseX
          const dy = my - p.baseY
          return Math.sqrt(dx * dx + dy * dy) < 160
        })

        for (let i = 0; i < nearby.length; i++) {
          for (let j = i + 1; j < nearby.length; j++) {
            const a = nearby[i]
            const b = nearby[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < 90) {
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = `rgba(${ACCENT.join(',')}, ${(1 - d / 90) * 0.18})`
              ctx.lineWidth = 0.7
              ctx.stroke()
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}