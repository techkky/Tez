import { useState } from 'react'
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Globe,
  Smartphone,
  Server,
  MessagesSquare,
  MessageCircleQuestion,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Select from '../components/Select.jsx'
import './Contact.css'

const SERVICE_OPTIONS = [
  { value: 'Website Development', icon: Globe },
  { value: 'Mobile App Development', icon: Smartphone },
  { value: 'Cloud Hosting & Infrastructure', icon: Server },
  { value: 'IT Consulting', icon: MessagesSquare },
  { value: 'Something else', icon: MessageCircleQuestion },
].map((o) => ({ ...o, label: o.value }))

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  services: [SERVICE_OPTIONS[0].value],
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setStatus('sent')
      setForm(INITIAL_FORM)
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  return (
    <section className="section contact">
      <div className="container contact__grid">
        <Reveal className="contact__info">
          <span className="eyebrow">Contact</span>
          <h1>Let's figure out the right fit</h1>
          <p>
            Tell us what you're building — a custom project, a hosting subscription, or just a
            problem you need help solving — and we'll come back with a plan.
          </p>

          <div className="contact__detail">
            <Mail size={18} />
            <div>
              <strong>Email</strong>
              <span>tezgrid@gmail.com</span>
            </div>
          </div>
          <div className="contact__detail">
            <MapPin size={18} />
            <div>
              <strong>Location</strong>
              <span>India</span>
            </div>
          </div>
          <div className="contact__detail">
            <Clock size={18} />
            <div>
              <strong>Response time</strong>
              <span>Within one business day</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="card contact__form-wrap">
          {status === 'sent' ? (
            <div className="contact__success">
              <CheckCircle2 size={36} />
              <h3>Message received</h3>
              <p>Thanks for reaching out — our team will get back to you within one business day.</p>
              <button className="btn btn-ghost" onClick={() => setStatus('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field-row">
                <label>
                  Name
                  <input type="text" required value={form.name} onChange={update('name')} placeholder="Your name" />
                </label>
                <label>
                  Email
                  <input type="email" required value={form.email} onChange={update('email')} placeholder="you@company.com" />
                </label>
              </div>

              <label>
                Company
                <input type="text" value={form.company} onChange={update('company')} placeholder="Company name (optional)" />
              </label>

              <Select
                label="Services you're interested in"
                value={form.services}
                onChange={(val) => setForm((f) => ({ ...f, services: val }))}
                options={SERVICE_OPTIONS}
                multiple
                placeholder="Select one or more services"
              />

              <label>
                Tell us what you need
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="What are you building or trying to solve, and any requirements we should know about."
                />
              </label>

              {status === 'error' && (
                <div className="contact__error">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : (
                  <>
                    Send message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
