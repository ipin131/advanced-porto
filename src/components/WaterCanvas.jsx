import { useEffect, useRef } from 'react'

export default function WaterCanvas() {
  const canvasRef = useRef(null)
  const state = useRef({
    ripples:    [],
    wake:       [],
    ambient:    [],
    mousePos:   null,
    prevPos:    null,
    lastEmit:   0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    // ambient floating dots (like bioluminescence)
    const s = state.current
    s.ambient = Array.from({ length: 70 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.1 + 0.3,
      a:  Math.random() * 0.25 + 0.04,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      da: (Math.random() - 0.5) * 0.0025,
    }))

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // --- ambient dots ---
      for (const d of s.ambient) {
        d.x += d.vx; d.y += d.vy
        d.a += d.da
        if (d.a > 0.30 || d.a < 0.03) d.da *= -1
        if (d.x < 0) d.x = canvas.width
        if (d.x > canvas.width)  d.x = 0
        if (d.y < 0) d.y = canvas.height
        if (d.y > canvas.height) d.y = 0
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(165,180,252,${d.a})`
        ctx.fill()
      }

      // --- wake trail (ship V-shape) ---
      s.wake = s.wake.filter(p => p.a > 0.008)
      for (const p of s.wake) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(99,102,241,${p.a * 0.55})`
        ctx.lineWidth = 0.9
        ctx.stroke()
        p.r += 0.55
        p.a *= 0.942
      }

      // --- ripples (click) ---
      s.ripples = s.ripples.filter(rp => rp.a > 0.005)
      for (const rp of s.ripples) {
        for (let i = 0; i < 5; i++) {
          const offset = i * 26
          const r = rp.r - offset
          if (r < 1) continue
          const a = rp.a * Math.pow(0.72, i)
          const lw = Math.max(0.4, 1.8 - i * 0.32)
          ctx.beginPath()
          ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(99,102,241,${a})`
          ctx.lineWidth = lw
          ctx.stroke()
          // inner fill glow on first ring only
          if (i === 0 && rp.r < 40) {
            const grd = ctx.createRadialGradient(rp.x, rp.y, 0, rp.x, rp.y, rp.r)
            grd.addColorStop(0, `rgba(99,102,241,${rp.a * 0.08})`)
            grd.addColorStop(1, 'rgba(99,102,241,0)')
            ctx.fillStyle = grd
            ctx.beginPath()
            ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        rp.r += 3.2
        rp.a *= 0.972
      }

      // --- cursor glow ---
      if (s.mousePos) {
        const { x, y } = s.mousePos
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 100)
        grd.addColorStop(0, 'rgba(99,102,241,0.12)')
        grd.addColorStop(1, 'rgba(99,102,241,0)')
        ctx.fillStyle = grd
        ctx.fillRect(x - 100, y - 100, 200, 200)
      }

      animId = requestAnimationFrame(tick)
    }
    tick()

    // event handlers
    const section = canvas.parentElement

    const emitWake = (x, y, dx, dy, speed) => {
      const now = performance.now()
      if (now - s.lastEmit < 18) return   // throttle
      s.lastEmit = now

      const angle = Math.atan2(dy, dx)
      const px = Math.cos(angle + Math.PI / 2)
      const py = Math.sin(angle + Math.PI / 2)
      const str = Math.min(speed / 25, 1)

      // center line
      s.wake.push({ x, y, r: 2, a: 0.75 * str })

      // V arms — 4 pairs spreading back
      for (let k = 0; k < 4; k++) {
        const dist   = (k + 1) * 11
        const behind = 0.25 + k * 0.18
        const alpha  = (0.55 - k * 0.1) * str
        if (alpha <= 0) break
        const bx = x - dx * behind
        const by = y - dy * behind
        s.wake.push({ x: bx + px * dist, y: by + py * dist, r: 1.5, a: alpha })
        s.wake.push({ x: bx - px * dist, y: by - py * dist, r: 1.5, a: alpha })
      }
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      s.mousePos = { x, y }
      if (s.prevPos) {
        const dx = x - s.prevPos.x
        const dy = y - s.prevPos.y
        const spd = Math.sqrt(dx * dx + dy * dy)
        if (spd > 5) emitWake(x, y, dx, dy, spd)
      }
      s.prevPos = { x, y }
    }

    const onLeave = () => { s.mousePos = null; s.prevPos = null }

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      s.ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 6,
        a: 0.9,
      })
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    section.addEventListener('click', onClick)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      section.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}
