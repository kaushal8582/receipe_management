import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileComponent from "../component/ProfileComponent";
import FilterButtons from "../component/FilterButtons";
import { useContext } from "react";
import { ReceipeDataContext } from "../context/ReceipeContext";

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Homemade Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      description: "Classic Italian pizza with fresh toppings",
      createdAt: "2023-10-15",
    },
    {
      id: 2,
      title: "Chicken Curry",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      description: "Spicy Indian curry with tender chicken",
      createdAt: "2023-10-10",
    },
  ]);

  async function getAllReceipeParticularPerson() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/receipe/getall/recipes",
        {
          id: JSON.parse(localStorage.getItem("user")).id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data);
        setRecipes(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // const {getAllFavoriteCollection} = useContext(ReceipeDataContext)
  const { getAllFavoriteCollection, favoriteCollection, favoriteItems } =
    useContext(ReceipeDataContext);

  // getAllFavoriteCollection()

  useEffect(() => {
    if (activeSection != "profile") {
      getAllFavoriteCollection();
    }
  }, [activeSection]);

  useEffect(() => {
    getAllReceipeParticularPerson();
  }, []);

  const handleCreateRecipe = () => {
    // Handle recipe creation logic here
    navigate("/create-recipe");
  };

  const handleEditRecipe = (id) => {
    // Handle recipe edit logic here
    navigate(`/edit-recipe/${id}`);
  };

  const handleDeleteRecipe = async (id) => {
    // Handle recipe deletion logic here
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.post(
        `http://localhost:3000/receipe/delete/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        alert("Recipe deleted successfully");
        getAllReceipeParticularPerson();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Section */}

        <ProfileComponent />

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveSection("profile")}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              activeSection === "profile"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveSection("favorites")}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              activeSection === "favorites"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Favorites
          </button>
        </div>

        {activeSection == "profile" ? (
          <div>
            {/* Create Recipe Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Recipes</h2>
              <button
                onClick={handleCreateRecipe}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaPlus /> Create Recipe
              </button>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{recipe.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Created: {recipe.createdAt.slice(0, 10)}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditRecipe(recipe.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteRecipe(recipe.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <FilterButtons name={favoriteCollection} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteItems.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{recipe.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Created: {recipe.createdAt.slice(0, 10)}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditRecipe(recipe.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteRecipe(recipe.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
