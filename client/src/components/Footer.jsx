import { NavLink } from 'react-router-dom'
import { Mail, MapPin, Globe, Users, Code2 } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <NavLink to="/" className="navbar__logo">
            <img src="/logo-mark.png" alt="" className="navbar__mark" width={34} height={34} />
            <span>Tez<span className="navbar__logo-accent">Grid</span> <span className="navbar__logo-suffix">Associates</span></span>
          </NavLink>
          <p>
            IT Services & Solutions — custom software development, our own subscription products,
            and consulting that solves real business problems through software.
          </p>
          <div className="footer__social">
            <a href="#" aria-label="Website"><Globe size={17} /></a>
            <a href="#" aria-label="Community"><Users size={17} /></a>
            <a href="#" aria-label="Developers"><Code2 size={17} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <div className="footer__col">
          <h4>What we do</h4>
          <NavLink to="/services">Custom Software Development</NavLink>
          <NavLink to="/services">IT Consulting</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
        </div>

        <div className="footer__col">
          <h4>Get in touch</h4>
          <a href="mailto:tezgrid@gmail.com"><Mail size={15} /> tezgrid@gmail.com</a>
          <span className="footer__addr"><MapPin size={15} /> India</span>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} TezGrid Associates. All rights reserved.</span>
        <span>Software, products and consulting — built around your business.</span>
      </div>
    </footer>
  )
}
