import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import Reveal from '../components/Reveal.jsx'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setStatus('error')
      setError(authError.message)
      return
    }
    navigate('/dashboard')
  }

  return (
    <section className="section login">
      <div className="container login__wrap">
        <NavLink to="/" className="login__brand">
          <img src="/logo-mark.png" alt="" width={30} height={30} />
          <span>Tez<span className="navbar__logo-accent">Grid</span> Associates</span>
        </NavLink>

        <Reveal className="card login__card">
          <div className="login__icon">
            <LogIn size={22} />
          </div>
          <h1>Log in to TezGrid</h1>
          <p>Access your profile, usage and billing.</p>

          <form className="login__form" onSubmit={handleSubmit}>
            <label>
              Email
              <div className="login__input">
                <Mail size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>
            </label>

            <label>
              <div className="login__field-head">
                Password
                <NavLink to="/forgot-password">Forgot password?</NavLink>
              </div>
              <div className="login__input">
                <Lock size={16} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
            </label>

            {status === 'error' && (
              <div className="login__error">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
              {status === 'sending' ? 'Logging in…' : (
                <>
                  Log in <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="login__note">
            Don't have an account? <NavLink to="/contact">Talk to us</NavLink>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
