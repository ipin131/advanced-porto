import { motion } from 'framer-motion'
import './About.css'

const skills = [
  { name: 'Angular', icon: '🅰️' },
  { name: 'React', icon: '⚛️' },
  { name: 'Laravel', icon: '🔴' },
  { name: 'Python', icon: '🐍' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'Ionic', icon: '⚡' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'n8n', icon: '🔄' },
  { name: 'Leaflet / GeoJSON', icon: '🗺️' },
  { name: 'Linux / CI/CD', icon: '🐧' },
  { name: 'Security / OSINT', icon: '🛡️' },
  { name: 'Unity / AR', icon: '🎮' },
]

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">About Me</span>
            <h2>Building systems that<br />actually work in prod</h2>
            <p>
              I'm a full-stack developer and security practitioner with freelance
              and enterprise experience — including an HRMS for AirNav Indonesia
              (Laravel 12, React, Docker, n8n, LLM integration), an AI-powered
              face recognition attendance system, and CI/CD infrastructure on
              Ubuntu Linux.
            </p>
            <p>
              Outside of work I build algorithmic trading bots (XAUUSD/EURUSD on
              MetaTrader 5), geospatial e-commerce platforms using Leaflet and
              GeoJSON APIs, multi-platform chatbot automation, and a custom
              52-tool OSINT framework. Studying Computer Science at Bina
              Nusantara University (2022–present).
            </p>
          </motion.div>

          <motion.div
            className="about-skills"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="section-label">Tech Stack</span>
            <div className="skills-grid">
              {skills.map((s, i) => (
                <motion.div
                  key={s.name}
                  className="skill-item"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  whileHover={{ y: -3 }}
                >
                  <span className="skill-icon">{s.icon}</span>
                  <span className="skill-name">{s.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
