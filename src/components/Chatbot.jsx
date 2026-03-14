import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Calendar, AlertCircle, Minimize2, Globe, Stethoscope } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import './Chatbot.css'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''

// ─── System Prompt ────────────────────────────────────────────────────────────
const buildSystemPrompt = (lang) => `You are "Yatharth AI", a friendly and professional medical assistant for Yatharth Hospitals — a super-speciality hospital chain in Delhi NCR.

The user has chosen to converse in: ${lang === 'hi' ? 'HINDI. Always respond fully in Hindi (Devanagari script). Use respectful/formal tone.' : 'ENGLISH. Always respond in clear, warm English.'}

Your capabilities:
1. INFORMATION: Hospital services, specialities, locations, visiting hours, emergency contacts, insurance.
2. DOCTOR LOOKUP: Help find the right specialist — ask about symptoms or type of care.
3. APPOINTMENT BOOKING: Collect: full name, mobile number, speciality, location (Noida / Greater Noida / Noida Extension), preferred date & time. When all info is collected, output ONLY a special JSON: {"action":"book","name":"...","phone":"...","speciality":"...","location":"...","date":"...","time":"..."}
4. PATIENT SUPPORT: FAQs, general health info (always remind to consult a doctor for medical decisions).

Hospital Info:
- Locations: Noida – Sector 110 | Greater Noida – Omicron-I | Noida Extension – Crossing Republik
- Emergency: +91 9810059005 (24/7) | Helpline: 0120-4588000
- Specialities: Cardiac Sciences, Oncology, Neurosciences, Orthopaedics, GI Surgery & Liver Transplant, Nephrology & Urology, Gastroenterology, Ophthalmology, Paediatrics, Robotic Surgery, Bariatric Surgery, Cochlear Implants
- OPD Hours: 9 AM–7 PM | Visiting Hours: 10 AM–8 PM | ICU: Restricted
- Accreditation: NABH | International Patient services available
- Online Lab Reports, Health Packages, Blood Bank, 24/7 Pharmacy available

Instructions:
- Be warm, empathetic, and concise. Use bullet points for readability.
- Collect booking info step by step — never ask for everything at once.
- IMPORTANT: When you have ALL booking details, output ONLY the JSON block. Do NOT include any conversational text like "Here is your JSON" or markdown backticks. Output purely the JSON object.
- Never diagnose. Always refer to specialists for medical decisions.`

// ─── Quick Replies ────────────────────────────────────────────────────────────
const quickRepliesEn = [
  '📅 Book an appointment', '🔍 Find a doctor',
  '🏥 Hospital locations', '📞 Emergency contact', '⏰ Visiting hours',
]
const quickRepliesHi = [
  '📅 अपॉइंटमेंट बुक करें', '🔍 डॉक्टर खोजें',
  '🏥 अस्पताल के स्थान', '📞 इमरजेंसी नंबर', '⏰ मिलने का समय',
]

// ─── SMS/Email Sender Removed Temporarily ───────────────────────────────────────
// ─── Groq API ────────────────────────────────────────────────────────────────
async function callGroq(messages) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 700,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || 'Groq API failed')
  }
  const data = await res.json()
  return data.choices[0].message.content
}

// ─── Demo fallback ────────────────────────────────────────────────────────────
function getDemoResponse(userMsg, lang) {
  const msg = userMsg.toLowerCase()
  if (lang === 'hi') {
    if (msg.includes('book') || msg.includes('अपॉइंटमेंट'))
      return 'अपॉइंटमेंट बुक करने के लिए कृपया बताएं:\n1. आपका पूरा नाम\n2. मोबाइल नंबर\n3. किस विभाग में अपॉइंटमेंट चाहिए?'
    if (msg.includes('emergency') || msg.includes('इमरजेंसी'))
      return '🚨 **इमरजेंसी नंबर**: +91 9810059005 (24/7)\n📞 **हेल्पलाइन**: 0120-4588000'
    return 'यथार्थ हॉस्पिटल में आपका स्वागत है! मैं आपकी सहायता के लिए यहाँ हूँ।\n\n*(नोट: पूर्ण AI उत्तरों के लिए Dashboard में API key डालें)*'
  }
  if (msg.includes('book') || msg.includes('appointment'))
    return "I'd be happy to help you book an appointment! Please tell me:\n1. Your full name\n2. Your mobile number\n3. Which speciality do you need?"
  if (msg.includes('emergency'))
    return '🚨 **Emergency**: +91 9810059005 (24/7)\n📞 **Helpline**: 0120-4588000'
  return "Welcome to Yatharth Hospitals! I can help with:\n• 📅 Booking appointments\n• 🔍 Finding doctors\n• 🏥 Hospital info\n\n*(Note: Add API key in .env for full AI responses!)*"
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState(null)   // null = language not chosen yet
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      if (lang) setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, open, lang])

  // After language is chosen, push the greeting message
  const chooseLang = (chosen) => {
    setLang(chosen)
    const greeting = chosen === 'hi'
      ? '👋 नमस्ते! मैं **यथार्थ AI** हूँ, आपका व्यक्तिगत स्वास्थ्य सहायक।\n\nमैं आपकी अपॉइंटमेंट बुक करने, डॉक्टर खोजने और यथार्थ हॉस्पिटल की जानकारी देने में मदद कर सकता हूँ। आप क्या जानना चाहते हैं?'
      : '👋 Hello! I\'m **Yatharth AI**, your personal health assistant.\n\nI can help you book appointments, find doctors, and answer questions about Yatharth Hospitals. How can I help you today?'
    setMessages([{ role: 'assistant', content: greeting, time: new Date() }])
  }

  const parseBookingJSON = (text) => {
    try {
      // First, let's strip out markdown backticks if the AI added them
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '')
      const match = cleanText.match(/\{[\s\S]*?"action"\s*:\s*"book"[\s\S]*?\}/)
      if (match) return JSON.parse(match[0])
    } catch (e) {
      console.warn("Failed to parse JSON:", e)
    }
    return null
  }

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return
    setInput('')

    const userMsg = { role: 'user', content: userText, time: new Date() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setLoading(true)

    const apiMessages = [
      { role: 'system', content: buildSystemPrompt(lang) },
      ...newMessages.map(m => ({ role: m.role, content: m.content })),
    ]

    try {
      const responseText = GROQ_API_KEY
        ? await callGroq(apiMessages)
        : getDemoResponse(userText, lang)

      const booking = parseBookingJSON(responseText)
      if (booking) {
        setBookingData(booking)

        const displayText = responseText.replace(/\{[\s\S]*?"action"\s*:\s*"book"[\s\S]*?\}/, '').trim() ||
          (lang === 'hi' ? '✅ आपकी अपॉइंटमेंट तैयार है! नीचे Confirm करें।' : '✅ Your appointment details are ready! Click Confirm below.')
        setMessages(prev => [...prev, { role: 'assistant', content: displayText, time: new Date() }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: responseText, time: new Date() }])
      }
    } catch (e) {
      const errMsg = lang === 'hi'
        ? '⚠️ कनेक्शन में समस्या हुई। कृपया **0120-4588000** पर कॉल करें।'
        : '⚠️ Connection issue. Please try again or call **0120-4588000**.'
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg, time: new Date() }])
    } finally {
      setLoading(false)
    }
  }

  const confirmBooking = async () => {
    if (!bookingData) return
    
    // Attempt saving to DB
    try {
      await addDoc(collection(db, 'appointments'), {
        name: bookingData.name || '',
        phone: bookingData.phone || '',
        speciality: bookingData.speciality || '',
        location: bookingData.location || '',
        source: 'chatbot',
        createdAt: serverTimestamp()
      })
      
      const successMsg = lang === 'hi' 
        ? '🎉 अपॉइंटमेंट सफलतापूर्वक बुक हो गई है! हम आपको जल्द ही कॉल करेंगे।'
        : '🎉 Appointment successfully booked! We will call you shortly.'
      setMessages(prev => [...prev, { role: 'assistant', content: successMsg, time: new Date() }])
    } catch (e) {
      const errMsg = lang === 'hi'
        ? '⚠️ बुकिंग में समस्या हुई। कृपया **0120-4588000** पर कॉल करें।'
        : '⚠️ Failed to book the appointment. Please call **0120-4588000**.'
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg, time: new Date() }])
    }
    
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
    setBookingData(null)
  }

  const formatText = (text) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')

  const quickReplies = lang === 'hi' ? quickRepliesHi : quickRepliesEn

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <Bot size={20} />
                  <span className="chat-online-dot" />
                </div>
                <div>
                  <div className="chat-name">Yatharth AI</div>
                  <div className="chat-status">
                    {lang
                      ? (lang === 'hi' ? 'ऑनलाइन · AI सहायक' : 'Online · AI Powered')
                      : 'Choose your language'}
                  </div>
                </div>
              </div>
              <div className="chat-header-actions">
                {lang && (
                  <button
                    className="chat-action-btn lang-switch-btn"
                    id="chat-lang-switch"
                    title="Switch Language"
                    onClick={() => { setLang(null); setMessages([]) }}
                  >
                    <Globe size={15} />
                  </button>
                )}
                <button className="chat-action-btn" id="chat-minimize-btn" onClick={() => setOpen(false)}>
                  <Minimize2 size={16} />
                </button>
                <button className="chat-action-btn" id="chat-close-btn" onClick={() => setOpen(false)}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Language Selection Screen */}
            {!lang ? (
              <div className="lang-select-screen">
                <div className="lang-select-icon"><Globe size={36} /></div>
                <h3 className="lang-select-title">Choose your language<br /><span>भाषा चुनें</span></h3>
                <p className="lang-select-sub">How would you like to chat?</p>
                <div className="lang-options">
                  <button className="lang-btn" id="lang-en-btn" onClick={() => chooseLang('en')}>
                    <span className="lang-flag">🇬🇧</span>
                    <span className="lang-name">English</span>
                    <span className="lang-hint">Continue in English</span>
                  </button>
                  <button className="lang-btn" id="lang-hi-btn" onClick={() => chooseLang('hi')}>
                    <span className="lang-flag">🇮🇳</span>
                    <span className="lang-name">हिंदी</span>
                    <span className="lang-hint">हिंदी में जारी रखें</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="chat-messages" id="chat-messages-container">
                  {messages.map((msg, i) => (
                    <div key={i} className={`chat-msg-wrap ${msg.role}`}>
                      {msg.role === 'assistant' && (
                        <div className="chat-msg-avatar"><Bot size={14} /></div>
                      )}
                      <div className="chat-msg">
                        <div
                          className="chat-msg-text"
                          dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
                        />
                        <div className="chat-msg-time">
                          {msg.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {msg.role === 'user' && (
                        <div className="chat-msg-avatar user"><User size={14} /></div>
                      )}
                    </div>
                  ))}

                  {loading && (
                    <div className="chat-msg-wrap assistant">
                      <div className="chat-msg-avatar"><Bot size={14} /></div>
                      <div className="chat-msg">
                        <div className="chat-typing"><span /><span /><span /></div>
                      </div>
                    </div>
                  )}

                  {/* Booking Confirm Banner */}
                  {bookingData && (
                    <motion.div className="booking-banner" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <AlertCircle size={16} />
                      <div className="banner-text">
                        <div>{lang === 'hi' ? 'अपॉइंटमेंट तैयार है!' : 'Appointment ready!'}</div>
                        <div className="banner-detail">{bookingData.speciality} · {bookingData.location}</div>
                      </div>
                      <button className="btn btn-primary banner-btn" id="chat-confirm-booking-btn" onClick={confirmBooking}>
                        <Calendar size={13} /> {lang === 'hi' ? 'Confirm' : 'Confirm'}
                      </button>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies — show only for first 2 messages */}
                {messages.length <= 2 && (
                  <div className="quick-replies">
                    {quickReplies.map((q, i) => (
                      <button key={i} className="quick-reply" id={`quick-reply-${i}`} onClick={() => sendMessage(q)}>
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="chat-input-area">
                  <input
                    ref={inputRef}
                    id="chat-input"
                    type="text"
                    placeholder={lang === 'hi' ? 'संदेश लिखें...' : 'Type your message...'}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    className="chat-input"
                  />
                  <button
                    className="chat-send-btn"
                    id="chat-send-btn"
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    aria-label="Send"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bubble */}
      <motion.button
        className="chatbot-bubble"
        id="chatbot-bubble-btn"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <Stethoscope size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
