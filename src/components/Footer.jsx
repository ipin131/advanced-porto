import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-logo">GV.</span>
        <p>© {new Date().getFullYear()} Gavin Sadiya Taraka — Built with React.</p>
      </div>
    </footer>
  )
}

export default Footer
