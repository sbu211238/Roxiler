import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UpdateModal } from './UpdateModal'

export const NavBar = () => {

  const [openUpdateForm , setOpenUpdateForm] = useState(false)

  return (
    <>
    
    <div className='bg-gray-900 w-full h-20 flex justify-between items-center p-5 text-white'>
        <h1 className='text-2xl font-bold'>Admin DashBoard</h1>
        <div className="flex gap-4">
            <button className='w-36 bg-red-500 rounded py-1 px-2 cursor-pointer' onClick={() => setOpenUpdateForm(true)}>Update Password</button>
            <Link to="/login" className='w-18 bg-red-500 rounded py-1 px-2 cursor-pointer'>Logout</Link>
        </div>
    </div>

{
  openUpdateForm && (
      <UpdateModal close={() => setOpenUpdateForm(false)}/>
  )
}
    
    </>


  )
}

export default NavBar