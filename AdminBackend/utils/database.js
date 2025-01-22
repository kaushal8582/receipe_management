const Sequelize = require("sequelize");

const database = new Sequelize("recipe","root","k.b123@45",{
    host:"localhost",
    dialect:"mysql"
})


module.exports = database;