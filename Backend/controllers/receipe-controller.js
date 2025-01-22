const uploadOnCloudinary = require("../utils/cloudinary");
const Receipe = require("../models/receipe-model");
const { Op } = require("sequelize");
const User = require("../models/user-model");

module.exports.createReceipe = async (req, res) => {
  console.log("User : ", req.user.id);

  const {
    title,
    description,
    prepTime,
    cookTime,
    servings,
    difficulty,
    ingredients,
    instructions,
    nutritionInfo,
    dietaryPreference,
  } = req.body;

  if (
    !title ||
    !description ||
    !prepTime ||
    !cookTime ||
    !servings ||
    !difficulty ||
    !ingredients.length > 0 ||
    !instructions.length > 0 ||
    !nutritionInfo ||
    !dietaryPreference
  ) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    console.log(req.files);
    const img = req.files?.img[0]?.path;
    console.log("img", img);
    if (!img) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const imgUrl = await uploadOnCloudinary(img);
    if (!imgUrl) {
      return res.status(400).json({ message: "Failed to upload image" });
    }

    const receipe = await Receipe.create({
      title,
      description,
      prepTime,
      cookTime,
      servings,
      difficulty,
      ingredients,
      instructions,
      nutritionInfo,
      image: imgUrl.url,
      userId: req.user.id,
      dietaryPreference,
    });

    if (!receipe) {
      return res.status(500).json({ message: "Failed to create receipe" });
    }
    res
      .status(201)
      .json({ message: "Receipe created successfully", data: receipe });
  } catch (error) {
    console.log(error);
  }
};

module.exports.editReceipe = async (req, res) => {
  let {
    id,
    title,
    description,
    prepTime,
    cookTime,
    servings,
    difficulty,
    ingredients,
    instructions,
    nutritionInfo,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const findReceipe = await Receipe.findOne({ where: { id: id } });

  if (!findReceipe) {
    return res.status(400).json({ message: "Receipe not found" });
  }
  if (findReceipe.UserId !== req.user.id) {
    return res
      .status(400)
      .json({ message: "You are not authorized to edit this receipe" });
  }

  title = title || findReceipe.title;
  description = description || findReceipe.description;
  prepTime = prepTime || findReceipe.prepTime;
  cookTime = cookTime || findReceipe.cookTime;
  servings = servings || findReceipe.servings;
  difficulty = difficulty || findReceipe.difficulty;
  ingredients = ingredients || findReceipe.ingredients;
  instructions = instructions || findReceipe.instructions;
  nutritionInfo = nutritionInfo || findReceipe.nutritionInfo;

  try {
    const updatedReceipe = await Receipe.update(
      {
        title,
        description,
        prepTime,
        cookTime,
        servings,
        difficulty,
        ingredients,
        instructions,
        nutritionInfo,
      },
      { where: { id: id } }
    );

    if (!updatedReceipe) {
      return res.status(500).json({ message: "Failed to update receipe" });
    }
    res
      .status(200)
      .json({ message: "Receipe updated successfully", data: updatedReceipe });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteReceipe = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Please provide receipe id" });
  }

  try {
    const deleteReceipe = await Receipe.destroy({
      where: { id: id, userId: req.user.id },
    });
    if (!deleteReceipe) {
      return res.status(500).json({ message: "Failed to delete receipe" });
    }
    res
      .status(200)
      .json({ message: "Receipe deleted successfully", data: deleteReceipe });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllReceipe = async (req, res) => {
  try {
    const receipes = await Receipe.findAll({
      include: [
        {
          model: User, // User model ko include kar rahe hain
          attributes: ["name", "id"], // Sirf name field chahiye User table se
        },
      ],
    });
    if (!receipes) {
      return res.status(500).json({ message: "Failed to fetch receipes" });
    }
    res
      .status(200)
      .json({ message: "Receipes fetched successfully", data: receipes });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getParticularUserAllReceipe = async (req, res) => {
  const { id } = req.body;
  console.log("is hai : ", id);
  try {
    const receipes = await Receipe.findAll({
      where: { UserId: id },
      include: [
        {
          model: User, // User model ko include kar rahe hain
          attributes: ["name", "id"], // Sirf name field chahiye User table se
        },
      ],
    });
    if (!receipes) {
      return res.status(500).json({ message: "Failed to fetch receipes" });
    }
    res
      .status(200)
      .json({ message: "Receipes fetched successfully", data: receipes });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getReceipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const receipe = await Receipe.findOne({
      where: { id },
      include: [
        {
          model: User, // User model ko include kar rahe hain
          attributes: ["name", "id"], // Sirf name field chahiye User table se
        },
      ],
    });
    if (!receipe) {
      return res.status(400).json({ message: "Receipe not found" });
    }
    res
      .status(200)
      .json({ message: "Receipe fetched successfully", data: receipe });
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchReceipe = async (req, res) => {
  const { title } = req.body;

  try {
    const response = await Receipe.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });

    if (!response) {
      return res.status(400).json({ message: "Receipe not found" });
    }

    res
      .status(200)
      .json({ message: "Receipe fetched successfully", data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.filterReceipe = async (req, res) => {
  let { dietary, difficulty, preparation_time } = req.body;
  console.log({ dietary, difficulty, preparation_time });

  if (!dietary && !difficulty && !preparation_time) {
    return res
      .status(400)
      .json({ message: "Please provide atleast one filter" });
  }

  let query = {};

  if (dietary) query.dietaryPreference = dietary;
  if (difficulty) query.difficulty = difficulty;
  if (preparation_time) query.prepTime = preparation_time;

  try {
    const response = await Receipe.findAll({ where: query });
    if (!response) {
      return res.status(400).json({ message: "Receipe not found" });
    }
    res
      .status(200)
      .json({ message: "Receipe fetched successfully", data: response });
  } catch (error) {
    console.log(error);
  }
};
