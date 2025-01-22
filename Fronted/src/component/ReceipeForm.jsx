import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaPlus, FaTrash } from "react-icons/fa";
import { Form, useNavigate, useParams } from "react-router-dom";

const CreateEditRecipe = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log("edit page ", id);
      getReceipeDetails(id);
    }
  }, []);

  const navigate = useNavigate();
  const [img, setImg] = useState(null);

  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    image: null,
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "Medium",
    dietary: "vegan",
    ingredients: [""],
    instructions: [""],
    nutritionInfo: {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
  });

  async function getReceipeDetails(id) {
    try {
      const response = await axios.get(
        `http://localhost:3000/receipe/get/${id}`
      );
      if (response.status === 200) {
        console.log(response.data.data);
        // setRecipe(response.data.data);
        let data = response.data.data;
        let nuturitionInfo = JSON.parse(data.nutritionInfo);
        setRecipe({
          title: data.title,
          description: data.description,
          image: data.image,
          prepTime: data.prepTime,
          dietary: data.dietaryPreference || "vegan",
          cookTime: data.cookTime,
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
            calories: nuturitionInfo.calories,
            protein: nuturitionInfo.protein,
            carbs: nuturitionInfo.carbs,
            fat: nuturitionInfo.fat,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipe({
        ...recipe,
        image: URL.createObjectURL(file),
      });
      console.log(file);
      setImg(file);
    }
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ""],
    });
  };

  const addInstruction = () => {
    setRecipe({
      ...recipe,
      instructions: [...recipe.instructions, ""],
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({
      ...recipe,
      ingredients: newIngredients,
    });
  };

  const removeInstruction = (index) => {
    const newInstructions = recipe.instructions.filter((_, i) => i !== index);
    setRecipe({
      ...recipe,
      instructions: newInstructions,
    });
  };

  const validateRecipe = () => {
    const errors = [];

    // Basic fields validation
    if (!recipe.title.trim()) errors.push("Title is required");
    if (!recipe.description.trim()) errors.push("Description is required");
    if (!recipe.image) errors.push("Image is required");
    if (!recipe.prepTime.trim()) errors.push("Prep time is required");
    if (!recipe.cookTime.trim()) errors.push("Cook time is required");
    if (!recipe.servings) errors.push("Servings is required");

    // Ingredients validation
    if (
      recipe.ingredients.length === 0 ||
      recipe.ingredients.some((ing) => !ing.trim())
    ) {
      errors.push("All ingredients fields must be filled");
    }

    // Instructions validation
    if (
      recipe.instructions.length === 0 ||
      recipe.instructions.some((inst) => !inst.trim())
    ) {
      errors.push("All instruction steps must be filled");
    }

    // Nutrition info validation
    const nutritionFields = Object.entries(recipe.nutritionInfo);
    for (const [key, value] of nutritionFields) {
      if (!value.trim())
        errors.push(`${key} is required in nutrition information`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    const { isValid, errors } = validateRecipe();

    if (!isValid) {
      alert(errors.join("\n"));
      return;
    }

    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("img", img);
    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("prepTime", recipe.prepTime);
    formData.append("cookTime", recipe.cookTime);
    formData.append("servings", recipe.servings);
    formData.append("difficulty", recipe.difficulty);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("nutritionInfo", JSON.stringify(recipe.nutritionInfo));
    formData.append("dietaryPreference", recipe.dietary);


    let updatedRecipe = {
      id: id,
      title: recipe.title,
      description: recipe.description,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      nutritionInfo: JSON.stringify(recipe.nutritionInfo),
    };

    let url = id
      ? `http://localhost:3000/receipe/update`
      : "http://localhost:3000/receipe/create";

    try {
      const response = await axios.post(url, id ? updatedRecipe : formData, {
        headers: {
          Authorization: token,
        },
      });

      if (id) {
        if (response.status === 200) {
          alert("Recipe updated successfully");
          navigate("/profile");
        }
      } else {
        if (response.status === 201) {
          alert("Recipe created successfully");
          navigate("/profile");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            {!id ? "Create New Recipe" : "Update recipe"}
          </h1>

          {/* Image Upload */}
          <div className="mb-8">
            <div className="relative">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt="Recipe preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400" />
                    <p className="text-gray-500">Upload Recipe Image</p>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Recipe Title
              </label>
              <input
                type="text"
                value={recipe.title}
                onChange={(e) =>
                  setRecipe({ ...recipe, title: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter recipe title"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                value={recipe.description}
                onChange={(e) =>
                  setRecipe({ ...recipe, description: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe your recipe"
              />
            </div>
          </div>

          {/* Time and Servings */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Prep Time
              </label>
              <input
                type="text"
                value={recipe.prepTime}
                onChange={(e) =>
                  setRecipe({ ...recipe, prepTime: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 20 mins"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Cook Time
              </label>
              <input
                type="text"
                value={recipe.cookTime}
                onChange={(e) =>
                  setRecipe({ ...recipe, cookTime: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 30 mins"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Servings
              </label>
              <input
                type="number"
                value={recipe.servings}
                onChange={(e) =>
                  setRecipe({ ...recipe, servings: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 4"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Difficulty
              </label>
              <select
                value={recipe.difficulty}
                onChange={(e) =>
                  setRecipe({ ...recipe, difficulty: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
              Dietary Preference
              </label>
              <select
                value={recipe.dietary}
                onChange={(e) =>
                  setRecipe({ ...recipe, dietary: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>vegetarian</option>
                <option>vegan</option>
                <option>gluten-free</option>
                <option>non-vegetarian</option>
              </select>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-gray-700 font-medium">Ingredients</label>
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <FaPlus /> Add Ingredient
              </button>
            </div>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => {
                    const newIngredients = [...recipe.ingredients];
                    newIngredients[index] = e.target.value;
                    setRecipe({ ...recipe, ingredients: newIngredients });
                  }}
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ingredient"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-gray-700 font-medium">Instructions</label>
              <button
                type="button"
                onClick={addInstruction}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <FaPlus /> Add Step
              </button>
            </div>
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <span className="p-3 bg-gray-100 rounded-lg">{index + 1}</span>
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) => {
                    const newInstructions = [...recipe.instructions];
                    newInstructions[index] = e.target.value;
                    setRecipe({ ...recipe, instructions: newInstructions });
                  }}
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter instruction"
                />
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Nutrition Info */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-4">
              Nutrition Information
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(recipe.nutritionInfo).map((key) => (
                <div key={key}>
                  <label className="block text-gray-600 text-sm mb-1 capitalize">
                    {key}
                  </label>
                  <input
                    type="text"
                    value={recipe.nutritionInfo[key]}
                    onChange={(e) =>
                      setRecipe({
                        ...recipe,
                        nutritionInfo: {
                          ...recipe.nutritionInfo,
                          [key]: e.target.value,
                        },
                      })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${key}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {!id ? "Save Recipe" : "Update Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditRecipe;
