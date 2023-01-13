const con = require("../database/index");

const gameParams = ['id', 'name', 'maches']
const gamesController = {
  getAll: (req, res) => {
    try {
      let sql = "SELECT * FROM games";
      const { sortBy, ascending } = req.query;
      if(userParams.includes(sortBy)){
        sql += `ORDER BY ${sortBy} `;
        if (ascending == 'false'){
          sql += `DESC`
        }
      }
      console.log(sql);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
    } catch (error) {
      console.log(error);
    }
  },
  getByElement: (req, res) => {
    try{
      let sql = "SELECT * FROM games ";
      const { id, name, maches } = req.query;
      if (id) { sql += `WHERE id=${id}`}
      else if (name) { sql += `WHERE name='${name}'`}
      else if (maches) { sql += `WHERE maches=${maches}`}
      console.log(sql)
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
    } catch (err) {
      console.log(err)
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
  update1: (req, res) => {
    try {
      let sql = `UPDATE games SET `;
      const { name, maches } = req.body;
      console.log (name, maches);
      const { id } = req.params;
      if (name) { sql += `name = '${name}'`}
      else if (maches) { sql += `maches = ${maches}` }
      sql += ` WHERE id = ${id}`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
      console.log(sql);
    } catch (err) {
      console.log(err);
      res.json({ status: "err" });
    }
  }
};

module.exports = gamesController;
