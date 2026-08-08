import { NavLink } from 'react-router-dom'
import {
  ArrowRight,
  Code2,
  Sparkles,
  FileSpreadsheet,
  LayoutDashboard,
  MapPin,
  Server,
  MessagesSquare,
  Settings2,
  CheckCircle2,
  PhoneCall,
  FileText,
  Hammer,
  Rocket,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import './Services.css'

const SERVICES = [
  {
    icon: Code2,
    title: 'Website & App Development',
    desc: 'Custom websites and mobile apps built around your business — not a template.',
    points: ['Custom UI for your brand', 'Website, mobile app, or both', 'Built to handle real traffic'],
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Solutions',
    desc: 'Add smart features to your existing software.',
    points: ['AI search & chatbots', 'Auto-summaries from your data', 'Works with what you already have'],
  },
  {
    icon: FileSpreadsheet,
    title: 'Excel & Data Migration',
    desc: 'Move your Excel sheets into a proper system.',
    points: ['Bulk import, no manual re-entry', 'No data or formatting loss', 'One-time or ongoing sync'],
  },
  {
    icon: LayoutDashboard,
    title: 'Customer Portals',
    desc: "Give your customers their own login.",
    points: ['Branded to your business', 'Orders, bills & status in one place', 'Updates in real time'],
  },
  {
    icon: MapPin,
    title: 'Field Team Tracking',
    desc: 'Know what your field staff are doing.',
    points: ['Live GPS location', 'QR-code attendance', 'Automatic daily reports'],
  },
  {
    icon: Server,
    title: 'Cloud Hosting',
    desc: 'Hosting for your website or app, managed by us.',
    points: ['24/7 monitoring & backups', 'Auto-scales for traffic spikes', 'We handle the downtime, not you'],
  },
  {
    icon: MessagesSquare,
    title: 'IT Consulting',
    desc: 'Not sure what to build yet?',
    points: ['Free requirement discovery call', 'A clear written plan first', 'Advice even if you don’t build with us'],
  },
]

const STEPS = [
  {
    icon: PhoneCall,
    title: 'One call to understand your problem',
    desc: 'No sales pitch — a real conversation about what’s costing you time or money right now.',
  },
  {
    icon: FileText,
    title: 'A written plan you can actually read',
    desc: 'What we’ll build, how long it’ll take, and the price — in plain language, before we start.',
  },
  {
    icon: Hammer,
    title: 'Weekly updates while we build',
    desc: 'A live link from day one, so you watch it come together instead of waiting for a big reveal.',
  },
  {
    icon: Rocket,
    title: 'Launch, handover & support',
    desc: 'We deploy it, walk your team through it, and stay reachable after launch — not just until payment clears.',
  },
]

export default function Services() {
  return (
    <>
      <section className="section section--tight services-hero">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Services</span>
            <h1>Everything it takes to turn your requirement into working software</h1>
            <p>
              Website, mobile app and cloud hosting delivered as custom development — plus
              consulting when you need help figuring out what to build at all.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="container services-grid">
          {SERVICES.map((s, i) => (
            <Reveal as="div" delay={i * 50} className="card service-tile" key={s.title}>
              <div className="service-tile__icon">
                <s.icon size={22} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>
                    <CheckCircle2 size={14} /> {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section--tight steps">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How we work</span>
            <h2>From first call to launch, in four steps</h2>
          </div>

          <div className="steps__grid">
            {STEPS.map((step, i) => (
              <Reveal as="div" delay={i * 100} className="card steps__item" key={step.title}>
                <div className="steps__icon">
                  <step.icon size={20} />
                </div>
                <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section custom-plan">
        <div className="container custom-plan__inner">
          <Reveal className="custom-plan__text">
            <span className="eyebrow">
              <Settings2 size={14} /> Tailored, not templated
            </span>
            <h2>
              Every project is <span className="gradient-text">scoped around your requirement</span>
            </h2>
            <p>
              Tell us what you're building and why — we combine the right mix of website, mobile
              app, hosting and consulting into a plan sized exactly for your business, not a
              generic package.
            </p>
            <NavLink to="/contact" className="btn btn-primary">
              Get a custom quote <ArrowRight size={16} />
            </NavLink>
          </Reveal>
          <Reveal delay={120} className="custom-plan__card card">
            <div className="custom-plan__row">
              <span>Website</span><span>Custom-built</span>
            </div>
            <div className="custom-plan__row">
              <span>Mobile app</span><span>iOS + Android</span>
            </div>
            <div className="custom-plan__row">
              <span>Hosting</span><span>Managed & monitored</span>
            </div>
            <div className="custom-plan__row">
              <span>Consulting</span><span>Included throughout</span>
            </div>
            <div className="custom-plan__row custom-plan__row--total">
              <span>Your plan</span><span>Built with you</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
