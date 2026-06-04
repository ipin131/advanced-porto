import { motion } from 'framer-motion'
import './Work.css'

const projects = [
  {
    id: 1,
    title: 'HRMS Web Application',
    description:
      'Freelance full-stack HRMS for AirNav Indonesia — employee management, attendance tracking, leave administration, and reporting modules.',
    tags: ['Angular', 'Laravel', 'REST APIs', 'MySQL'],
    link: '#',
    color: '#6366f1',
  },
  {
    id: 2,
    title: 'Multi-Platform Chatbot Suite',
    description:
      'Automated WhatsApp chatbot with real-time messaging and workflow automation, expanding to Telegram and website-embedded bot across a shared modular architecture.',
    tags: ['Python', 'WhatsApp API', 'Webhook', 'n8n'],
    link: '#',
    color: '#22c55e',
  },
  {
    id: 3,
    title: 'Custom Apparel Print Store',
    description:
      'Fully customisable apparel ordering site for a local UMKM business — interactive product customisation, full ordering pipeline, live on Netlify.',
    tags: ['Angular', 'Ionic', 'Netlify'],
    link: 'https://hagasabloncustom.netlify.app/',
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'Algorithmic Trading Bot',
    description:
      'Live Python trading bot integrated with MetaTrader 5 API — handles automated trade execution, market data processing, and real-time risk management.',
    tags: ['Python', 'MetaTrader 5', 'Automation'],
    link: '#',
    color: '#06b6d4',
  },
  {
    id: 5,
    title: 'TheGraf News Website',
    description:
      'A modern news portal with article browsing, categorized content, and a clean reading experience.',
    tags: ['Web', 'Frontend', 'Netlify'],
    link: 'https://thegraf.netlify.app/',
    color: '#8b5cf6',
  },
  {
    id: 6,
    title: 'OSINT Custom Toolkit',
    description:
      'Personal 52-tool OSINT framework covering reconnaissance, target profiling, social media intelligence, domain/IP analysis, and data correlation.',
    tags: ['Python', 'Linux', 'Security', 'OSINT'],
    link: '#',
    color: '#ef4444',
  },
]

const Work = () => {
  return (
    <section id="work" className="work">
      <div className="container">
        <motion.div
          className="work-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Portfolio</span>
          <h2>Selected Work</h2>
          <p className="work-subtitle">
            Enterprise projects, personal tools, and everything in between.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
            >
              <div
                className="project-thumb"
                style={{
                  background: `linear-gradient(135deg, ${p.color}18, ${p.color}38)`,
                  borderBottomColor: `${p.color}28`,
                }}
              >
                <span className="project-number" style={{ color: p.color }}>
                  0{p.id}
                </span>
              </div>
              <div className="project-body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="project-tags">
                  {p.tags.map(t => (
                    <span key={t} className="ptag">{t}</span>
                  ))}
                </div>
                {p.link !== '#' ? (
                  <a
                    href={p.link}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                ) : (
                  <span className="project-link muted">Private / Internal</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
