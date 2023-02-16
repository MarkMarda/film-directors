const Countries = require("../models/countries.models");



const findAllCountries = async() => {

  const data = await Countries.findAll();

  return data;

};

const findCountriesById = async(id) => {

  const data = await Countries.findOne({
    where: {id}
  });

  return data;

};

const createCountries = async(name) => {

  const data = await Countries.create({
    name
  });

  return data;

};

const updateCountries = async(id, data) => {

  const updateData = await Countries.update(data, {
    where: {id}
  });

  return updateData;

};

const deleteCountries = async(id) => {

  const data = await Countries.destroy({
    where: {id}
  });

  return data;

};

module.exports = {

  findAllCountries,
  findCountriesById,
  createCountries,
  updateCountries,
  deleteCountries

};