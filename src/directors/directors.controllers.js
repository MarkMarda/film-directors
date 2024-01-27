const uuid = require("uuid");

const Directors = require("../models/directors.models");



const findAllDirectors = async() => {

  const data = await Directors.findAll();

  return data;

};

const findDirectorsById = async(id) => {

  const data = await Directors.findOne({
    where: {id}
  });

  return data;
  
};

const createDirectors = async(data) => {

  const createData = await Directors.create({
    id: uuid.v4(),
    photograph: data.photograph,
    name: data.name,
    lastName: data.lastName,
    age: data.age,
    countryId: data.countryId,
    alive: data.alive,
    birthday: data.birthday,
    films: data.films,
    firstFilm: data.firstFilm,
    lastFilm: data.lastFilm
  });

  return createData;
  
};

const updateDirectors = async(id, data) => {

  const updateData = await Directors.update(data, {
    where: {id}
  });

  return updateData;

};

const deleteDirectors = async(id) => {

  const data = await Directors.destroy({
    where: {id}
  });

  return data;

};

module.exports = {

  findAllDirectors,
  findDirectorsById,
  createDirectors,
  updateDirectors,
  deleteDirectors
  
};