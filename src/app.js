const express = require("express");

const app = express();

const config = require("./config");

const db = require("./utils/database");

const initModels = require("./models/initModels");



app.use(express.json());

db.authenticate()
  .then(() => {console.log("DB Authentication Succesfully")})
  .catch((err) => {console.log(err)});

db.sync()
  .then(() => {console.log("DB Synced")})
  .catch((err) => {console.log(err)}); 

initModels();

app.get("/", (req, res) => {

  res.status(200).json({
    message: "OK!",
    directors: `localhost: ${config.port}/api/v1/directors`
  });
  
});

app.listen(config.port, () => {

  console.log(`Server started at port ${config.port}`);

});



