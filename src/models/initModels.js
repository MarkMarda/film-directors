const Countries = require("./countries.models");
const Directors = require("./directors.models");



const initModels = () => {

  //Countries 1:M Directors
  Countries.hasMany(Directors);
  Directors.belongsTo(Countries);
  
};

module.exports = initModels;
