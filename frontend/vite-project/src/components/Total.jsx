import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Total = ({shopsCount,userCount,ratingCount}) => {
//   const [shopCount, setShopCount] = useState(0);
  const [loading, setLoading] = useState(true);

//   const fetchShopsCount = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/shops/shop-count');
//       console.log("API response:", response.data);
//       setShopCount(response.data.shopCount);  // Adjust based on your backend response structure
//     } catch (error) {
//       console.error("There was an error fetching the shop count!", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchShopsCount();
//   }, []);

  return (
    <div className='flex justify-evenly'>
      <div>
        <h1>Total Users</h1>
        <p>{userCount}</p>
      </div>
      <div>
        <h1>Total Shops</h1>
        <p>{shopsCount}</p>
      </div>
      <div>
        <h1>Total Rating</h1>
        <p>{ratingCount}</p>
      </div>
    </div>
  );
};

export default Total;