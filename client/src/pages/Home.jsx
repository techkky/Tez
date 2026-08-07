import { NavLink } from 'react-router-dom'
import {
  ArrowRight,
  Code2,
  Boxes,
  MessagesSquare,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import './Home.css'

const PILLARS = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    desc: 'Websites, mobile apps and cloud hosting built around your exact requirement — not a template.',
    link: '/services',
  },
  {
    icon: Boxes,
    title: 'Our Products',
    desc: 'Subscription-based software we build and run ourselves, sold directly to businesses.',
    link: '/contact',
  },
  {
    icon: MessagesSquare,
    title: 'IT Consulting',
    desc: 'Tell us the business problem — we design and build the software that actually solves it.',
    link: '/contact',
  },
]

const STATS = [
  { value: '3', label: 'Core service lines' },
  { value: '24/7', label: 'Support & consulting' },
  { value: '1', label: 'Accountable team' },
  { value: '100%', label: 'Requirement-first builds' },
]

const STEPS = [
  {
    title: 'Tell us what you need',
    desc: 'A custom build, one of our products, or help figuring out the right software approach.',
  },
  {
    title: 'We design the solution',
    desc: 'Our team scopes the app, product fit or architecture around your actual business problem.',
  },
  {
    title: 'You launch, we stay involved',
    desc: 'Development, deployment and ongoing support — on a subscription or project basis, your call.',
  },
]

const WHY = [
  'One partner for development, products and consulting — not three vendors',
  'Software built around your requirement, not a fixed package',
  'Our own products are used the way we build for clients',
  'A real team on call — not a support ticket queue',
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <Reveal>
            <span className="eyebrow">
              <Sparkles size={14} /> IT Services & Solutions
            </span>
            <h1 className="hero__title">
              We build it. We run it. <span className="gradient-text">You grow.</span>
            </h1>
            <p className="hero__subtitle">
              TezGrid Associates builds custom software for clients, runs our own subscription
              products, and consults on the software that actually solves your business problem —
              websites, mobile apps and cloud hosting included.
            </p>
            <div className="hero__actions">
              <NavLink to="/contact" className="btn btn-primary">
                Get a free consultation <ArrowRight size={16} />
              </NavLink>
              <NavLink to="/services" className="btn btn-ghost">
                Explore services
              </NavLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="hero__panel-wrap">
            <div className="hero__panel card">
              <div className="hero__panel-head">
                <span className="dot dot--live" /> What we deliver
              </div>
              {[
                ['Custom Software', 'Web · Mobile · Cloud', 'good'],
                ['Our Products', 'In development', 'neutral'],
                ['Consulting', 'Ongoing engagements', 'neutral'],
                ['Support', '24/7', 'good'],
              ].map(([label, value, tone]) => (
                <div className="hero__panel-row" key={label}>
                  <span>{label}</span>
                  <span className={`pill pill--${tone}`}>{value}</span>
                </div>
              ))}
              <div className="hero__panel-footer">
                <CheckCircle2 size={15} /> Delivered end-to-end by TezGrid Associates
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="stat-bar container" delay={200}>
          {STATS.map((s) => (
            <div className="stat-bar__item" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2>Three ways to work with TezGrid Associates</h2>
            <p>Pick a custom build, subscribe to a product, or bring us the problem — we handle the software.</p>
          </div>

          <div className="grid-6">
            {PILLARS.map((s, i) => (
              <Reveal as="div" delay={i * 60} className="card service-card" key={s.title}>
                <div className="service-card__icon">
                  <s.icon size={22} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <NavLink to={s.link} className="service-card__link">
                  Learn more <ArrowRight size={14} />
                </NavLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight steps">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>From requirement to running in three steps</h2>
          </div>

          <div className="steps__grid">
            {STEPS.map((step, i) => (
              <Reveal as="div" delay={i * 100} className="steps__item" key={step.title}>
                <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section why">
        <div className="container why__grid">
          <Reveal>
            <span className="eyebrow">Why TezGrid Associates</span>
            <h2>
              Software that stays out of <span className="gradient-text">your</span> way
            </h2>
            <p className="why__lede">
              Most businesses end up juggling a freelance developer, a SaaS subscription and an
              agency for advice. TezGrid Associates replaces that patchwork with one accountable
              partner for development, products and consulting.
            </p>
          </Reveal>
          <Reveal delay={150} className="why__list">
            {WHY.map((item) => (
              <div className="why__item" key={item}>
                <CheckCircle2 size={18} />
                <span>{item}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section--tight cta-banner">
        <Reveal className="container cta-banner__inner card">
          <h2>Ready to build, subscribe, or just talk it through?</h2>
          <p>Tell us what you're working on — we'll come back with a plan the same week.</p>
          <NavLink to="/contact" className="btn btn-primary">
            Talk to TezGrid Associates <ArrowRight size={16} />
          </NavLink>
        </Reveal>
      </section>
    </>
  )
}
