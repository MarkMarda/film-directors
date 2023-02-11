const {DataTypes} = require("sequelize");

const db = require("../utils/database");

const Countries = require("./countries.models")


const Directors = db.define("directors", {

  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "last_name"
  },
  age: {
    type: DataTypes.INTEGER
  },
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "country_id",
    references: {
      key: "id",
      model: Countries
    }
  },
  alive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false 
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false
  },
  films: {
    type: DataTypes.INTEGER
  },
  firstFilm: {
    type: DataTypes.STRING, 
    allowNull: false,
    field: "first_film"
  },
  lastFilm: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "last_film"
  }

});

module.exports = Directors;