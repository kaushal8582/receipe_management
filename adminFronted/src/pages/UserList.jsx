import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const handleBanClick = async (userId) => {
    if (!userId) {
      alert("User Id is not provided");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/ban-user/${userId}`
      );

      if (response.status === 200) {
        console.log(response.data.message);
        alert(response.data.message);
        getAllUserInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnBanClick = async(userId) => {
    if (!userId) {
        alert("User Id is not provided");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:4000/admin/unban-user/${userId}`
        );
  
        if (response.status === 200) {
          console.log(response.data.message);
          alert(response.data.message);
          getAllUserInfo();
        }
      } catch (error) {
        console.log(error);
      }
  };

  async function getAllUserInfo() {
    try {
      const response = await axios.get(
        "http://localhost:4000/admin/get-all-user"
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUserInfo();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h3>
              <p className="text-gray-600">{user.email}</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                ${
                  user.isBanned
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {user.isBanned ? "Banned" : "Active"}
              </span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleBanClick(user.id)}
                disabled={user.isBanned}
                className={`px-4 py-2 rounded-md font-medium transition-colors
                  ${
                    user.isBanned
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
              >
                Ban
              </button>
              <button
                onClick={() => handleUnBanClick(user.id)}
                disabled={!user.isBanned}
                className={`px-4 py-2 rounded-md font-medium transition-colors
                  ${
                    !user.isBanned
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
              >
                Unban
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
