const {Sequelize} = require("sequelize");
const database = require("../utils/database");


const Follow = database.define("follow", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
});



module.exports = Follow;


