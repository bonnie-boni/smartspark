'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  type Message = {
    text: string
    sender: 'user' | 'agent'
    time: string
    // optional marker for temporary typing indicator
    temp?: boolean
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi, I'm Sparky — the SmartSpark assistant. I can help with services, pricing, portfolio, or craft messages on your behalf.",
      sender: 'agent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [pendingDraft, setPendingDraft] = useState<string | null>(null)
  const [sendName, setSendName] = useState('')
  const [sendEmail, setSendEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true)
      }
    }, 4500)

    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const quickReplies = useMemo(
    () => ['What services do you offer?', 'How much does it cost?', 'Can I get a quote?'],
    [],
  )

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const userText = message.trim()
    const userMessage: Message = {
      text: userText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setMessage('')

    // detect if user asked Sparky to draft/compose a message
    const lowerMessage = userText.toLowerCase()
    const wantsCompose = ['compose', 'draft', 'write for me', 'write a message', 'send on my behalf', 'compose an email'].some((k) => lowerMessage.includes(k))

    // show typing indicator
    const typingMessage: Message = {
      text: 'Sparky is typing…',
      sender: 'agent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: true,
    }
    setMessages((m) => [...m, typingMessage])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, compose: wantsCompose }),
      })

      if (!res.ok) throw new Error('Chat API error')

      const data = await res.json()

      const agentText = data.answer || data.draft || 'Sparky could not find an answer. Try asking about services, pricing, or portfolio.'

      const agentMessage: Message = {
        text: agentText,
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      // remove the temp typing message and append real response
      setMessages((m) => {
        const withoutTemp = m.filter((mm) => !mm.temp)
        return [...withoutTemp, agentMessage]
      })

      // if server returned a draft, surface it for approval
      if (data.draft) {
        setPendingDraft(String(data.draft))
      }
    } catch (err) {
      // fallback to local generic reply if API fails
      const fallbackText = (() => {
        if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
          return 'We cover web development, AI automation, design, marketing, and contact workflows. I can narrow it down if you want.'
        }
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
          return 'Pricing depends on scope, timeline, and deliverables. Share your goal and I will point you to the right service route.'
        }
        if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
          return 'AI is one of the core offers here. We use it for automation, support assistants, and process cleanup.'
        }
        if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
          return 'Use the contact page or the Get a Quote button in the header to send a direct request.'
        }
        if (lowerMessage.includes('portfolio') || lowerMessage.includes('experience')) {
          return 'The portfolio page shows a structured sample of work across design, AI, and web projects.'
        }
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
          return 'Hello. Tell me what you need and I will point you to the right page or service.'
        }
        return 'I can help with services, pricing, portfolio, or contact details. Ask me anything about SmartSpark.'
      })()

      const agentMessage: Message = {
        text: fallbackText,
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((m) => {
        const withoutTemp = m.filter((mm) => !mm.temp)
        return [...withoutTemp, agentMessage]
      })
    }
  }

  const handleSendDraft = async () => {
    if (!pendingDraft) return
    setSending(true)
    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft: pendingDraft, name: sendName || undefined, email: sendEmail || undefined }),
      })
      if (!res.ok) throw new Error('send failed')
      const data = await res.json()
      setPendingDraft(null)
      setSendName('')
      setSendEmail('')
      const successMsg: Message = {
        text: 'Sparky sent your message to SmartSpark. We will follow up soon.',
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((m) => [...m, successMsg])
    } catch (e) {
      const errMsg: Message = {
        text: 'There was an error sending your message. Please try again later.',
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((m) => [...m, errMsg])
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          setShowPopup(false)
        }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-primary-950 text-white shadow-2xl shadow-primary-950/40 transition-all hover:-translate-y-0.5 hover:bg-primary-900"
        aria-label="Chat with us"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {showPopup && !isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-slate-700 bg-primary-950 p-4 text-white shadow-2xl shadow-primary-950/40">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute -right-2 -top-2 rounded-full border border-slate-700 bg-primary-900 p-1 text-slate-100 shadow-lg"
          >
            <X size={14} />
          </button>
          <div className="flex items-start gap-3">
            <div>
              <p className="font-semibold text-white">Need quick help?</p>
              <p className="mt-1 text-sm text-slate-300">Ask about services, pricing, or the best route to contact the team.</p>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[min(24rem,calc(100vw-3rem))] overflow-hidden rounded-3xl border border-slate-700 bg-primary-950 text-white shadow-2xl shadow-primary-950/50">
          <div className="flex items-center justify-between border-b border-slate-800 bg-primary-900 px-4 py-4">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-semibold tracking-tight text-white">SmartSpark Assistant</h3>
                <p className="text-xs text-slate-300">Usually replies within a few minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto bg-slate-950/95 p-4">
            <div className="mb-4 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => setMessage(reply)}
                  className="rounded-full border border-slate-700 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {reply}
                </button>
              ))}
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'bg-primary-700 text-white'
                      : 'border border-slate-700 bg-slate-900 text-slate-100'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`mt-1 text-xs ${msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
            {pendingDraft && (
              <div className="mb-4 rounded-lg border border-amber-600 bg-amber-950/5 p-3 text-amber-100">
                <p className="font-semibold">Draft message ready</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-amber-200">{pendingDraft}</p>

                <div className="mt-3 flex flex-col gap-2">
                  <input
                    placeholder="Your name (optional)"
                    value={sendName}
                    onChange={(e) => setSendName(e.target.value)}
                    className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
                  />
                  <input
                    placeholder="Your email (optional)"
                    value={sendEmail}
                    onChange={(e) => setSendEmail(e.target.value)}
                    className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPendingDraft(null)}
                      className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                    >
                      Dismiss
                    </button>
                    <button
                      type="button"
                      onClick={handleSendDraft}
                      disabled={sending}
                      className="ml-auto rounded-md bg-primary-700 px-3 py-2 text-sm text-white disabled:opacity-60"
                    >
                      {sending ? 'Sending…' : 'Approve & Send'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t border-slate-800 bg-primary-950 p-3">
            <input
              type="text"
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-500"
            />
            <button
              type="submit"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-700 text-white transition-colors hover:bg-primary-600"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}