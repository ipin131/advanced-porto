import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './CVModal.css'

const CVModal = ({ open, onClose }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cv-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="cv-modal"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="cv-modal-header">
              <div>
                <div className="cv-modal-title">Gavin Sadiya Taraka — CV</div>
                <div className="cv-modal-sub">Full Stack Developer · Automation Engineer · Security Practitioner</div>
              </div>
              <div className="cv-modal-actions">
                <a
                  href="/GavinCV.pdf"
                  download="Gavin_Sadiya_Taraka_CV.pdf"
                  className="cv-download-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download
                </a>
                <button className="cv-close-btn" onClick={onClose} aria-label="Close">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="cv-viewer">
              <iframe
                src="/GavinCV.pdf"
                title="Gavin CV"
                width="100%"
                height="100%"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CVModal
