import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import CVModal from './CVModal'
import './Hero.css'

const STACK = ['React', 'Laravel', 'Python', 'Angular', 'TypeScript', 'Docker', 'n8n', 'PostgreSQL']

const CodeCard = () => {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 22 })
  const rotateX = useTransform(springY, [-180, 180], [10, -10])
  const rotateY = useTransform(springX, [-180, 180], [-10, 10])

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <motion.div
      ref={ref}
      className="code-card-wrap"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
    >
      <div className="code-card">
        <div className="code-card-bar">
          <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
          <span className="code-filename">gavin.config.ts</span>
        </div>
        <div className="code-body">
          <div className="code-line"><span className="c-keyword">const</span> <span className="c-var">developer</span> <span className="c-op">=</span> {'{'}</div>
          <div className="code-line pl-2"><span className="c-prop">name</span><span className="c-op">:</span> <span className="c-str">"Gavin Sadiya Taraka"</span><span className="c-op">,</span></div>
          <div className="code-line pl-2"><span className="c-prop">role</span><span className="c-op">:</span> <span className="c-str">"Full Stack · Automation · Security"</span><span className="c-op">,</span></div>
          <div className="code-line pl-2"><span className="c-prop">location</span><span className="c-op">:</span> <span className="c-str">"Malang, Indonesia"</span><span className="c-op">,</span></div>
          <div className="code-line pl-2"><span className="c-prop">education</span><span className="c-op">:</span> <span className="c-str">"CS @ Binus University"</span><span className="c-op">,</span></div>
          <div className="code-line pl-2"><span className="c-prop">stack</span><span className="c-op">:</span> [</div>
          <div className="code-line pl-4"><span className="c-str">"React"</span><span className="c-op">,</span> <span className="c-str">"Laravel"</span><span className="c-op">,</span> <span className="c-str">"Python"</span><span className="c-op">,</span></div>
          <div className="code-line pl-4"><span className="c-str">"Angular"</span><span className="c-op">,</span> <span className="c-str">"Docker"</span><span className="c-op">,</span> <span className="c-str">"n8n"</span><span className="c-op">,</span></div>
          <div className="code-line pl-2">]<span className="c-op">,</span></div>
          <div className="code-line pl-2"><span className="c-prop">aiTools</span><span className="c-op">:</span> [<span className="c-str">"Claude Code"</span><span className="c-op">,</span> <span className="c-str">"Ollama"</span><span className="c-op">,</span> <span className="c-str">"Kiro"</span>]<span className="c-op">,</span></div>
          <div className="code-line pl-2"><span className="c-prop">design</span><span className="c-op">:</span> <span className="c-str">"Figma"</span><span className="c-op">,</span></div>
          <div className="code-line pl-2"><span className="c-prop">openToWork</span><span className="c-op">:</span> <span className="c-bool">true</span><span className="c-op">,</span></div>
          <div className="code-line">{'}'}</div>
          <div className="code-line mt-1"><span className="c-comment">// 📍 Available for freelance & remote</span></div>
        </div>
        <div className="code-card-glow" />
      </div>

      {/* Floating decorative elements */}
      <motion.div className="deco deco-1" animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="deco deco-2" animate={{ y: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
      <motion.div className="deco deco-3" animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
    </motion.div>
  )
}

const Hero = () => {
  const [cvOpen, setCvOpen] = useState(false)

  const textVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-bg">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="grid-overlay" />
        </div>

        <div className="container hero-inner">
          <motion.div className="hero-text" variants={textVariants} initial="hidden" animate="show">

            <motion.div className="available-badge" variants={item}>
              <span className="dot" />
              Open to opportunities
            </motion.div>

            <motion.h1 variants={item}>
              Hi, I'm{' '}
              <span className="name-highlight">Gavin Taraka</span>
            </motion.h1>

            <motion.p className="role" variants={item}>
              Full Stack · Automation · Security Practitioner
            </motion.p>

            <motion.div className="hero-stats" variants={item}>
              <div className="hero-stat">
                <span className="hero-stat-val">6+</span>
                <span className="hero-stat-lbl">Projects</span>
              </div>
              <div className="hero-stat-div" />
              <div className="hero-stat">
                <span className="hero-stat-val">2+</span>
                <span className="hero-stat-lbl">Yrs Exp</span>
              </div>
              <div className="hero-stat-div" />
              <div className="hero-stat">
                <span className="hero-stat-val">52</span>
                <span className="hero-stat-lbl">OSINT Tools</span>
              </div>
              <div className="hero-stat-div" />
              <div className="hero-stat">
                <span className="hero-stat-val">3+</span>
                <span className="hero-stat-lbl">Enterprise</span>
              </div>
            </motion.div>

            <motion.div className="hero-actions" variants={item}>
              <a href="#work" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-outline">Contact Me</a>
              <button className="btn-cv" onClick={() => setCvOpen(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                View CV
              </button>
            </motion.div>

          </motion.div>

          <CodeCard />
        </div>

        <a href="#about" className="scroll-down" aria-label="Scroll down">
          <span />
        </a>
      </section>

      <CVModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  )
}

export default Hero
