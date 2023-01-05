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

const usersController = {
  getAll: (req, res) => {
    try {
      const sql = "SELECT * FROM users";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
      console.log("READ all users");
    } catch (error) {
      console.log(error);
    }
  },
  getById: (req, res) => {
    try {
      const { id } = req.params;
      const sql = "SELECT * FROM users WHERE id=?";
      con.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
      console.log(`READ user id = ${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  getByName: (req, res) => {
    try {
      const { name } = req.params;
      const sql = "SELECT * FROM users WHERE name='${name}'";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
      console.log(`READ user name = '${name}'`);
    } catch (error) {
      console.log(error);
    }
  },
  create: (req, res) => {
    try {
      const { name, age, gender } = req.body;
      const sql = `INSERT INTO users (name, age, gender) VALUES ('${name}', ${age}, ${gender})`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
      const gen_E = gender == true ? "male" : "female";
      console.log(`insert new user ('${name}', '${age}', ${gen_E})`);
    } catch (error) {
      console.log(error);
      res.json({ status: "error" });
    }
  },
  update: (req, res) => {
    try {
      const { name, age, gender } = req.body;
      const { id } = req.params;
      const sql = `UPDATE users SET name = '${name}', age = ${age}, gender = ${gender}  WHERE id = ${id}`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
      const gen_E = gender == true ? "male" : "female";
      console.log(`update user[id=${id}] to ('${name}', ${age}, ${gen_E})`);
    } catch (error) {
      console.log(error);
      res.json({ status: "error" });
    }
  },
};

module.exports = usersController;
