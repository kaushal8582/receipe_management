import React, { useContext, useEffect, useState } from "react";
import Navbar from "../component/Nav";
import { ReceipeDataContext } from "../context/ReceipeContext";
import { FaStar } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowAllReceipe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [receip, setRecipes] = useState([]);
  const { recipes, getAllReceipe } = useContext(ReceipeDataContext);
  const [filter, setFilter] = useState({
    dietary:"",
    preparation_time:"",
    difficulty:"",
  });

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    try {
      const response = await axios.post(
        "http://localhost:3000/receipe/search",
        {
          title: value.trim(),
        }
      );

      if (response.status == 200) {
        console.log(response.data.data);
        setRecipes(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async (obj) => {
    try {
      const respons = await axios.post(
        "http://localhost:3000/receipe/filter",
        obj
      );

      if (respons.status === 200) {
        setRecipes(respons.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const handleFilterChange = (l, v) => {
    setFilter({ ...filter, [l]: v });
    handleFilter(filter);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        } inline-block`}
      />
    ));
  };

  function handelCardClick(id) {
    console.log(id);
    navigate(`/receipe-details/${id}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllReceipe(); 
    };
    fetchData();
  }, []);


  useEffect(() => {
    console.log(recipes)
    setRecipes(recipes);
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="w-full mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            onChange={(e) =>
              handleFilterChange("preparation_time", e.target.value)
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 bg-white"
          >
            <option value="">Select Time</option>
            <option value="10">10 min</option>
            <option value="30">30 min</option>
            <option value="60">60 min</option>
          </select>

          <select
            onChange={(e) => handleFilterChange("difficulty", e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 bg-white"
          >
            <option value="">Select Level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            onChange={(e) => handleFilterChange("dietary", e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 bg-white"
          >
            <option value="">Select Dietary Preference</option>
            <option value="vegetarian">vegetarian</option>
            <option value="vegan">vegan</option>
            <option value="gluten-free">gluten-free</option>
            <option value="non-vegetarian">non-vegetarian</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {receip.map((recipe) => (
            <div
              onClick={() => handelCardClick(recipe.id)}
              key={recipe.id}
              className="bg-white rounded-xl cursor-pointer shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg">
                  <span className="text-sm font-semibold">
                    {recipe.cookTime} min
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {recipe.title}
                </h2>

                <div className="flex items-center mb-2">
                  <div className="mr-1">{renderStars(4)}</div>
                  <span className="text-sm text-gray-600">({56})</span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      recipe.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : recipe.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {recipe.difficulty}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowAllReceipe;
