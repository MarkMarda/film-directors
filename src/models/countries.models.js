const {DataTypes} = require("sequelize");

const db = require("../utils/database");



const Countries = db.define("countries", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
});

module.exports = Countries;