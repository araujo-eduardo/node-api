const { Sequelize } = require("sequelize");

const database = "api";
const username = "root";
const password = "";

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mariadb",
});

const models = [require("../models/Users")].map((m) => m(sequelize));

sequelize.sync().then("Banco de dados sincronizado!");

module.exports = sequelize;
