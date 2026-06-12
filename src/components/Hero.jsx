import { motion } from 'framer-motion'
import './Hero.css'

const Hero = () => {
  return (
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
            <a href="/GavinCV.pdf" download="Gavin_Sadiya_Taraka_CV.pdf" className="btn-cv">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="profile-ring outer">
            <div className="profile-ring mid">
              <div className="profile-circle">
                <span>👨‍💻</span>
              </div>
            </div>
          </div>
          <div className="floating-badge badge-1">Angular</div>
          <div className="floating-badge badge-2">Laravel</div>
          <div className="floating-badge badge-3">Python</div>
        </motion.div>
      </div>

      <a href="#about" className="scroll-down" aria-label="Scroll down">
        <span />
      </a>
    </section>
  )
}

export default Hero
