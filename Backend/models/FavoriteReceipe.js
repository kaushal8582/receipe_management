const {Sequelize} = require("sequelize");
const database = require("../utils/database");


const FavoriteReceipe = database.define("favoriteReceipe", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   
})

module.exports = FavoriteReceipe;