const con = require("../database/index");

const scoreParams = [ "id", "game_id", "user1_id", "user2_id", "user1_score", "user2_score", "date" ];
const scoresController = {
  getAll: (req, res) => {
    try {
      let sql = "SELECT * FROM scores ";
      const { sortBy, ascending } = req.query;
      if (scoreParams.includes(sortBy)) {
        sql += `ORDER BY ${sortBy} `;
        if (ascending == "false") {
          sql += `DESC`;
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
      let sql = "SELECT * FROM scores ";
      const { game_id, user1_id, user2_id } = req.query;
      if (game_id) { sql += `WHERE game_id=${game_id}`}
      else if (user1_id) { sql += `WHERE user1_id='${user1_id}'`}
      else if (user2_id) { sql += `WHERE user2_id=${user2_id}`}

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
      const sql = "SELECT * FROM scores WHERE id=?";
      con.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        res.json({ data: result });
      });
    } catch (err) {
      console.log(err);
    }
  },
  create: (req, res) => {
    try {
      const { game_id, user1_id, user2_id, user1_score, user2_score, date } = req.body;
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
  }
};

module.exports = scoresController;
