const { Sequelize, DataTypes } = require("sequelize");
const database = require("../utils/database");

const Recipe = database.define("recipe", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prepTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cookTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servings: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  instructions: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  nutritionInfo: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  dietaryPreference :{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:"none",
  },
});

module.exports = Recipe;
