const cloudinary = require("cloudinary").v2

const directorsControllers = require("./directors.controllers");
const config = require("../config");

cloudinary.config({cloudinary: config.cloudinary});




const getAllDirectors = (req, res) => {

  directorsControllers.findAllDirectors({})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json({message: err.message});
    });

};

const getDirectorsById = (req, res) => {

  const { id } = req.params;

  directorsControllers.findDirectorsById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({message: `Id ${id} does not exists`});
      }
    })
    .catch(err => {
      res.status(400).json({message: err.message});
    });

};

const postDirectors = async (req, res) => {

  const {
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
  } = req.body;

  const validPhoto = "/^https?:\/\/[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,6}(?::\d+)?\/[a-zA-Z0-9-_.?#\[\]@!$&'()*+,;=~_|%.]+$/";

  if (
    !name 
    || !lastName 
    || !countryId 
    || !birthday 
    || !firstFilm 
    || !lastFilm
  ) {
    return res.status(400).json({
      message: "Invalid data",
      requiredFields: {
        name: "string",
        lastName: "string",
        countryId: "integer",
        birthday: "YYYY-MM-DD",
        firstFilm: "string",
        lastFilm: "string"
      },
      optionalFields: {
        photograph: "File",
        age: "integer",
        alive: "boolean",
        films: "integer"
      }
    });
  };

  //Validate is a URL
  if (photograph !== photograph?.includes(validPhoto)) {
    return res.status(400).json({message: "Photograph must be a file"});
  }

  //Case: user wants post with a photograph file
  //Use ? to resolve TypeError: Cannot read properties of null (reading 'photograph')
  if (req.files || req.files?.photograph) {
    const photoFile = req.files.photograph;
    
    const fileTypes = ["image/jpg", "image/jpeg", "image/png"];
    const fileExtensions = ["jpg", "jpeg", "png"];
    const fileSize = 800000

    if (!fileTypes.includes(photoFile?.mimetype)) {
      return res.status(400).json({message: "File types: jpg, jpeg or png"});
    };

    if (!fileExtensions.includes(photoFile.name.split(".")[1])) {
      return res.status(400).json({message: "File extensions: jpg, jpeg or png"});
    };
    
    if (photoFile.size > fileSize) {
      return res.status(400).json({message: "File size: 80000"});
    };

    const uploadedPhoto = await cloudinary.uploader.upload(
      photoFile.tempFilePath,
      {
        folder: "Film-Directors/directors",
        use_filename: true,
        unique_filename: false
      }
    );

    let photoUrl = uploadedPhoto.secure_url;

    return directorsControllers.createDirectors({
      photograph: photoUrl,
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
  };

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

};

const patchDirectors = async (req, res) => {

  const {
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
  } = req.body;

  const { id } = req.params;

  const validPhoto = "/^https?:\/\/[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,6}(?::\d+)?\/[a-zA-Z0-9-_.?#\[\]@!$&'()*+,;=~_|%.]+$/";

  //Validate is a URL
  if (photograph !== photograph?.includes(validPhoto)) {
    return res.status(400).json({message: "Photograph must be a file"});
  }

  //Case: user wants update with a photograph file
  //Use ? to resolve TypeError: Cannot read properties of null (reading 'photograph')
  if (req.files || req.files?.photograph) {
    const photoFile = req.files.photograph;
    
    const fileTypes = ["image/jpg", "image/jpeg", "image/png"];
    const fileExtensions = ["jpg", "jpeg", "png"];
    const fileSize = 800000

    if (!fileTypes.includes(photoFile.mimetype)) {
      return res.status(400).json({message: "File types: jpg, jpeg or png"});
    };

    if (!fileExtensions.includes(photoFile.name.split(".")[1])) {
      return res.status(400).json({message: "File extensions: jpg, jpeg or png"});
    };
    
    if (photoFile.size > fileSize) {
      return res.status(400).json({message: "File size: 80000"});
    };

    const uploadedPhoto = await cloudinary.uploader.upload(
      photoFile.tempFilePath,
      {
        folder: "Film-Directors/directors",
        use_filename: true,
        unique_filename: false
      }
    );

    let photoUrl = uploadedPhoto.secure_url;

    return directorsControllers.updateDirectors(id, {
      photograph: photoUrl,
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

const putDirectors = async (req, res) => {

  const {
    photograph,
    name,
    lastName,
    age,
    countryId,
    alive,
    birthday,
    films,
    firstFilm,
    lastFilm,
  } = req.body;

  const { id } = req.params;

  if ( 
    !name ||
    !lastName ||
    !countryId ||
    !birthday ||
    !films ||
    !firstFilm ||
    !lastFilm
  ) {
    return res.status(400).json({
      message: "Missing data",
      fields: {
        name: "string",
        lastName: "string",
        countryId: "integer",
        birthday: "YYYY-MM-DD",
        films: "integer",
        firstFilm: "string",
        lastFilm: "string",
      },
    });
  }

  if (req.files || req.files?.photograph) {
    return res.status(400).json({message: "Photograph can not be edited here"});
  }

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
    lastFilm,
  })
    .then((data) => {
      if (data[0]) {
        res.status(200).json({ message: `Director with Id: ${id} edited succesfully` });
      } else {
        res.status(404).json({ message: "Invalid Id", id });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
  
};

const deleteDirectors = (req, res) => {

  const { id } = req.params;

  directorsControllers.deleteDirectors(id)
    .then(data => {
      if (data) {
        res.status(204).json();
      } else {
        res.status(404).json({message: "Invalid Id", id});
      }
    })
    .catch(err => {
      // To solve the error running tests use "?":
      // TypeError: Cannot read properties of undefined (reading 'json')
      res.status(400)?.json({message: err.message});
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