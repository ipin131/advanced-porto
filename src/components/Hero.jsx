import { useState } from 'react'
import { motion } from 'framer-motion'
import CVModal from './CVModal'
import WaterCanvas from './WaterCanvas'
import './Hero.css'

const Hero = () => {
  const [cvOpen, setCvOpen] = useState(false)

  const item = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <>
      <section id="hero" className="hero">
        <WaterCanvas />

        {/* subtle ambient glow blobs behind content */}
        <div className="hero-bg" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
        </div>

        <motion.div
          className="hero-center"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
        >
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

          <motion.div className="hero-actions" variants={item}>
            <a href="#contact" className="btn-primary">Contact Me</a>
            <button className="btn-cv" onClick={() => setCvOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              View CV
            </button>
          </motion.div>
        </motion.div>

        <a href="#about" className="scroll-down" aria-label="Scroll down">
          <span />
        </a>
      </section>

      <CVModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  )
}

export default Hero
