import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      })

      // If login is successful, redirect or store token
      console.log('Login successful:', res.data)
      alert(('login successfull'))
      // Optionally save token: localStorage.setItem('token', res.data.token)
      navigate('/') // redirect to some protected route
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className='flex items-center justify-center p-2'>
      <form onSubmit={handleLogin} className='grid gap-2 border p-4 rounded w-full max-w-sm'>
        <h1 className='text-2xl font-bold'>Login</h1>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <div className='grid gap-1'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className='p-1 border rounded'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='grid gap-1'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className='p-1 border rounded'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className='p-2 border bg-green-500 text-white rounded hover:bg-green-600'
        >
          Login
        </button>

        <div className='flex justify-center gap-2 text-sm mt-2'>
          <p>Don't have an account?</p>
          <Link to='/signup' className='text-blue-500 hover:underline'>Sign Up</Link>
        </div>
      </form>
    </div>
  )
}
