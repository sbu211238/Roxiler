import React, { useEffect, useState } from 'react';

export const StoreList = ({data,loading }) => {
  const [rating, setRating] = useState('');

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = () => {
    alert(`Rating submitted: ${rating}`);
    // Optional: send to backend via axios.post or .put
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-8 bg-white p-4 shadow-md rounded-md w-full max-w-8xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Users Who Rated Your Store</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="text-left px-4 py-2 border-r border-gray-300">User Name</th>
            <th className="text-left px-4 py-2 border-r border-gray-300">Address</th>
            <th className="text-left px-4 py-2 border-r border-gray-300">Rating</th>
            <th className="text-left px-4 py-2 border-r border-gray-300">Overall Rating</th>
            <th className="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-4 py-2 border-r border-gray-300">{item.name || "Shubham Kumar"}</td>
                <td className="px-4 py-2 border-r border-gray-300">{item.location || "Patna, Bihar"}</td>
                <td className="px-4 py-2 border-r border-gray-300">{item.id || "5"}</td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <select
                    value={rating}
                    onChange={handleRatingChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="">Rate</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;