import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Form = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        address
      })

      console.log('Registration successful:', res.data)
      alert('Register Successfully')
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className='flex items-center justify-center p-2'>
      <form onSubmit={handleRegister} className='grid gap-2 border p-4 rounded w-full max-w-sm'>
        <h1 className='text-2xl font-bold'>Register Form</h1>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <div className='grid gap-1'>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className='p-1 border rounded'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className='grid gap-1'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
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
            className='p-1 border rounded'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className='grid gap-1'>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className='p-1 border rounded'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className='p-2 bg-green-500 text-white rounded hover:bg-green-600'>
          Register
        </button>

        <div className='flex justify-center gap-2 text-sm mt-2'>
          <p>Have an account?</p>
          <Link to='/login' className='text-blue-500 hover:underline'>Login</Link>
        </div>
      </form>
    </div>
  )
}
