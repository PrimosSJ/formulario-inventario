import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setMessage('User registered successfully!')
        setMessageType('success')
        setFormData({ email: '', password: '' })
      } else {
        setMessage(data.message || 'Registration failed')
        setMessageType('error')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setMessage('Network error. Please try again.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-form">
      <h2>Register New User</h2>
      
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter your password (min 6 characters)"
            minLength={6}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="submit-btn"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default RegisterForm