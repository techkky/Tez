import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { KeyRound, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import Reveal from '../components/Reveal.jsx'
import './Login.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (authError) {
      setStatus('error')
      setError(authError.message)
      return
    }
    setStatus('sent')
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
            <KeyRound size={22} />
          </div>
          <h1>Reset your password</h1>
          <p>We'll email you a link to set a new password.</p>

          {status === 'sent' ? (
            <div className="login__success">
              <CheckCircle2 size={30} />
              <p>Check <strong>{email}</strong> for a password reset link.</p>
              <NavLink to="/login" className="btn btn-ghost btn-block">
                Back to log in
              </NavLink>
            </div>
          ) : (
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

              {status === 'error' && (
                <div className="login__error">
                  <AlertCircle size={15} /> {error}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : (
                  <>
                    Send reset link <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="login__note">
            Remembered it? <NavLink to="/login">Log in</NavLink>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
