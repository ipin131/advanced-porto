import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import './App.css'

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, easing: t => 1 - Math.pow(1 - t, 4) })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  )
}

export default App
