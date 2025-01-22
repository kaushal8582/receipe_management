import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaClock, FaUsers, FaPrint, FaShare, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import LikeCard from "../component/LikeCard";
import { ReceipeDataContext } from "../context/ReceipeContext";
import RatingForm from "../component/RatingForm";

const RecipeDetails = () => {
  const [recipe, setRecipe] = React.useState({});
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const { getAllFavoriteCollection, favoriteCollection, getAllRatingInfo } =
    useContext(ReceipeDataContext);

  const { id } = useParams();
  console.log(id);

  async function getReceipeDetails(id) {
    try {
      const response = await axios.get(
        `http://localhost:3000/receipe/get/${id}`
      );
      if (response.status === 200) {
        console.log(response.data.data);

        const data = response.data.data;

        // Attempt to parse `nutritionInfo` safely
        let nutritionInfo = {};
        try {
          nutritionInfo = JSON.parse(data.nutritionInfo);
        } catch (error) {
          console.error("Invalid nutritionInfo format:", data.nutritionInfo);
          nutritionInfo = {
            calories: null,
            protein: null,
            carbs: null,
            fat: null,
          };
        }

        // Set the recipe data
        setRecipe({
          userName: data.User.name,
          userId: data.User.id,
          id: id,
          title: data.title,
          image: data.image,
          description: data.description,
          prepTime: data.prepTime,
          cookTime: data.cookTime,
          totalTime:
            parseInt(data.prepTime || 0) + parseInt(data.cookTime || 0),
          servings: data.servings,
          difficulty: data.difficulty,
          ingredients: Array.isArray(data.ingredients)
            ? data.ingredients
            : typeof data.ingredients === "string"
            ? data.ingredients.split(",")
            : [],
          instructions: Array.isArray(data.instructions)
            ? data.instructions
            : typeof data.instructions === "string"
            ? data.instructions.split(",")
            : [],
          nutritionInfo: {
            calories: nutritionInfo.calories || "N/A",
            protein: nutritionInfo.protein || "N/A",
            carbs: nutritionInfo.carbs || "N/A",
            fat: nutritionInfo.fat || "N/A",
          },
        });

        console.log(recipe);
      }
    } catch (error) {
      console.log("Error fetching recipe details:", error);
    }
  }

  async function handleLikeClick(id) {
    getAllFavoriteCollection();
    setIsCardOpen(!isCardOpen);
  }

  function handelProfileClick(id) {
    console.log(id);
  }

  const handleClick = () => {
    console.log(isFollowing);
    if (isFollowing) {
      unFollow();
    } else {
      Follow();
    }
    setIsFollowing(!isFollowing);
  };

  async function Follow() {
    const token = localStorage.getItem("token");
    let followerId = recipe.userId;

    try {
      const response = await axios.post(
        "http://localhost:3000/follow/follow",
        {
          followerId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        console.log("Followed successfully");
        alert("Followed successfully");
      } else {
        console.log("Failed to follow");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function unFollow() {
    const token = localStorage.getItem("token");
    let followerId = recipe.userId;

    try {
      const response = await axios.post(
        "http://localhost:3000/follow/unfollow",
        {
          followerId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Unfollowed successfully");
        alert("Unfollowed successfully");
      } else {
        console.log("Failed to unfollow");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function checkFollowStatus() {
    const token = localStorage.getItem("token");
    let followerId = recipe.userId;

    try {
      const response = await axios.post(
        "http://localhost:3000/follow/check-follow",
        {
          followerId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data.message);
      console.log(response.data.success);

      setIsFollowing(response.data.success);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      console.log(error.response.data.success);
      setIsFollowing(error.response.data.success);
    }
  }

  useEffect(() => {
    async function run() {
      if (id) {
        await getReceipeDetails(id); // Fetch recipe details
        await getAllRatingInfo(id); // Fetch ratings

        // Ensure recipe details are fetched before checking follow status
        if (recipe.userId) {
          checkFollowStatus(recipe.userId); // Now pass the userId to check follow status
        }
      }
    }
    run();
  }, [id, recipe.userId]); // Adding recipe.userId as a dependency to re-run when it's updated

  // Dependency array includes 'id' to re-run the effect when 'id' changes

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg relative overflow-hidden mb-8">
          {isCardOpen && (
            <LikeCard
              name={favoriteCollection}
              id={recipe.id}
              setIsCardOpen={setIsCardOpen}
            />
          )}
          <div className="relative h-96">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                <FaShare className="text-gray-700" />
              </button>
              <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                <FaPrint className="text-gray-700" />
              </button>
              <button
                onClick={() => handleLikeClick(recipe.id)}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <FaHeart className="text-red-500" />
              </button>
            </div>
          </div>

          <div className="p-8">
            <h1
              onClick={() => handelProfileClick(recipe.userId)}
              className="text-2xl font-bold text-gray-400 cursor-pointer mb-4"
            >
              @{recipe.userName}
            </h1>
            <button
              onClick={handleClick}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                isFollowing
                  ? "bg-gray-200 text-gray-800 hover:bg-red-100 hover:text-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isFollowing ? (
                <span className="flex items-center gap-1">
                  <span className="normal">Following</span>
                  <span className="hidden group-hover:inline">Unfollow</span>
                </span>
              ) : (
                "Follow"
              )}
            </button>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>
            <p className="text-gray-600 mb-6">{recipe.description}</p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <FaClock className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Total Time</p>
                  <p className="font-semibold">{recipe.totalTime}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Servings</p>
                  <p className="font-semibold">{recipe.servings} people</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 w-4 h-4 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-sm text-gray-500">Difficulty</p>
                  <p className="font-semibold">{recipe.difficulty}</p>
                </div>
              </div>
            </div>

            {/* Time Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500">Prep Time</p>
                <p className="font-semibold">{recipe.prepTime}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500">Cook Time</p>
                <p className="font-semibold">{recipe.cookTime}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500">Total Time</p>
                <p className="font-semibold">{recipe.totalTime}</p>
              </div>
            </div>

            {/* Ingredients and Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients &&
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {ingredient}
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions &&
                    recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="font-bold mr-2">{index + 1}.</span>
                        {instruction}
                      </li>
                    ))}
                </ol>
              </div>
            </div>

            {/* Nutrition Information */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Nutrition Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recipe.nutritionInfo &&
                  Object.entries(recipe.nutritionInfo).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-500 capitalize">{key}</p>
                      <p className="font-semibold">{value}g</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <RatingForm receipeid={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;
