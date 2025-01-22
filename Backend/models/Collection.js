const {Sequelize} = require("sequelize");
const database = require("../utils/database");

const Collection = database.define("collection", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Collection;
