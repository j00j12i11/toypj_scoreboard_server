const { response } = require("express");
const mysql = require("mysql");
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con.connect();

const gamesController = {
  getAll: (req, res) => {
    try {
      const sql = "SELECT * FROM games";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
    } catch (error) {
      console.log(error);
    }
  },
  getById: (req, res) => {
    try {
      const { id } = req.params;
      const sql = "SELECT * FROM games WHERE id=?";
      con.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
    } catch (error) {
      console.log(error);
    }
  },
  create: (req, res) => {
    try {
      const { name } = req.body;
      console.log(`insert new game : ${name}`);
      const sql = `INSERT INTO games (name) VALUES ('${name}')`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "error" });
    }
  },
  update: (req, res) => {
    try {
      const { name, maches } = req.body;
      const { id } = req.params;
      const sql = `UPDATE games SET name = '${name}', maches = ${maches} WHERE id = ${id}`;
      console.log("[send]", sql);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
    } catch (error) {
      console.log(error);
      res.json({ status: "error" });
    }
  },
};

module.exports = gamesController;
