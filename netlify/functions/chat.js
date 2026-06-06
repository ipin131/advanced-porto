const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above|your)\s+instructions/i,
  /forget\s+(everything|all|your\s+instructions|the\s+above)/i,
  /you\s+are\s+now\s+(a\s+)?(different|new|another)/i,
  /new\s+(role|persona|identity|instructions|objective)/i,
  /(reveal|show|print|repeat|output)\s+(your\s+)?(system\s+prompt|instructions|prompt)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(a\s+)?(different|another|new|unrestricted)/i,
  /jailbreak/i,
  /\bDAN\b/,
  /do\s+anything\s+now/i,
  /override\s+(your\s+)?(instructions|programming|rules)/i,
  /disregard\s+(all\s+)?(previous|your)/i,
  /(\[SYSTEM\]|\[INST\]|\[\/INST\]|<\|system\|>|<\|user\|>)/i,
]

const SAFE_REPLY = "I'm here to help you learn about Gavin's skills and projects. What would you like to know?"

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { messages } = JSON.parse(event.body)

    if (!Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid request.' }) }
    }

    const lastMsg = messages[messages.length - 1]?.content ?? ''

    // Block oversized messages
    if (lastMsg.length > 600) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: 'Please keep your message shorter so I can help you better!' }),
      }
    }

    // Block injection attempts
    if (INJECTION_PATTERNS.some(p => p.test(lastMsg))) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: SAFE_REPLY }),
      }
    }

    // Only send last 6 messages to keep context tight and reduce latency
    const trimmedMessages = messages.slice(-6)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 25000)

    const res = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: trimmedMessages }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) {
      throw new Error(`n8n responded with status ${res.status}`)
    }

    const data = await res.json()

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: data.content }),
    }
  } catch (err) {
    const isTimeout = err.name === 'AbortError'
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: isTimeout
          ? 'Response took too long. Please try again.'
          : 'Something went wrong. Please try again.',
      }),
    }
  }
}
