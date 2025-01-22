const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    const hashpassword = await bcrypt.hash(password, 10);
    if (!hashpassword) {
      return res
        .status(400)
        .json({ message: "something went wrong try some time" });
    }

    const user = await User.create({
      name,
      email,
      password: hashpassword,
    });

    if (!user) {
      return res
        .status(500)
        .json({ message: "something went wrong while register" });
    }

    res.status(200).json({ message: "register successfully", data: user });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
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

    if(findedUser.isBanned){
      return res.status(400).json({ message: "user is banned" });
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
      data: {name:findedUser.name,email:findedUser.email,id:findedUser.id},
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.logOut = async (req, res) => {
  try {
    const token = req.header("Authorization");
    console.log("token is : ", token)
    if (!token) {
      return res.status(400).json({ message: "invalid user" });
    }

    const findUser = await User.findOne({ where: { token: token } });

    if (!findUser) {
      return res
        .status(400)
        .json({ message: "Invalid token or allready logout" });
    }

    const updateUser = await User.update(
      { token: null },
      {
        where: {
          token:token,
        },
      }
    );

    if (!updateUser) {
      return res
        .status(400)
        .json({ message: "Invalid token or allready logout"});
    }

    res.status(200).json({ message: "logout successfully" ,data:findUser  });
  } catch (error) {
    console.log(error);
  }
};
