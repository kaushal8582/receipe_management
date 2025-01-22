
import { FaStar } from 'react-icons/fa';
import Navbar from '../component/Nav';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReceipeDataContext } from '../context/ReceipeContext';

const Home = () => {
  
  const {recipes,getAllReceipe} = useContext(ReceipeDataContext);
  const navigate  =useNavigate()

  useEffect(() => {
    getAllReceipe();
  }, []);


  

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`${
          index < Math.floor(rating)
            ? 'text-yellow-400'
            : 'text-gray-300'
        } inline-block`}
      />
    ));
  };

  function handelCardClick(id){
    console.log(id)
    navigate(`receipe-details/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Delicious Recipes
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
            onClick={()=>handelCardClick(recipe.id)}
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
                  <span className="text-sm font-semibold">{recipe.cookTime} min</span>
                </div>
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {recipe.title}
                </h2>
                
                <div className="flex items-center mb-2">
                  <div className="mr-1">
                    {renderStars(4)}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({56})
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
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
    </div>
  );
};

export default Home;
