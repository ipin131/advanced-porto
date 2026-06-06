import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ChatBot.css'

const SUGGESTIONS = [
  "What's your tech stack?",
  'Tell me about your projects',
  'Are you available for hire?',
  'How can I contact you?',
]

const TypingIndicator = () => (
  <div className="chat-msg bot">
    <div className="chat-bubble typing">
      <span /><span /><span />
    </div>
  </div>
)

const ChatBot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Gavin's AI assistant. Ask me anything about his skills, projects, or availability. 👋",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    if (trimmed.length > 600) return

    setShowSuggestions(false)
    const userMsg = { role: 'user', content: trimmed }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 28000)

      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      })

      clearTimeout(timeout)
      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.content || data.error || 'Something went wrong.' },
      ])
    } catch (err) {
      const msg = err.name === 'AbortError'
        ? 'Response took too long. Please try again.'
        : 'Connection error. Please try again.'
      setMessages(prev => [...prev, { role: 'assistant', content: msg }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="chat-fab"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-avatar">G</div>
              <div>
                <div className="chat-header-name">Gavin's AI</div>
                <div className="chat-header-status">
                  <span className="status-dot" />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`chat-msg ${m.role === 'user' ? 'user' : 'bot'}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="chat-bubble">{m.content}</div>
                </motion.div>
              ))}

              {loading && <TypingIndicator />}

              {/* Quick suggestions */}
              {showSuggestions && !loading && (
                <div className="chat-suggestions">
                  {SUGGESTIONS.map(s => (
                    <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="chat-input-row">
              <input
                ref={inputRef}
                className="chat-input"
                placeholder="Ask me anything..."
                value={input}
                onChange={e => setInput(e.target.value.slice(0, 600))}
                onKeyDown={handleKeyDown}
                disabled={loading}
                maxLength={600}
              />
              <button
                className="chat-send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                aria-label="Send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
