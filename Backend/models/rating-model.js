
const {Sequelize} = require("sequelize")
const database = require("../utils/database");


const Rating = database.define("rating",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rating:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Rating;