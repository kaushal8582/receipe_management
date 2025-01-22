import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileComponent = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Passionate food lover and home chef",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Handle image upload logic here
  };

  const handleBioUpdate = () => {
    // Handle bio update logic here
  };

  const handleLogout = async () => {
    // Clear user data from localStorage

    try {
      const response = await axios.post("http://localhost:3000/user/logout",{
        
      },{
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        console.log("Logout successful");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log(error);
    }

    // Redirect to login page
    
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
            <FaCamera className="text-white" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <div className="relative">
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              rows="3"
            />
            <div className="flex items-center justify-start gap-6 ">
              <button
                onClick={handleBioUpdate}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Bio
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
