const countriesControllers = require("./countries.controllers");



const getAllCountries = (req, res) => {

  countriesControllers.findAllCountries()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      // To solve the error running tests use "?":
      // TypeError: Cannot read properties of undefined (reading 'json')
      res.status(400)?.json({message: err.message});
    });
  
};

const getCountriesById = (req, res) => {

  const id = req.params.id;

  countriesControllers.findCountriesById(id)
    .then(data => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({message: `Id: ${id} does not exists`});
      }
    })
    .catch(err => {
      // To solve the error running tests use "?":
      // TypeError: Cannot read properties of undefined (reading 'json')
      res.status(400)?.json({message: err.message});
    });
  
};

const postCountries = (req, res) => {

  const {name} = req.body;

  if (name) {
    countriesControllers.createCountries(name)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(400)?.json({message: err.message});
      });
  } else {
    res.status(400)?.json({
      message: "Invalid data",
      fields: {name: "string"}
    });
  };

};

const patchCountries = (req, res) => {
  
  const {name} = req.body;

  const id = req.params.id;

  countriesControllers.updateCountries(id, {name})
    .then(data => {
      if(data[0]) {
        res.status(200).json({message: `Country with Id: ${id} edited succesfully`});
      } else {
        res.status(404).json({message: "Invalid Id", id});
      }
    })
    .catch(err => {
      res.status(400).json({message: err.message});
    });

};

const deleteCountries = (req, res) => {

  const id = req.params.id;

  countriesControllers.deleteCountries(id)
    .then(data => {
      if(data) {
        res.status(204).json();
      } else {
        res.status(404).json({message: "Invalid Id", id});
      }
    })
    .catch(err => {
      res.status(400)?.json({message: err.message});
    });

};

module.exports = {

  getAllCountries,
  getCountriesById,
  postCountries,
  patchCountries,
  deleteCountries
  
};