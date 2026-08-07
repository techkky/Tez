import { NavLink } from 'react-router-dom'
import {
  ArrowRight,
  ExternalLink,
  ShoppingCart,
  Boxes,
  Wallet,
  Users,
  TrendingUp,
  BarChart3,
  Zap,
  Gauge,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import './Products.css'

const MODULES = [
  {
    icon: ShoppingCart,
    title: 'Procurement',
    desc: 'Purchase requests, vendor management, purchase orders and approvals in one workflow.',
    status: 'live',
  },
  {
    icon: Boxes,
    title: 'Inventory',
    desc: 'Stock levels, warehouses and movement tracking in real time.',
    status: 'soon',
  },
  {
    icon: Wallet,
    title: 'Finance',
    desc: 'Invoicing, expenses and financial reporting tied to every transaction.',
    status: 'soon',
  },
  {
    icon: Users,
    title: 'People / HR',
    desc: 'Employee records, attendance and payroll, from onboarding onward.',
    status: 'soon',
  },
  {
    icon: TrendingUp,
    title: 'Sales',
    desc: 'Quotes, orders and customer pipeline, connected to procurement and stock.',
    status: 'soon',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    desc: 'Real-time dashboards across every module you subscribe to.',
    status: 'soon',
  },
]

const WHY = [
  {
    icon: Zap,
    title: 'Intelligence & automation',
    desc: 'Approvals, alerts and repetitive workflow steps run themselves, so your team works on exceptions, not paperwork.',
  },
  {
    icon: Gauge,
    title: 'Real-time insights',
    desc: 'Every module feeds the same live data — no waiting on end-of-month reports to know where you stand.',
  },
  {
    icon: ShieldCheck,
    title: 'Built & supported by TezGrid Associates',
    desc: 'The same team that builds custom software for clients builds and runs Zyhawk — support included, not outsourced.',
  },
]

export default function Products() {
  return (
    <>
      <section className="section section--tight products-hero">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">
              <Boxes size={14} /> Our Product
            </span>
            <h1>
              Zyhawk — <span className="gradient-text">Smart ERP. Powerful Results.</span>
            </h1>
            <p>
              Manage your entire business — from procurement to people — with intelligence,
              automation and real-time insights. Built by TezGrid Associates, available on
              subscription.
            </p>
            <div className="products-hero__actions">
              <a href="https://zyhawk.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Request a live demo <ArrowRight size={16} />
              </a>
              <a href="https://zyhawk.in" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Visit zyhawk.in <ExternalLink size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Modules</span>
            <h2>One ERP, built module by module</h2>
            <p>Subscribe to what's live today — the rest of the suite rolls out as it ships.</p>
          </div>

          <div className="modules-grid">
            {MODULES.map((m, i) => (
              <Reveal as="div" delay={i * 50} className={`card module-card ${m.status === 'live' ? 'module-card--live' : ''}`} key={m.title}>
                <div className="module-card__head">
                  <div className="module-card__icon">
                    <m.icon size={22} />
                  </div>
                  {m.status === 'live' ? (
                    <span className="pill pill--good">Live</span>
                  ) : (
                    <span className="pill pill--neutral">Coming soon</span>
                  )}
                </div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section why">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Why Zyhawk</span>
            <h2>ERP that keeps up with how your business actually runs</h2>
          </Reveal>

          <div className="modules-grid">
            {WHY.map((w, i) => (
              <Reveal as="div" delay={i * 70} className="card module-card" key={w.title}>
                <div className="module-card__icon">
                  <w.icon size={22} />
                </div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <Reveal className="card subscription-note">
            <CheckCircle2 size={22} />
            <p>
              Zyhawk is offered on a subscription basis, priced to the modules and team size you
              need — not a one-size-fits-all license.{' '}
              <NavLink to="/pricing">See pricing</NavLink> or{' '}
              <NavLink to="/contact">talk to us</NavLink> about your requirement.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight cta-banner">
        <Reveal className="container cta-banner__inner card">
          <h2>Ready to see Zyhawk in action?</h2>
          <p>Book a live demo and we'll walk through the Procurement module on your data.</p>
          <a href="https://zyhawk.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Request a live demo <ArrowRight size={16} />
          </a>
        </Reveal>
      </section>
    </>
  )
}
