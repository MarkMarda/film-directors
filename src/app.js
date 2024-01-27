const express = require("express");

const swaggerUi = require("swagger-ui-express");

const fileUpload = require("express-fileupload");

const config = require("./config");

const db = require("./utils/database");

const initModels = require("./models/initModels");

const countriesRouter = require("./countries/countries.router");
const directorsRouter = require("./directors/directors.router");

const swaggerDocumentation = require("../documentation/openapi.json")



const app = express();

app.use(express.json());

//Fileupload middleware
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  createParentPath : true
}));

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
    directors: `localhost: ${config.port}/api/v1`
  });
  
});

app.use("/api/v1/directors", directorsRouter);
app.use("/api/v1/countries", countriesRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

const server = app.listen(config.port, () => {

  console.log(`Server started at port ${config.port}`);

});

module.exports = {

  app,
  server
  
}; 
//TODO:
//Revisar bien el tipo de datos de los models, por ejemplo el data
//Falta el cors, revisar si es necesario para un tipo de proyecto como este
//agragar cortos ademas de peliculas como informacion
//documentar app
//test de app
