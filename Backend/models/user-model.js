const database = require("../utils/database");
const { Sequelize, DataTypes } = require("sequelize");

const User = database.define("User", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  token:{
    type:Sequelize.STRING,
    allowNull:true
  },
  profileImg:{
    type:Sequelize.STRING,
    allowNull:true
  },
  bio:{
    type:Sequelize.STRING,
    allowNull:true
  },
  isBanned:{
    type:Sequelize.BOOLEAN,
    defaultValue:false,
  }
});

module.exports = User;
