import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, LogIn, LayoutDashboard } from 'lucide-react'
import './Navbar.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setLoggedIn(!!localStorage.getItem('tezgrid_user'))
  }, [location.pathname])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo" onClick={() => setOpen(false)}>
          <img src="/logo-mark.png" alt="" className="navbar__mark" width={34} height={34} />
          <span>Tez<span className="navbar__logo-accent">Grid</span> <span className="navbar__logo-suffix">Associates</span></span>
        </NavLink>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          {loggedIn ? (
            <NavLink to="/dashboard" className="btn btn-ghost navbar__login" onClick={() => setOpen(false)}>
              <LayoutDashboard size={16} /> Dashboard
            </NavLink>
          ) : (
            <NavLink to="/login" className="btn btn-ghost navbar__login" onClick={() => setOpen(false)}>
              <LogIn size={16} /> Log in
            </NavLink>
          )}
          <NavLink to="/contact" className="btn btn-primary navbar__cta" onClick={() => setOpen(false)}>
            Get Started
          </NavLink>
        </nav>

        <button
          className="navbar__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}
