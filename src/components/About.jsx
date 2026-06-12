import { motion } from 'framer-motion'
import './About.css'

const SKILLS = [
  {
    category: 'Languages',
    color: '#58a6ff',
    items: ['Python', 'JavaScript', 'TypeScript', 'PHP', 'Java', 'C#'],
  },
  {
    category: 'Frontend',
    color: '#3fb950',
    items: ['React', 'Next.js', 'Angular', 'Vue.js', 'Ionic', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    category: 'Backend',
    color: '#f0883e',
    items: ['Laravel', 'Node.js', 'Express.js', 'FastAPI', 'Flask', 'REST API', 'Microservices'],
  },
  {
    category: 'Database',
    color: '#bc8cff',
    items: ['MySQL', 'PostgreSQL', 'Redis', 'SQLite'],
  },
  {
    category: 'DevOps & Infrastructure',
    color: '#d29922',
    items: ['Docker', 'CI/CD', 'Ubuntu Linux', 'SSH', 'Git', 'GitHub Actions', 'Cloudflare', 'Netlify', 'Hostinger'],
  },
  {
    category: 'Automation & Integration',
    color: '#39d353',
    items: ['n8n', 'Webhook', 'LLM Integration', 'Process Orchestration', 'WhatsApp Bot', 'Telegram Bot', 'Fonnte'],
  },
  {
    category: 'AI & Machine Learning',
    color: '#79c0ff',
    items: ['Face Recognition', 'Computer Vision', 'Machine Learning', 'Algorithmic Trading (MT5)', 'Prompt Engineering', 'Multi-LLM Agentic Automation'],
  },
  {
    category: 'Data Analysis',
    color: '#56d364',
    items: ['Data Analysis', 'Data Visualization', 'Dashboard Reporting', 'Aviation Data ML', 'Stakeholder Presentations'],
  },
  {
    category: 'Security & OSINT',
    color: '#f85149',
    items: ['OSINT (52-tool framework)', 'Burp Suite', 'OWASP', 'Nmap', 'Wireshark', 'Metasploit', 'Penetration Testing', 'Malware Analysis'],
  },
  {
    category: 'Geospatial & Game/AR',
    color: '#e3b341',
    items: ['Leaflet', 'GeoJSON', 'Unity', 'C# (Game)', '3D Modeling', 'Augmented Reality'],
  },
  {
    category: 'AI Dev Tools',
    color: '#a78bfa',
    items: ['Claude Code', 'ChatGPT', 'GitHub Copilot', 'Codex', 'Kiro', 'Ollama', 'Cursor'],
  },
  {
    category: 'Design & Collaboration',
    color: '#f472b6',
    items: ['Figma', 'Git / GitHub', 'Notion', 'Postman', 'VS Code'],
  },
]

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">

        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">About Me</span>
          <h2>Building systems that<br />actually work in prod</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Full-stack developer and security practitioner with enterprise-level
              delivery experience at AirNav Indonesia — spanning software development,
              data analytics, QA, penetration testing, and infrastructure operations.
            </p>
            <p>
              Built and deployed an HRMS (Laravel 12, React, Docker, n8n, LLM integration),
              an AI face recognition attendance system, and CI/CD pipelines on Ubuntu Linux.
              Also building algorithmic trading bots (XAUUSD/EURUSD on MetaTrader 5),
              a multi-platform chatbot suite, and a 52-tool personal OSINT framework.
            </p>
            <p>
              Currently studying Computer Science at Bina Nusantara University (2022–present).
              Open to freelance, contract, and full-time remote opportunities.
            </p>
          </motion.div>

          <motion.div
            className="about-skills"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {SKILLS.map((group, gi) => (
              <motion.div
                key={group.category}
                className="skill-group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * gi }}
              >
                <div
                  className="skill-group-label"
                  style={{ color: group.color }}
                >
                  {group.category}
                </div>
                <div className="skill-chips">
                  {group.items.map(item => (
                    <span
                      key={item}
                      className="skill-chip"
                      style={{ '--chip-color': group.color }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default About
