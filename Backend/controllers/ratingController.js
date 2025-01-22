const Rating = require("../models/rating-model");
const User = require("../models/user-model");

module.exports.addRating = async (req, res) => {
  const { ratingValue, desc, receipeid } = req.body;

  if (!ratingValue || !desc  || !receipeid) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const response = await Rating.create({
      rating: ratingValue,
      description: desc,
      userId: req.user.id,
      receipeId: receipeid,
    });

    if (!response) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    return res
      .status(200)
      .json({ message: "Rating added successfully", data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllRatings = async (req, res) => {
  const { receipeid } = req.body;

  if (!receipeid) {
    return res.status(400).json({ message: "Please provide receipe id" });
  }
  try {
    const response = await Rating.findAll({
      where: {
        receipeId: receipeid, // Match karo recipeid
      },
      include: [
        {
          model: User, // User model ko include kar rahe hain
          attributes: ["name"], // Sirf name field chahiye User table se
        },
      ],
      attributes: ["id", "receipeId", "description", "rating"], // Sirf ye fields Rating table se chahiye
    });

    if(!response){
      return res.status(400).json({message: "No ratings found"})
    }
    return res.status(200).json({message: "Ratings fetched successfully", data: response})

  } catch (error) {
    console.log(error);
  }
};
