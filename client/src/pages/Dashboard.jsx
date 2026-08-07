import { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import {
  User,
  Activity,
  CreditCard,
  Briefcase,
  LogOut,
  Pencil,
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Check,
  Clock,
  Mail,
  MapPin,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  Download,
} from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import './Dashboard.css'

const NAV = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'plans', label: 'Plans', icon: Briefcase },
  { key: 'usage', label: 'Usage', icon: Activity },
  { key: 'billing', label: 'Billing', icon: CreditCard },
]

const ACTIVE_PLAN = {
  name: 'Business',
  tagline: 'For growing apps that need dedicated resources',
  price: 17499,
  features: [
    'Up to 1,000 vCPU / 1 TB RAM per service',
    'Up to 42 replicas, at 24 vCPU / 24 GB RAM per replica',
    'Up to 1 TB storage',
    'Unlimited workspace seats included',
    'TezGrid Support',
    '99.99% Availability Target',
    '30-Day Log History',
    'Concurrent global regions',
    '100,000 monthly active users',
    'Daily backups stored for 7 days',
  ],
}

const BILLING_HISTORY = [
  { id: 5, date: '2026-08-08', month: 'August 2026', plan: 'Business', amount: 17499, status: 'pending', note: '1 day left', invoiceNo: 'TG-INV-2026-348', pdf: '/invoices/TG-INV-2026-348.pdf' },
  { id: 4, date: '2026-07-01', month: 'July 2026', plan: 'Business', amount: 17499, status: 'paid', invoiceNo: 'TG-INV-2026-345', pdf: '/invoices/TG-INV-2026-345.pdf' },
  { id: 3, date: '2026-06-01', month: 'June 2026', plan: 'Starter', amount: 4999, status: 'paid', invoiceNo: 'TG-INV-2026-344', pdf: '/invoices/TG-INV-2026-344.pdf' },
  { id: 2, date: '2026-05-01', month: 'May 2026', plan: 'Starter', amount: 4999, status: 'paid', invoiceNo: 'TG-INV-2026-343', pdf: '/invoices/TG-INV-2026-343.pdf' },
  { id: 1, date: '2026-04-01', month: 'April 2026', plan: 'Starter', amount: 4999, status: 'paid', invoiceNo: 'TG-INV-2026-342', pdf: '/invoices/TG-INV-2026-342.pdf' },
]


function ProfilePanel({ email, userId, username, onUsernameChange }) {
  const [profile, setProfile] = useState({
    username: username || '',
    name: localStorage.getItem('tezgrid_name') || '',
    phone: localStorage.getItem('tezgrid_phone') || '',
    company: localStorage.getItem('tezgrid_company') || '',
    address: localStorage.getItem('tezgrid_address') || '',
  })
  const [editOpen, setEditOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState(profile)

  useEffect(() => {
    if (!userId) return
    supabase
      .from('profiles')
      .select('username,name,phone,company,billing_address')
      .eq('id', userId)
      .single()
      .then(({ data, error }) => {
        if (error || !data) return
        const next = {
          username: data.username || '',
          name: data.name || '',
          phone: data.phone || '',
          company: data.company || '',
          address: data.billing_address || '',
        }
        setProfile(next)
        localStorage.setItem('tezgrid_username', next.username)
        localStorage.setItem('tezgrid_name', next.name)
        localStorage.setItem('tezgrid_phone', next.phone)
        localStorage.setItem('tezgrid_company', next.company)
        localStorage.setItem('tezgrid_address', next.address)
        if (next.username) onUsernameChange(next.username)
      })
  }, [userId, onUsernameChange])

  const openEdit = () => {
    setDraft(profile)
    setEditOpen(true)
  }

  const saveEdit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({
        username: draft.username,
        name: draft.name,
        phone: draft.phone,
        company: draft.company,
        billing_address: draft.address,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
    setSaving(false)
    if (error) {
      alert(`Couldn't save profile: ${error.message}`)
      return
    }
    setProfile(draft)
    localStorage.setItem('tezgrid_username', draft.username)
    localStorage.setItem('tezgrid_name', draft.name)
    localStorage.setItem('tezgrid_phone', draft.phone)
    localStorage.setItem('tezgrid_company', draft.company)
    localStorage.setItem('tezgrid_address', draft.address)
    onUsernameChange(draft.username)
    setEditOpen(false)
  }

  const ROWS = [
    { label: 'Username', value: profile.username },
    { label: 'Name', value: profile.name },
    { label: 'Email', value: email },
    { label: 'Phone number', value: profile.phone },
    { label: 'Company', value: profile.company },
    { label: 'Billing address', value: profile.address },
  ]

  return (
    <div className="dash-panel">
      <div className="dash-panel__head">
        <div>
          <h2>Profile</h2>
          <p className="dash-panel__lede">Your account details.</p>
        </div>
        <button className="btn btn-ghost" onClick={openEdit}>
          <Pencil size={15} /> Edit profile
        </button>
      </div>

      <div className="card dash-block dash-profile-view">
        {ROWS.map((r) => (
          <div className="dash-profile-row" key={r.label}>
            <span>{r.label}</span>
            <strong>{r.value || '—'}</strong>
          </div>
        ))}
      </div>

      {editOpen && (
        <div className="dash-modal-overlay" onClick={() => setEditOpen(false)}>
          <form className="card dash-modal" onClick={(e) => e.stopPropagation()} onSubmit={saveEdit}>
            <div className="dash-modal__head">
              <h3>Edit profile</h3>
              <button type="button" className="dash-modal__close" onClick={() => setEditOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <label className="dash-field">
              Username
              <input
                type="text"
                value={draft.username}
                onChange={(e) => setDraft((d) => ({ ...d, username: e.target.value }))}
                placeholder="How you'll appear in the header"
              />
            </label>
            <label className="dash-field">
              Name
              <input
                type="text"
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                placeholder="Your name"
              />
            </label>
            <label className="dash-field">
              Email
              <input type="email" value={email} disabled />
            </label>
            <label className="dash-field">
              Phone number
              <input
                type="tel"
                value={draft.phone}
                onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                placeholder="+91 00000 00000"
              />
            </label>
            <label className="dash-field">
              Company
              <input
                type="text"
                value={draft.company}
                onChange={(e) => setDraft((d) => ({ ...d, company: e.target.value }))}
                placeholder="Company name"
              />
            </label>
            <label className="dash-field">
              Billing address
              <textarea
                rows={3}
                value={draft.address}
                onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
                placeholder="Address that should appear on your invoices"
              />
            </label>

            <div className="dash-modal__actions">
              <button type="button" className="btn btn-ghost" onClick={() => setEditOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function PlansPanel() {
  return (
    <div className="dash-panel">
      <div className="dash-panel__head">
        <div>
          <h2>Plans</h2>
          <p className="dash-panel__lede">Your active subscription.</p>
        </div>
        <NavLink to="/pricing" className="dash-upgrade-link">
          <Briefcase size={15} /> View upgrade options
        </NavLink>
      </div>

      <div className="card dash-plan-card">
        <div className="dash-plan-card__badge">
          <Briefcase size={30} />
        </div>
        <h3>You're on the {ACTIVE_PLAN.name} Plan</h3>
        <p>
          Thanks for subscribing to the {ACTIVE_PLAN.name} plan — ₹{ACTIVE_PLAN.price.toLocaleString('en-IN')}/mo.
          As part of this plan, you have access to:
        </p>

        <div className="dash-plan-card__features">
          {ACTIVE_PLAN.features.map((f) => (
            <div className="dash-plan-card__feature" key={f}>
              <CheckCircle2 size={16} /> {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const LIVE_POINTS = 24
const LIVE_MIN = 120
const LIVE_MAX = 420

function useLiveSeries() {
  const [data, setData] = useState(() =>
    Array.from({ length: LIVE_POINTS }, () => 220 + Math.random() * 60),
  )

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1]
        const next = Math.min(LIVE_MAX, Math.max(LIVE_MIN, last + (Math.random() - 0.5) * 90))
        return [...prev.slice(1), next]
      })
    }, 1500)
    return () => clearInterval(id)
  }, [])

  return data
}

function LiveRequestsChart() {
  const data = useLiveSeries()
  const W = 600
  const H = 160
  const step = W / (data.length - 1)

  const linePoints = data.map((v, i) => {
    const x = i * step
    const y = H - ((v - LIVE_MIN) / (LIVE_MAX - LIVE_MIN)) * H
    return [x, y]
  })
  const linePath = linePoints.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${W},${H} L0,${H} Z`
  const [lastX, lastY] = linePoints[linePoints.length - 1]
  const current = Math.round(data[data.length - 1])

  return (
    <div className="card dash-livechart">
      <div className="dash-livechart__head">
        <div>
          <span className="dash-usage__label">API requests</span>
          <strong className="dash-livechart__current">{current} <em>req/s</em></strong>
        </div>
        <span className="pill pill--good dash-livechart__live">
          <span className="dot dot--live" /> Live
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="dash-livechart__svg">
        <defs>
          <linearGradient id="liveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} className="dash-livechart__grid" />
        <path d={areaPath} fill="url(#liveFill)" />
        <path d={linePath} fill="none" stroke="var(--cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={lastX} cy={lastY} r="4.5" fill="var(--cyan)" className="dash-livechart__dot" />
      </svg>

      <span className="dash-livechart__caption">Last 60 seconds · updates automatically</span>
    </div>
  )
}

function UsagePanel() {
  const STATS = [
    { label: 'API requests this month', value: '12,480 / 50,000', pct: 25 },
    { label: 'Storage used', value: '10 GB / 100 GB', pct: 10 },
    { label: 'Bandwidth', value: '148 GB / 500 GB', pct: 30 },
    { label: 'Database queries', value: '482K / 2M', pct: 24 },
    { label: 'Active projects', value: '3 / 6', pct: 50 },
    { label: 'Team seats', value: '4 / 10', pct: 40 },
    { label: 'Uptime this month', value: '99.98%', pct: 100 },
  ]
  return (
    <div className="dash-panel">
      <h2>Usage</h2>
      <p className="dash-panel__lede">A snapshot of what you're using right now.</p>

      <LiveRequestsChart />

      <div className="dash-usage-grid">
        {STATS.map((s) => (
          <div className="card dash-block" key={s.label}>
            <span className="dash-usage__label">{s.label}</span>
            <strong className="dash-usage__value">{s.value}</strong>
            <div className="dash-usage__bar">
              <div className="dash-usage__bar-fill" style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InvoiceModal({ entry, onClose, onPay }) {
  const isPaid = entry.status === 'paid'
  const address = localStorage.getItem('tezgrid_address') || ''
  const paymentDate = new Date(entry.date.slice(0, 7) + '-01').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="dash-modal-overlay" onClick={onClose}>
      <div className="dash-invoice-wrap" onClick={(e) => e.stopPropagation()}>
        <div className="dash-invoice-brand">
          <img src="/logo-mark.png" alt="" width={26} height={26} />
          <span>TezGrid Associates</span>
        </div>

        <div className="dash-invoice">
          <button type="button" className="dash-modal__close dash-invoice__close" onClick={onClose}>
            <X size={18} />
          </button>

          <div className="dash-invoice__icon">
            <FileText size={40} strokeWidth={1.3} />
            <span className={`dash-invoice__badge ${isPaid ? 'is-paid' : 'is-pending'}`}>
              {isPaid ? <Check size={13} /> : <Clock size={13} />}
            </span>
          </div>

          <p className="dash-invoice__status">{isPaid ? 'Invoice paid' : 'Payment pending'}</p>
          <strong className="dash-invoice__amount">₹{entry.amount.toLocaleString('en-IN')}</strong>

          <div className="dash-invoice__rows">
            <div className="dash-invoice__row">
              <span>Invoice number</span>
              <strong>{entry.invoiceNo}</strong>
            </div>
            <div className="dash-invoice__row">
              <span>Payment date</span>
              <strong>{paymentDate}</strong>
            </div>
            <div className="dash-invoice__row">
              <span>Plan</span>
              <strong>{entry.plan}</strong>
            </div>
          </div>

          {address && (
            <div className="dash-invoice__billed-to">
              <span>Billed to</span>
              <p>{address}</p>
            </div>
          )}

          {entry.pdf && (
            <a
              href={entry.pdf}
              download
              className={`btn ${isPaid ? 'btn-primary' : 'btn-ghost'} dash-invoice__pay`}
            >
              <Download size={16} /> Download invoice
            </a>
          )}

          {!isPaid && (
            <button type="button" className="btn btn-primary dash-invoice__pay" onClick={onPay}>
              Pay now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function PaymentModal({ entry, onClose, onPaid }) {
  const [tab, setTab] = useState('qr')
  const [paid, setPaid] = useState(false)
  const billingEmail = localStorage.getItem('tezgrid_user') || ''

  const confirmPaid = () => {
    setPaid(true)
    onPaid?.()
  }

  if (entry.renew && paid) {
    return (
      <div className="dash-modal-overlay" onClick={onClose}>
        <div className="card dash-modal dash-cancel" onClick={(e) => e.stopPropagation()}>
          <div className="dash-cancel__icon dash-cancel__icon--done">
            <Check size={22} />
          </div>
          <h3>Payment received</h3>
          <p>
            Your {entry.plan} plan is active. An invoice has been emailed to{' '}
            <strong>{billingEmail}</strong>, along with a confirmation of your renewal.
          </p>
          <button type="button" className="btn btn-primary btn-block" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dash-modal-overlay" onClick={onClose}>
      <form className="card dash-modal dash-pay" onClick={(e) => e.stopPropagation()} onSubmit={(e) => e.preventDefault()}>
        <div className="dash-modal__head">
          <h3>Pay ₹{entry.amount.toLocaleString('en-IN')}</h3>
          <button type="button" className="dash-modal__close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <p className="dash-pay__sub">{entry.plan} plan — {entry.month} — {entry.invoiceNo}</p>

        {!entry.renew && (
          <div className="dash-pay__tabs">
            <button type="button" className={tab === 'qr' ? 'is-active' : ''} onClick={() => setTab('qr')}>
              Scan &amp; pay
            </button>
            <button type="button" className={tab === 'bank' ? 'is-active' : ''} onClick={() => setTab('bank')}>
              Other pay options
            </button>
          </div>
        )}

        {tab === 'qr' ? (
          <div className="dash-pay__qr">
            <img
              src={entry.amount === 4999 ? '/payment-qr-4999.jpeg' : '/payment-qr.jpeg'}
              alt="Scan to pay"
              className="dash-qr"
            />
            <p>Scan with any UPI app to pay ₹{entry.amount.toLocaleString('en-IN')}</p>
            {entry.renew && (
              <button type="button" className="btn btn-primary btn-block" onClick={confirmPaid}>
                I've made the payment
              </button>
            )}
          </div>
        ) : (
          <div className="dash-pay__bank">
            <div className="dash-pay__bank-icon">
              <Mail size={22} />
            </div>
            <p>
              An invoice with our bank account details for direct transfer has been sent to{' '}
              <strong>{billingEmail}</strong>.
            </p>
            {entry.pdf && (
              <a href={entry.pdf} download className="btn btn-primary dash-pay__download">
                <Download size={16} /> Download invoice {entry.invoiceNo}
              </a>
            )}
            <p className="dash-pay__note">Use {entry.invoiceNo} as the payment reference.</p>
          </div>
        )}
      </form>
    </div>
  )
}

function CancelPlanModal({ plan, until, email, onConfirm, onClose }) {
  const [done, setDone] = useState(false)

  const confirm = () => {
    setDone(true)
    onConfirm()
  }

  return (
    <div className="dash-modal-overlay" onClick={onClose}>
      <div className="card dash-modal dash-cancel" onClick={(e) => e.stopPropagation()}>
        {done ? (
          <>
            <div className="dash-cancel__icon dash-cancel__icon--done">
              <Check size={22} />
            </div>
            <h3>Plan cancelled</h3>
            <p>
              Your {plan} plan stays active until <strong>{until}</strong> — after that it won't renew. A
              confirmation email has been sent to <strong>{email}</strong>.
            </p>
            <button type="button" className="btn btn-primary btn-block" onClick={onClose}>
              Done
            </button>
          </>
        ) : (
          <>
            <div className="dash-modal__head">
              <h3>Cancel your {plan} plan?</h3>
              <button type="button" className="dash-modal__close" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
            <p className="dash-cancel__body">
              Cancellation takes effect immediately, but you'll keep full access until{' '}
              <strong>{until}</strong> — the end of your current billing period. After that, your
              subscription will end and won't be renewed. We'll email a confirmation to{' '}
              <strong>{email}</strong>.
            </p>
            <div className="dash-modal__actions">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Never mind
              </button>
              <button type="button" className="btn dash-cancel__confirm" onClick={confirm}>
                Yes, cancel plan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const RENEW_PLANS = [
  { key: 'starter', name: 'Starter', price: 4999, tagline: 'For a single app or MVP finding its feet' },
  { key: 'business', name: 'Business', price: 17499, tagline: 'For growing apps that need dedicated resources', highlight: true },
]

function RenewPlanModal({ email, onChoosePlan, onClose }) {
  const [custom, setCustom] = useState(false)
  const [customMsg, setCustomMsg] = useState('')
  const [sent, setSent] = useState(false)

  const sendCustomRequest = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="dash-modal-overlay" onClick={onClose}>
      <div className="card dash-modal dash-renew" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <>
            <div className="dash-cancel__icon dash-cancel__icon--done">
              <Check size={22} />
            </div>
            <h3>Request sent</h3>
            <p>
              We've emailed your custom plan request to our team, and a copy to{' '}
              <strong>{email}</strong>. The TezGrid team will reach out to you shortly.
            </p>
            <button type="button" className="btn btn-primary btn-block" onClick={onClose}>
              Done
            </button>
          </>
        ) : custom ? (
          <form onSubmit={sendCustomRequest}>
            <div className="dash-modal__head">
              <h3>Tell us what you need</h3>
              <button type="button" className="dash-modal__close" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
            <label className="dash-field">
              Your requirement
              <textarea
                rows={4}
                required
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Traffic, data and compliance needs — we'll design a plan around it."
              />
            </label>
            <div className="dash-modal__actions">
              <button type="button" className="btn btn-ghost" onClick={() => setCustom(false)}>
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Send request
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="dash-modal__head">
              <h3>Renew your subscription</h3>
              <button type="button" className="dash-modal__close" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
            <p className="dash-cancel__body">Choose a plan to pick up right where you left off.</p>

            <div className="dash-renew__plans">
              {RENEW_PLANS.map((p) => (
                <div className={`dash-renew__plan ${p.highlight ? 'is-highlight' : ''}`} key={p.key}>
                  <div>
                    <strong>{p.name}</strong>
                    <span>₹{p.price.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <button
                    type="button"
                    className={`btn ${p.highlight ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => onChoosePlan({ plan: p.name, amount: p.price })}
                  >
                    Choose &amp; pay
                  </button>
                </div>
              ))}

              <div className="dash-renew__plan">
                <div>
                  <strong>Custom</strong>
                  <span>Built around your needs</span>
                </div>
                <button type="button" className="btn btn-ghost" onClick={() => setCustom(true)}>
                  Get in touch
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function BillingPanel({ onEditAddress }) {
  const [viewing, setViewing] = useState(null)
  const [paying, setPaying] = useState(null)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [renewOpen, setRenewOpen] = useState(false)
  const [billingHistory, setBillingHistory] = useState(BILLING_HISTORY)
  const [activePlanName, setActivePlanName] = useState(ACTIVE_PLAN.name)
  const address = localStorage.getItem('tezgrid_address') || ''
  const email = localStorage.getItem('tezgrid_user') || ''
  const pending = billingHistory.find((h) => h.status === 'pending')
  const periodEnd = 'Aug 8, 2026'

  const handleRenewPaid = () => {
    const now = new Date()
    setBillingHistory((h) => [
      {
        id: Date.now(),
        date: now.toISOString().slice(0, 10),
        month: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        plan: paying.plan,
        amount: paying.amount,
        status: 'paid',
        invoiceNo: paying.invoiceNo,
      },
      ...h,
    ])
    setActivePlanName(paying.plan)
    setCancelled(false)
  }

  return (
    <div className="dash-panel">
      <h2>Billing</h2>
      <p className="dash-panel__lede">Your current plan and payment details.</p>

      {cancelled ? (
        <div className="card dash-alert dash-alert--neutral">
          <Clock size={20} />
          <div>
            <strong>Plan cancelled</strong>
            <p>Your {activePlanName} plan stays active until {periodEnd}, then it will end.</p>
          </div>
        </div>
      ) : (
        pending && (
          <div className="card dash-alert">
            <AlertTriangle size={20} />
            <div>
              <strong>Payment due — {pending.note}</strong>
              <p>Your {pending.plan} plan payment is pending. Pay today or your subscription will be cancelled on {periodEnd}.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setPaying(pending)}>
              Pay now
            </button>
          </div>
        )
      )}

      <div className="card dash-block dash-billing__plan">
        <div>
          <span className="dash-usage__label">Active plan</span>
          <div className="dash-billing__plan-name">
            <strong className="dash-usage__value">{activePlanName}</strong>
            {cancelled && <span className="pill pill--neutral">Cancels {periodEnd}</span>}
          </div>
        </div>
        {cancelled ? (
          <button className="btn btn-primary" onClick={() => setRenewOpen(true)}>
            Renew plan
          </button>
        ) : (
          <button className="btn btn-ghost" onClick={() => setCancelOpen(true)}>
            Cancel plan
          </button>
        )}
      </div>

      <div className="card dash-block">
        <span className="dash-usage__label"><MapPin size={14} /> Billing address</span>
        {address ? (
          <>
            <p className="dash-billing__note">{address}</p>
            <button className="btn btn-ghost" onClick={onEditAddress}>
              <Pencil size={14} /> Edit
            </button>
          </>
        ) : (
          <button className="btn btn-ghost" onClick={onEditAddress}>
            <Plus size={14} /> Add address
          </button>
        )}
      </div>

      <div className="card dash-block dash-history">
        <span className="dash-usage__label">Billing history</span>
        <div className="dash-history__list">
          {billingHistory.map((h) => (
            <div className="dash-history__row" key={h.id}>
              <span className={`dash-history__status ${h.status === 'paid' ? 'is-paid' : 'is-pending'}`}>
                {h.status === 'paid' ? <Check size={13} /> : <Clock size={13} />}
              </span>
              <span className="dash-history__date">{h.month}</span>
              <span className="dash-history__desc">
                Cloud Hosting subscription — {h.plan}
                {h.status === 'pending' && <em> (Pending)</em>}
              </span>
              <span className="dash-history__amount">₹{h.amount.toLocaleString('en-IN')}</span>
              <button className="dash-history__view" onClick={() => setViewing(h)}>
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {viewing && (
        <InvoiceModal
          entry={viewing}
          onClose={() => setViewing(null)}
          onPay={() => {
            setPaying(viewing)
            setViewing(null)
          }}
        />
      )}
      {paying && (
        <PaymentModal
          entry={paying}
          onClose={() => setPaying(null)}
          onPaid={paying.renew ? handleRenewPaid : undefined}
        />
      )}
      {cancelOpen && (
        <CancelPlanModal
          plan={activePlanName}
          until={periodEnd}
          email={email}
          onConfirm={() => setCancelled(true)}
          onClose={() => setCancelOpen(false)}
        />
      )}
      {renewOpen && (
        <RenewPlanModal
          email={email}
          onClose={() => setRenewOpen(false)}
          onChoosePlan={(choice) => {
            setRenewOpen(false)
            setPaying({
              id: 'renew',
              month: 'New subscription',
              plan: choice.plan,
              amount: choice.amount,
              status: 'pending',
              invoiceNo: 'TG-INV-2026-349',
              renew: true,
            })
          }}
        />
      )}
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [active, setActive] = useState('profile')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [username, setUsername] = useState(() => localStorage.getItem('tezgrid_username') || '')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login')
        return
      }
      setEmail(session.user.email)
      setUserId(session.user.id)
      localStorage.setItem('tezgrid_user', session.user.email)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login')
        return
      }
      setEmail(session.user.email)
      setUserId(session.user.id)
      localStorage.setItem('tezgrid_user', session.user.email)
    })

    return () => listener.subscription.unsubscribe()
  }, [navigate])

  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('tezgrid_user')
    navigate('/login')
  }

  return (
    <div className="dash-app">
      <header className="dash-header">
        <div className="dash-header__left">
          <button
            className="dash-header__toggle"
            onClick={() => setSidebarOpen((v) => !v)}
            title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            {sidebarOpen ? <PanelLeftClose size={19} /> : <PanelLeftOpen size={19} />}
          </button>
          <NavLink to="/" className="dash-header__brand">
            <img src="/logo-mark.png" alt="" width={30} height={30} />
            <span>Tez<span className="navbar__logo-accent">Grid</span> <span className="navbar__logo-suffix">Associates</span></span>
          </NavLink>
        </div>
        <div className="dash-header__user">
          <div className="dashboard__avatar">
            <Check size={15} />
          </div>
          <span>{username || email}</span>
        </div>
      </header>

      <div className="dashboard">
        <aside className={`dashboard__sidebar ${sidebarOpen ? '' : 'is-collapsed'}`}>
          <nav className="dashboard__nav">
            {NAV.map((n) => (
              <button
                key={n.key}
                className={`dashboard__nav-item ${active === n.key ? 'is-active' : ''}`}
                onClick={() => setActive(n.key)}
              >
                <n.icon size={18} /> {n.label}
              </button>
            ))}
          </nav>
          <button className="dashboard__nav-item dashboard__logout" onClick={logout}>
            <LogOut size={18} /> Log out
          </button>
        </aside>

        <div className="dashboard__content">
          {active === 'profile' && (
            <ProfilePanel email={email} userId={userId} username={username} onUsernameChange={setUsername} />
          )}
          {active === 'plans' && <PlansPanel />}
          {active === 'usage' && <UsagePanel />}
          {active === 'billing' && <BillingPanel onEditAddress={() => setActive('profile')} />}
        </div>
      </div>
    </div>
  )
}
