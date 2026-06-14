import { useEffect, useRef } from 'react'

const FISH_COUNT = 8

function makeFish(w, h) {
  return {
    x:     Math.random() * w,
    y:     Math.random() * h,
    angle: Math.random() * Math.PI * 2,
    speed: 0.6 + Math.random() * 0.8,
    size:  5 + Math.random() * 7,
    phase: Math.random() * Math.PI * 2,   // tail wiggle offset
    alpha: 0.25 + Math.random() * 0.3,
    turn:  0,
  }
}

function drawFish(ctx, fish, t) {
  const wiggle = Math.sin(t * 4 + fish.phase) * 0.35

  ctx.save()
  ctx.translate(fish.x, fish.y)
  ctx.rotate(fish.angle)
  ctx.globalAlpha = fish.alpha

  // tail
  ctx.save()
  ctx.rotate(wiggle)
  ctx.beginPath()
  ctx.moveTo(-fish.size * 0.9, 0)
  ctx.lineTo(-fish.size * 1.9, -fish.size * 0.55)
  ctx.lineTo(-fish.size * 1.9,  fish.size * 0.55)
  ctx.closePath()
  ctx.fillStyle = 'rgba(99,102,241,0.55)'
  ctx.fill()
  ctx.restore()

  // body
  ctx.beginPath()
  ctx.ellipse(0, 0, fish.size, fish.size * 0.38, 0, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(120,130,255,0.45)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(165,180,252,0.7)'
  ctx.lineWidth = 0.7
  ctx.stroke()

  // eye
  ctx.beginPath()
  ctx.arc(fish.size * 0.55, -fish.size * 0.05, fish.size * 0.12, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.fill()

  ctx.globalAlpha = 1
  ctx.restore()
}

export default function WaterCanvas() {
  const canvasRef = useRef(null)
  const state = useRef({
    ripples:  [],
    ambient:  [],
    fish:     [],
    mousePos: null,
    prevPos:  null,
    wake:     [],
    lastEmit: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const s = state.current
    // ambient dots
    s.ambient = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1 + 0.3,
      a: Math.random() * 0.18 + 0.03,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      da: (Math.random() - 0.5) * 0.002,
    }))
    // fish
    s.fish = Array.from({ length: FISH_COUNT }, () => makeFish(canvas.width, canvas.height))

    const tick = () => {
      t += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ambient dots
      for (const d of s.ambient) {
        d.x += d.vx; d.y += d.vy; d.a += d.da
        if (d.a > 0.22 || d.a < 0.02) d.da *= -1
        if (d.x < 0) d.x = canvas.width
        if (d.x > canvas.width)  d.x = 0
        if (d.y < 0) d.y = canvas.height
        if (d.y > canvas.height) d.y = 0
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(165,180,252,${d.a})`
        ctx.fill()
      }

      // wake trail
      s.wake = s.wake.filter(p => p.a > 0.008)
      for (const p of s.wake) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(99,102,241,${p.a * 0.45})`
        ctx.lineWidth = 0.7
        ctx.stroke()
        p.r += 0.4; p.a *= 0.945
      }

      // ripples
      s.ripples = s.ripples.filter(rp => rp.a > 0.005)
      for (const rp of s.ripples) {
        for (let i = 0; i < 4; i++) {
          const r = rp.r - i * 24
          if (r < 1) continue
          ctx.beginPath()
          ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(99,102,241,${rp.a * Math.pow(0.72, i)})`
          ctx.lineWidth = Math.max(0.4, 1.6 - i * 0.35)
          ctx.stroke()
        }
        rp.r += 3; rp.a *= 0.973
      }

      // fish
      const mx = s.mousePos?.x ?? -9999
      const my = s.mousePos?.y ?? -9999
      for (const f of s.fish) {
        // flee from mouse
        const dx = f.x - mx
        const dy = f.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120 && dist > 0) {
          const flee = Math.atan2(dy, dx)
          const diff = ((flee - f.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
          f.angle += diff * 0.12
          f.speed = Math.min(f.speed + 0.15, 3.5)
        } else {
          // gentle wander
          f.angle += (Math.random() - 0.5) * 0.04
          f.speed = Math.max(f.speed * 0.995, 0.5)
        }

        f.x += Math.cos(f.angle) * f.speed
        f.y += Math.sin(f.angle) * f.speed

        // wrap edges
        const pad = 30
        if (f.x < -pad) f.x = canvas.width  + pad
        if (f.x > canvas.width  + pad) f.x = -pad
        if (f.y < -pad) f.y = canvas.height + pad
        if (f.y > canvas.height + pad) f.y = -pad

        drawFish(ctx, f, t)
      }

      // cursor glow
      if (s.mousePos) {
        const { x, y } = s.mousePos
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 90)
        grd.addColorStop(0, 'rgba(99,102,241,0.09)')
        grd.addColorStop(1, 'rgba(99,102,241,0)')
        ctx.fillStyle = grd
        ctx.fillRect(x - 90, y - 90, 180, 180)
      }

      animId = requestAnimationFrame(tick)
    }
    tick()

    const section = canvas.parentElement
    const emitWake = (x, y, dx, dy, spd) => {
      const now = performance.now()
      if (now - s.lastEmit < 22) return
      s.lastEmit = now
      const angle = Math.atan2(dy, dx)
      const px = Math.cos(angle + Math.PI / 2)
      const py = Math.sin(angle + Math.PI / 2)
      const str = Math.min(spd / 25, 1)
      s.wake.push({ x, y, r: 2, a: 0.65 * str })
      for (let k = 0; k < 3; k++) {
        const dist = (k + 1) * 10
        const bx = x - dx * (0.25 + k * 0.18)
        const by = y - dy * (0.25 + k * 0.18)
        const a = (0.45 - k * 0.1) * str
        if (a <= 0) break
        s.wake.push({ x: bx + px * dist, y: by + py * dist, r: 1.5, a })
        s.wake.push({ x: bx - px * dist, y: by - py * dist, r: 1.5, a })
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
      s.ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 6, a: 0.88 })
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
