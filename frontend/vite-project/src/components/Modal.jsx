import React, { useState,useEffect } from 'react'
import { IoClose } from "react-icons/io5";
import axios from 'axios';

export const Modal = ({ close,fetchShops , fetchShopsCount }) => {
  const [data, setData] = useState({
    name: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/shops/', data);
      console.log('✅ Store added:', response.data);
      alert('Store added successfully!');
      setData({ name: '', location: '' }); 
      if(fetchShops)
      {
        fetchShops();
      }
      if(fetchShopsCount){
        fetchShopsCount()
      }
      // Clear input fields
      close(); // Close modal after successful add
    } catch (error) {
      console.error('❌ Error adding store:', error.response?.data || error.message);
      alert('Failed to add store. Check console for details.');
    }
  };

  return (
    <section className='bg-black/70 flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 z-50'>
      <div className='bg-white w-md rounded p-4'>
        <div className='flex justify-between'>
          <h1>ADD STORE</h1>
          <button onClick={close} className='cursor-pointer'>
            <IoClose size={25} />
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit} className='grid gap-4 mt-4'>
            <input
              type="text"
              placeholder='Add name'
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className='border p-1 w-72 rounded'
              required
            />
            <input
              type="text"
              placeholder='Add location'
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              className='border p-1 w-72 rounded'
              required
            />
            <button type="submit" className='bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700'>
              Add
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}