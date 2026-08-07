import { NavLink } from 'react-router-dom'
import {
  ArrowRight,
  Globe,
  Smartphone,
  Server,
  Database,
  HardDrive,
  Cpu,
  ShieldCheck,
  Activity,
  MessagesSquare,
  CheckCircle2,
  Settings2,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import './Services.css'

const SERVICES = [
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Marketing sites, dashboards and web platforms built around your workflow, not a page builder template.',
    points: [
      'Custom UI, built for your brand and users',
      'Admin panels and internal tools',
      'API integrations with your existing systems',
      'Performance and SEO handled from day one',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'iOS and Android apps designed around the workflow your team or customers actually use.',
    points: [
      'Native and cross-platform builds',
      'Backend APIs built alongside the app',
      'Push notifications, payments, auth built in',
      'App store submission and updates handled',
    ],
  },
  {
    icon: Server,
    title: 'Cloud Hosting',
    desc: 'Production-ready hosting for the web apps, APIs and sites we build — auto-scaled to match real traffic instead of guesswork.',
    points: [
      'Auto-scaling infrastructure for traffic spikes',
      'Separate staging and production environments',
      'One-click, zero-downtime deployments',
      'Global CDN edge caching for faster load times',
    ],
  },
  {
    icon: Database,
    title: 'Managed Databases',
    desc: 'SQL and NoSQL databases, provisioned, tuned and backed up so your data layer is never the thing that breaks at 2am.',
    points: [
      'PostgreSQL, MySQL, MongoDB & Redis support',
      'Automated daily backups with point-in-time recovery',
      'Read replicas for high-traffic workloads',
      'Query performance monitoring and tuning',
    ],
  },
  {
    icon: HardDrive,
    title: 'Cloud Storage',
    desc: 'Scalable object and file storage for media, user uploads and backups, delivered through a CDN wherever your users are.',
    points: [
      'S3-compatible object storage, scales automatically',
      'CDN-backed delivery for images, video & files',
      'Versioning and lifecycle policies built in',
      'Encrypted at rest and in transit',
    ],
  },
  {
    icon: Cpu,
    title: 'Dedicated Cloud Servers',
    desc: 'Virtual or dedicated compute sized around your actual workload, not a one-size-fits-all instance.',
    points: [
      'Custom vCPU, RAM and disk configurations',
      'Root/admin access when you need control',
      'Private networking between your services',
      'Point-in-time snapshots and easy rollback',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance',
    desc: 'Firewalls, encryption and access control included in every plan, not sold as an expensive add-on later.',
    points: [
      'Web application firewall & DDoS protection',
      'Free SSL/TLS certificates, auto-renewed',
      'Role-based access control for your team',
      'Full audit logging for every change',
    ],
  },
  {
    icon: Activity,
    title: '24/7 Monitoring & Support',
    desc: 'A real team watching uptime, performance and security around the clock, backed by clear response-time SLAs.',
    points: [
      'Real-time uptime & performance alerting',
      'On-call engineers for critical incidents',
      'Monthly infrastructure health reports',
      'Guaranteed incident response SLA',
    ],
  },
  {
    icon: MessagesSquare,
    title: 'IT Consulting',
    desc: 'Not sure what to build yet? We start from the business problem and work backward to the software.',
    points: [
      'Requirement discovery and scoping',
      'Solution architecture and technology choices',
      'Build vs. buy guidance (including our own products)',
      'Ongoing technical advisory as you grow',
    ],
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
        <div className="container services-list">
          {SERVICES.map((s, i) => (
            <Reveal as="div" delay={i * 40} className="service-row card" key={s.title}>
              <div className="service-row__icon">
                <s.icon size={28} />
              </div>
              <div className="service-row__body">
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>
                      <CheckCircle2 size={16} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
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
