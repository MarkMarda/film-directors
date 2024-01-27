require("dotenv").config();



const config = {

  port: process.env.PORT || 9000,
  nodeENV: process.env.NODE_ENV || "development",
  db: {
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "K@fk@_",
    dbName: process.env.DB_NAME
  },
  cloudinary: process.env.CLOUDINARY_URL

};

module.exports = config;