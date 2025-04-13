import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import axios from 'axios'

export const UpdateModal = ({close}) => {

    const [data , setData] = useState({
        email : '',
        currentPassword : "",
        newPassword : ''
    })

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
    
        try {
          const response = await axios.post('http://localhost:5000/api/auth/update-password', data);
          setMessage(response.data.message || "Password updated successfully!");
          // Optionally close modal after success
          setTimeout(() => {
            close();
          }, 1500);
        } catch (error) {
          console.error("Error updating password:", error);
          setMessage(error.response?.data?.error || "Something went wrong!");
        } finally {
          setLoading(false);
        }
      };

  return (
    <section className='bg-black/70 flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 z-50'>
      <div className='bg-white w-md rounded p-4'>
        <div className='flex justify-between'>
          <h1>Update Password</h1>
          <button onClick={close} className='cursor-pointer'>
            <IoClose size={25} />
          </button>
        </div>
        <div>
          <form className='grid gap-4 mt-4' onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Email'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className='border p-1 w-72 rounded'
              required
            />
            <input
              type="text"
              placeholder='Current Password'
              value={data.currentPassword}
              onChange={(e) => setData({ ...data, currentPassword: e.target.value })}
              className='border p-1 w-72 rounded'
              required
            />
            <input
              type="text"
              placeholder='New Password'
              value={data.newPassword}
              onChange={(e) => setData({ ...data, newPassword: e.target.value })}
              className='border p-1 w-72 rounded'
              required
            />
            <button
              type="submit"
              disabled={loading}
              className='bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 disabled:opacity-50'
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            {message && <p className='text-sm text-center text-red-600'>{message}</p>}

            
          </form>
        </div>
      </div>
    </section>
  )
}