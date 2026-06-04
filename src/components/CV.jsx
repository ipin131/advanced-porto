import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './CV.css'

const CV = () => {
  const [cv, setCV] = useState(null)

  useEffect(() => {
    const savedCV = localStorage.getItem('portfolio_cv')
    if (savedCV) {
      setCV(JSON.parse(savedCV))
    }
  }, [])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const cvData = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: event.target.result,
        uploadDate: new Date().toISOString()
      }
      localStorage.setItem('portfolio_cv', JSON.stringify(cvData))
      setCV(cvData)
    }
    reader.readAsDataURL(file)
  }

  const deleteCV = () => {
    if (window.confirm('Are you sure you want to delete your CV?')) {
      localStorage.removeItem('portfolio_cv')
      setCV(null)
    }
  }

  return (
    <section id="cv" className="section cv">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          CV / Resume
        </motion.h2>

        <motion.div 
          className="cv-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!cv ? (
            <div className="cv-upload-area">
              <input 
                type="file" 
                id="cvUpload" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="cvUpload" className="upload-label">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Click to upload your CV</span>
                <small>PDF, DOC, or DOCX</small>
              </label>
            </div>
          ) : (
            <div className="cv-display">
              <div className="cv-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="cv-info">
                <h3>{cv.name}</h3>
                <p>Uploaded on {new Date(cv.uploadDate).toLocaleDateString()}</p>
              </div>
              <div className="cv-actions">
                <a href={cv.data} download={cv.name} className="download-btn">
                  Download CV
                </a>
                <button onClick={deleteCV} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default CV
