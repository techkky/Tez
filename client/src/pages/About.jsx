import { NavLink } from 'react-router-dom'
import { ArrowRight, Target, Handshake, ShieldCheck, Headset, Layers, Boxes, Code2, MessagesSquare } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import './About.css'

const VALUES = [
  {
    icon: Target,
    title: 'Requirement first',
    desc: 'We scope around what your business actually needs before we talk technology or timelines.',
  },
  {
    icon: Handshake,
    title: 'Transparent scoping',
    desc: 'Custom projects get a clear quote before work starts. Every subscription gets clear terms. No surprise line items.',
  },
  {
    icon: ShieldCheck,
    title: 'Security by default',
    desc: 'Access control, backups and secure hosting ship with every build and every subscription.',
  },
  {
    icon: Headset,
    title: 'A team, not a ticket queue',
    desc: 'You reach people who know your project — for a client build, a hosting subscription, or a consulting call.',
  },
]

const STATS = [
  { value: '3', label: 'Core service lines' },
  { value: '24/7', label: 'Support & consulting' },
  { value: '1', label: 'Accountable team' },
  { value: '100%', label: 'Requirement-first builds' },
]

const PILLARS = [
  {
    icon: Code2,
    title: 'Custom development',
    desc: 'Websites, mobile apps and the cloud hosting behind them, built for one client at a time.',
  },
  {
    icon: Boxes,
    title: 'Our own products',
    desc: 'Software we build, run and support ourselves, sold on subscription.',
  },
  {
    icon: MessagesSquare,
    title: 'Consulting',
    desc: 'Helping clients figure out the right software approach before a single line of code is written.',
  },
]

export default function About() {
  return (
    <>
      <section className="section section--tight about-hero">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">About TezGrid Associates</span>
            <h1>
              IT services, products and consulting, <span className="gradient-text">under one roof</span>
            </h1>
            <p>
              TezGrid Associates exists because most businesses end up stitching together a
              freelance developer, a SaaS subscription and an agency for advice. We do all three
              ourselves — custom software, our own products, and the consulting to tell you which
              one you actually need.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <Reveal className="stat-bar">
            {STATS.map((s) => (
              <div className="stat-bar__item" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-mission">
          <Reveal className="about-mission__text">
            <span className="eyebrow">
              <Layers size={14} /> Our approach
            </span>
            <h2>We design your solution instead of selling you a package</h2>
            <p>
              Every engagement starts with the same question: what's the actual business problem?
              From there we point you toward custom development, one of our products, or
              straight consulting — sometimes a mix of all three — and manage it for as long as
              you're with us.
            </p>
          </Reveal>
          <Reveal delay={120} className="about-mission__icon">
            <Boxes size={64} strokeWidth={1.4} />
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">How we work</span>
            <h2>Three service lines, one accountable team</h2>
          </Reveal>

          <div className="pillars-grid">
            {PILLARS.map((p, i) => (
              <Reveal as="div" delay={i * 70} className="card value-card" key={p.title}>
                <div className="value-card__icon">
                  <p.icon size={22} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">What we stand for</span>
            <h2>The principles behind every project we take on</h2>
          </Reveal>

          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal as="div" delay={i * 70} className="card value-card" key={v.title}>
                <div className="value-card__icon">
                  <v.icon size={22} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight cta-banner">
        <Reveal className="container cta-banner__inner card">
          <h2>Want software that actually fits your business?</h2>
          <p>Tell us what you're working on — we'll point you to the right path.</p>
          <NavLink to="/contact" className="btn btn-primary">
            Talk to TezGrid Associates <ArrowRight size={16} />
          </NavLink>
        </Reveal>
      </section>
    </>
  )
}
