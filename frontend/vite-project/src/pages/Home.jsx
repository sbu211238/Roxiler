import React, { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import SearchBar from '../components/SearchBar'
import StoreList from '../components/StoreList'
import axios from 'axios'
import Total from '../components/Total'
import { Modal } from '../components/Modal'

export const Home = () => {

  const [addStore,setAddStore] = useState(false)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [shopCount, setShopCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);


  const fetchShopsCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shops/shop-count');
      console.log("API response:", response.data);
      setShopCount(response.data.shopCount);  // Adjust based on your backend response structure
    } catch (error) {
      console.error("There was an error fetching the shop count!", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/get-user');
      console.log("API response:", response.data);
      setUserCount(response.data.shopCount);  // Adjust based on your backend response structure
    } catch (error) {
      console.error("There was an error fetching the shop count!", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatingCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ratings/get-rating');
      console.log("API response:", response.data);
      setRatingCount(response.data.shopCount);  // Adjust based on your backend response structure
    } catch (error) {
      console.error("There was an error fetching the shop count!", error);
    } finally {
      setLoading(false);
    }
  }

  const fetchShops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shops/');
      console.log("API response:", response.data);
      setData(response.data.shops);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = async ({ name, location }) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/shops/search', {
        params: {
          name,
          location,
        },
      });
      setData(response.data.results); // because your API returns { results: [...] }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops()
    fetchShopsCount()
    fetchUserCount()
    fetchRatingCount()
  }, [])

  return (
    <>

      <div>
        <NavBar />
        <SearchBar onSearch={handleSearch}/>
        <Total shopsCount={shopCount} userCount={userCount} ratingCount={ratingCount} />
        <button className='bg-blue-500 px-2 p-1 rounded ml-4 mt-4 cursor-pointer' onClick={() => setAddStore(true)}>ADD STORE</button>
        <StoreList data={data} loading={loading} />
      </div>
      {
        addStore && (
          <Modal close={() => setAddStore(false)} fetchShops={fetchShops} fetchShopsCount={fetchShopsCount} />
        )
      }
    </>


  )
}

export default Home