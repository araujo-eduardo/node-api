const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING(45) },
      idade: { type: DataTypes.INTEGER },
    },
    {
      timestamps: false,
    }
  );
};
