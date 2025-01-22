const Follow = require("../models/Follow");
const User = require("../models/user-model");

module.exports.followUser = async (req, res) => {
  const { followerId } = req.body;

  try {
    if (followerId === req.user.id) {
      return res.status(400).json({
        message: "You cannot follow yourself.",
      });
    }

    const existingFollow = await Follow.findOne({
      where: {
        followerId,
        followingId: req.user.id,
      },
    });

    if (existingFollow) {
      return res.status(400).json({
        message: "You are already following this user.",
      });
    }

    // Create a follow relationship
    const follow = await Follow.create({
      followerId,
      followingId:req.user.id,
    });

    res.status(201).json({
      message: "Followed successfully.",
      follow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

module.exports.unfollowUser = async (req, res) => {
  const { followerId } = req.body;

  try {
    const follow = await Follow.findOne({
      where: {
        followerId,
        followingId: req.user.id,
      },
    });

    if (!follow) {
      return res.status(400).json({
        message: "You are not following this user.",
      });
    }

    // Remove the follow relationship
    await Follow.destroy({
      where: {
        followerId,
        followingId: req.user.id,
      },
    });

    res.status(200).json({
      message: "Unfollowed successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

module.exports.getMyAllFollower = async (req, res) => {
  const { followerId } = req.body;
  console.log("follower id is : ",followerId);
  try {
    const followers = await Follow.findAll({
      where: {
        followerId: followerId,
      },
      include: [
        {
          model: User, // User model ko include kar rahe hain
          as: "follower",
          attributes: ["name", "id"], // Sirf name field chahiye User table se
        },
      ],
    });
    res.status(200).json({
      data: followers,
      message: "find all follower",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

module.exports.getAllFollowing = async (req, res) => {
  const { followingId } = req.body;
  try {
    const following = await Follow.findAll({
      where: {
        followingId: followingId,
      },
      include: [
        {
          model: User, // User model ko include kar rahe hain
          as: "following",
          attributes: ["name", "id"], // Sirf name field chahiye User table se
        },
      ],
    });
    res.status(200).json({
      data: following,
      message: "find all following",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

module.exports.checkFollow = async (req, res) => {
  const { followerId } = req.body;
  try {
    const follow = await Follow.findOne({
      where: {
        followerId,
        followingId: req.user.id,
      },
    });

    if (!follow) {
      return res.status(400).json({
        message: "You are not following this user.",
        success: false,
      });
    }
    res.status(200).json({
      message: "you are following",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
};
