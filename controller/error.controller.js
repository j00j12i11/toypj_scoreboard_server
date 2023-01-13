const { request } = require("express");
const mysql = require("mysql");
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con.connect();

const errorController = {
    scoresError: (err, req, res, next) => {
      
    }
}

module.exports = errorController;