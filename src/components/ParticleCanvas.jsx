import { useEffect, useRef } from 'react'

const CONNECT_DIST = 140
const REPEL_RADIUS = 110
const REPEL_FORCE  = 1.2
const MAX_SPEED    = 1.8

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const makeParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 14000)
      return Array.from({ length: Math.min(Math.max(count, 40), 110) }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r:  Math.random() * 1.2 + 0.6,
      }))
    }

    resize()
    let particles = makeParticles()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        // mouse repulsion
        const dx   = p.x - mouse.current.x
        const dy   = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL_RADIUS && dist > 0) {
          const f = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE
          p.vx += (dx / dist) * f
          p.vy += (dy / dist) * f
        }

        // damping + speed clamp
        p.vx *= 0.97
        p.vy *= 0.97
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > MAX_SPEED) { p.vx = p.vx / spd * MAX_SPEED; p.vy = p.vy / spd * MAX_SPEED }

        p.x += p.vx
        p.y += p.vy

        // wrap
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width)  p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // glow near mouse
        const proximity = Math.max(0, 1 - dist / 200)
        const alpha = 0.35 + proximity * 0.5

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + proximity * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(165,180,252,${alpha})`
        ctx.fill()
      }

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const a = (1 - dist / CONNECT_DIST) * 0.28
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(99,102,241,${a})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    const section = canvas.parentElement
    const onMove  = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)

    const onResize = () => { resize(); particles = makeParticles() }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}
