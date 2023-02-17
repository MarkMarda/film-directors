const directorsControllers = require("./directors.controllers");



const getAllDirectors = (req, res) => {

  directorsControllers.findAllDirectors()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json({message: err.message});
    });

};

const getDirectorsById = (req, res) => {

  const id = req.params.id;

  directorsControllers.findDirectorsById(id)
    .then(data => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({message: `Id ${id} does not exists`});
      }
    })
    .catch(err => {
      res.status(400).json({message: err.message});
    });

};

const postDirectors = (req, res) => {

  const {photograph, name, lastName, age, countryId, alive, birthday, films, firstFilm, lastFilm} = req.body;

  if(name && lastName && countryId && birthday && firstFilm && lastFilm) {
    directorsControllers.createDirectors({
      photograph,
      name,
      lastName,
      age,
      countryId,
      alive,
      birthday,
      films, 
      firstFilm,
      lastFilm
    })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400).json({message: err.message});
      });
  } else {
    res.status(400).json({
      message: "Missing data",
      fields: {
        photograph: "url",
        name: "string",
        lastName: "string",
        age: "integer",
        countryId: "integer",
        alive: "boolean",
        birthday: "YYYY-MM-DD",
        films: "integer",
        firstFilm: "string",
        lastFilm: "string"
      }
    });
  };

};

const patchDirectors = (req, res) => {

  const {photograph, name, lastName, age, countryId, alive, birthday, films, firstFilm, lastFilm} = req.body;

  const id = req.params.id;

  directorsControllers.updateDirectors(id, {
    photograph,
    name,
    lastName,
    age,
    countryId,
    alive, 
    birthday,
    films, 
    firstFilm,
    lastFilm
  })
    .then(data => {
      if (data[0]) {
        res.status(200).json({message: `Director with Id: ${id} edited succesfully`});
      } else {
        res.status(404).json({message: "Invalid Id", id});
      }
    })
    .catch(err => {
      res.status(400).json({message: err.message});
    });

};

const putDirectors = (req, res) => {

  const {photograph, name, lastName, age, countryId, alive, birthday, films, firstFilm, lastFilm} = req.body;

  const id = req.params.id; 

  if(name && lastName && countryId && birthday && firstFilm && lastFilm) {
    directorsControllers.updateDirectors(id, {
      photograph,
      name,
      lastName,
      age,
      countryId,
      alive,
      birthday,
      films,
      firstFilm,
      lastFilm
    })
      .then(data => {
        if(data[0]) {
          res.status(200).json({message: `Director with Id: ${id} edited succesfully`});
        } else {
          res.status(404).json({message: "Invalid Id", id});
        }
      })
      .catch(err => {
        res.status(400).json({message: err.message});
      });
  } else {
    res.status(400).json({message: "Missing data", fields: {
      name: "string",
      lastName: "string",
      countryId: "integer",
      birthday: "YYYY-MM-DD",
      firstFilm: "string",
      lastFilm: "string"
    }});
  };

};

const deleteDirectors = (req, res) => {

  const id = req.params.id;

  directorsControllers.deleteDirectors(id)
    .then(data => {
      if(data) {
        res.status(204).json();
      } else {
        res.status(404).json({message: "Invalid Id", id});
      }
    })
    .catch(err => {
      res.status(400).json({message: err.message});
    });

}; 

module.exports = {

  getAllDirectors,
  getDirectorsById,
  postDirectors,
  patchDirectors,
  putDirectors,
  deleteDirectors

};