const User = require("../../Backend/models/user-model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

module.exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  if (email.trim() !== process.env.ADMIN_EMAIL) {
    return res.status(400).json({ message: "you are not admin" });
  }

  try {
    const findedUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!findedUser) {
      return res.status(400).json({ message: "User not rejister" });
    }
    const comparePassword = bcrypt.compare(password, findedUser.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "invalid user password" });
    }
    const token = JWT.sign(
      { id: findedUser.id, email: findedUser.email },
      process.env.JWT_SECREAT_KEY
    );

    if (!token) {
      return res
        .status(400)
        .json({ message: "something went wrong try after some time" });
    }
    const updatedUser = await User.update(
      { token: token },
      { where: { id: findedUser.id } }
    );

    res.status(200).json({
      message: "login successfully ",
      data: {
        name: findedUser.name,
        email: findedUser.email,
        id: findedUser.id,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllUserInfo = async (req, res) => {
  try {
    const allUser = await User.findAll();
    if (!allUser) {
      return res.status(400).json({ message: "something went wrong" });
    }

    res.status(200).json({
      message: "all user info",
      data: allUser,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.banUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  try {
    const findUser = await User.findOne({ where: { id: id } });
    if (!findUser) {
      return res.status(400).json({ message: "user not found" });
    }

    if (findUser.email === process.env.ADMIN_EMAIL) {
      return res.status(400).json({ message: "you can't ban admin" });
    }

    const response = await User.update(
      { isBanned: true },
      { where: { id: id } }
    );
    if (!response) {
      return res.status(400).json({ message: "something went wrong" });
    }
    res.status(200).json({ message: "user banned successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.unBanUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }
  try {
    const response = await User.update(
      { isBanned: false },
      { where: { id: id } }
    );
    if (!response) {
      return res.status(400).json({ message: "something went wrong" });
    }
    res.status(200).json({ message: "user unbanned successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }
  try {
    const response = await User.destroy({ where: { id: id } });
    if (!response) {
      return res.status(400).json({ message: "something went wrong" });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
