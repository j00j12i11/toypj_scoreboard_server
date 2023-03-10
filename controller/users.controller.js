const pool = require("../database/index");

const userParams = ["id", "name", "age", "gender", "win", "lose"];
const usersController = {
  getAll: async (req, res, next) => {
    try {
      let sql = "SELECT * FROM users ";
      const { sortBy, ascending } = req.query;
      if (userParams.includes(sortBy)) {
        sql += `ORDER BY ${sortBy} `;
        if (ascending == "false") {
          sql += `DESC`;
        }
      }
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        sataus: 200,
        data: rows,
      });
    } catch (error) {
      next(error);
    }
  },
  getByElement: async (req, res, next) => {
    try {
      let sql = "SELECT * FROM users ";
      const { id, name, age, gender } = req.query;
      // const gen_E = gender == true ? "male" : "female";
      if (id) {
        sql += `WHERE id=${id}`;
      } else if (name) {
        sql += `WHERE name='${name}'`;
      } else if (age) {
        sql += `WHERE age=${age}`;
      } else if (gender) {
        sql += `WHERE gender=${gender}`;
      }
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        sataus: 200,
        data: rows,
      });
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const sql = `SELECT * FROM users WHERE id=${id}`;
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        sataus: 200,
        data: rows,
      });
    } catch (err) {
      console.log(error);
      res.json({ status: 400 });
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, age, gender } = req.body;
      const sql = `INSERT INTO users (name, age, gender) VALUES ('${name}', ${age}, ${gender})`;
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        sataus: 201,
      });
      // const gen_E = gender == true ? "male" : "female";
      // console.log(`insert new user ('${name}', '${age}', ${gen_E})`);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { name, age, gender } = req.body;
      const { id } = req.params;
      const sql = `UPDATE users SET name = '${name}', age = ${age}, gender = ${gender}  WHERE id = ${id}`;
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        sataus: 201,
      });
    } catch (error) {
      cnext(error);
    }
  },
  update1: async (req, res, next) => {
    try {
      let sql = `UPDATE users SET `;
      const { name, age, gender } = req.body;
      console.log(name, age, gender);
      const { id } = req.params;
      const gen_E = gender == true ? "male" : "female";
      if (name) {
        sql += `name = '${name}'`;
      } else if (age) {
        sql += ` age = ${age} `;
      } else if (gender) {
        sql += ` gender = ${gen_E} `;
      }
      sql += ` WHERE id = ${id}`;
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        sataus: 201,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = usersController;
