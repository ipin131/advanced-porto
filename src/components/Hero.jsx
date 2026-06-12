import { useState } from 'react'
import { motion } from 'framer-motion'
import CVModal from './CVModal'
import './Hero.css'

const Hero = () => {
  const [cvOpen, setCvOpen] = useState(false)

  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-bg">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="grid-overlay" />
        </div>

        <div className="container hero-inner">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="available-badge">
              <span className="dot" />
              Open to opportunities
            </div>

            <h1>
              Hi, I'm{' '}
              <span className="name-highlight">Gavin Taraka</span>
            </h1>
            <p className="role">Full Stack & Automation Developer</p>
            <p className="bio">
              Software engineer with enterprise experience at AirNav Indonesia.
              I build full-stack web apps, automate workflows, and develop
              geospatial-enabled platforms — from HRMS systems with LLM integration
              to e-commerce platforms with Leaflet-based store finders and
              52-tool OSINT toolkits.
            </p>

            <div className="hero-actions">
              <a href="#work" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-outline">Contact Me</a>
              <button className="btn-cv" onClick={() => setCvOpen(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
                View CV
              </button>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="dev-card">
              <div className="dev-card-top">
                <div className="dev-avatar">GV</div>
                <div className="dev-card-info">
                  <div className="dev-name">Gavin Taraka</div>
                  <div className="dev-title">Full Stack · Automation · Security</div>
                </div>
                <span className="dev-status-dot" />
              </div>

              <div className="dev-stats">
                <div className="dev-stat">
                  <div className="dev-stat-val">6+</div>
                  <div className="dev-stat-lbl">Projects</div>
                </div>
                <div className="dev-stat-divider" />
                <div className="dev-stat">
                  <div className="dev-stat-val">2+</div>
                  <div className="dev-stat-lbl">Yrs Exp</div>
                </div>
                <div className="dev-stat-divider" />
                <div className="dev-stat">
                  <div className="dev-stat-val">52</div>
                  <div className="dev-stat-lbl">OSINT Tools</div>
                </div>
              </div>

              <div className="dev-stack">
                {['React', 'Laravel', 'Python', 'Angular', 'Docker', 'n8n'].map(t => (
                  <span key={t} className="dev-tag">{t}</span>
                ))}
              </div>

              <div className="dev-card-footer">
                <span className="dev-location">📍 Malang, Indonesia</span>
                <span className="dev-open">Open to work</span>
              </div>
            </div>
          </motion.div>
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
