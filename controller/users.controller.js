const con = require("../database/index");

const userParams = ['id', 'name', 'age', 'gender', 'win', 'lose'];
const usersController = {
  getAll: (req, res) => {
    try {
      let sql = "SELECT * FROM users ";
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
    } catch (err) {
      console.log(err);
    }
  },
  getByElement: (req, res) => {
    try{
      let sql = "SELECT * FROM users ";
      const { id, name, age, gender } = req.query;
      const gen_E = gender == true ? "male" : "female";
      if (id) { sql += `WHERE id=${id}`}
      else if (name) { sql += `WHERE name='${name}'`}
      else if (age) { sql += `WHERE age=${age}`}
      else if (gender) { sql += `WHERE age=${gen_E}`}

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
      const sql = "SELECT * FROM users WHERE id=?";
      con.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
      console.log(`READ user id = ${id}`);
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
      res.json({ status: "err" });
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
    } catch (err) {
      console.log(err);
      res.json({ status: "err" });
    }
  },
  update1: (req, res) => {
    try {
      let sql = `UPDATE users SET `;
      const { name, age, gender } = req.body;
      console.log (name, age, gender)
      const { id } = req.params;
      const gen_E = gender == true ? "male" : "female";
      if (name) { sql += `name = '${name}'`}
      else if (age) { sql += ` age = ${age} ` }
      else if (gender) { sql += ` gender = ${gen_E} ` }
      sql += ` WHERE id = ${id}`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
      console.log(sql);
      // console.log(`update user[id=${id}] to ('${name}', ${age}, ${gen_E})`);
    } catch (err) {
      console.log(err);
      res.json({ status: "err" });
    }
  }
};

module.exports = usersController;
