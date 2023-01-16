const pool = require("../database/index");

const gameParams = ['id', 'name', 'maches']
const gamesController = {
  getAll: async (req, res) => {
    try {
      let sql = "SELECT * FROM games";
      const { sortBy, ascending } = req.query;
      if (gameParams.includes(sortBy)) {
        sql += `ORDER BY ${sortBy} `;
        if (ascending == "false") {
          sql += `DESC`;
        }
      }
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        sataus: 200,
        data: rows
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 400 });
    }
  },
  getByElement: async (req, res) => {
    try {
      let sql = "SELECT * FROM games ";
      const { id, name, maches } = req.query;
      if (id) {
        sql += `WHERE id=${id}`;
      } else if (name) {
        sql += `WHERE name='${name}'`;
      } else if (maches) {
        sql += `WHERE maches=${maches}`;
      }
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        status: 200,
        data: rows
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 400 });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `SELECT * FROM games WHERE id=${id}`;
      const [rows, fields] = await pool.query(sql);
      res.json({
        status: 200,
        data: rows
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 400 });
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      console.log(`insert new game : ${name}`);
      const sql = `INSERT INTO games (name) VALUES ('${name}')`;
      const [rows, fields] = await pool.query(sql);
      res.json({
        status: 201
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 400 });
    }
  },
  update: async (req, res) => {
    try {
      const { name, maches } = req.body;
      const { id } = req.params;
      const sql = `UPDATE games SET name = '${name}', maches = ${maches} WHERE id = ${id}`;
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        status: 201
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 400 });
    }
  },
  update1: async (req, res) => {
    try {
      let sql = `UPDATE games SET `;
      const { name, maches } = req.body;
      console.log(name, maches);
      const { id } = req.params;
      if (name) {
        sql += `name = '${name}'`;
      } else if (maches) {
        sql += `maches = ${maches}`;
      }
      sql += ` WHERE id = ${id}`;
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        status: 201
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 400 });
    }
  },
};

module.exports = gamesController;
