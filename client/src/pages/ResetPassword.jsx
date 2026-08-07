import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { KeyRound, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import Reveal from '../components/Reveal.jsx'
import './Login.css'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setStatus('error')
      setError('Passwords do not match.')
      return
    }
    setStatus('sending')
    setError('')
    const { error: authError } = await supabase.auth.updateUser({ password })
    if (authError) {
      setStatus('error')
      setError(authError.message)
      return
    }
    setStatus('done')
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
          <h1>Set a new password</h1>
          <p>Choose a new password for your account.</p>

          {status === 'done' ? (
            <div className="login__success">
              <CheckCircle2 size={30} />
              <p>Your password has been updated.</p>
              <button type="button" className="btn btn-primary btn-block" onClick={() => navigate('/dashboard')}>
                Go to dashboard
              </button>
            </div>
          ) : (
            <form className="login__form" onSubmit={handleSubmit}>
              <label>
                New password
                <div className="login__input">
                  <Lock size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                  />
                </div>
              </label>
              <label>
                Confirm password
                <div className="login__input">
                  <Lock size={16} />
                  <input
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Re-enter your new password"
                  />
                </div>
              </label>

              {status === 'error' && (
                <div className="login__error">
                  <AlertCircle size={15} /> {error}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Updating…' : (
                  <>
                    Update password <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
