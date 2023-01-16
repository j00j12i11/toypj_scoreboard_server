const pool = require("../database/index");

const scoreParams = [
  "id",
  "game_id",
  "user1_id",
  "user2_id",
  "user1_score",
  "user2_score",
  "date",
];

const check_update = (rows) => {
  const { affectedRows, changedRows } = rows;
  if (affectedRows == 1 && changedRows == 1) {
    return true;
  } else {
    throw new Error("Update error");
  }
};
const check_insert = (rows) => {
  const { affectedRows } = rows;
  if (affectedRows == 1) {
    return true;
  } else {
    throw new Error("Insert error");
  }
};
const newScore = async (conn, body) => {
  const { game_id, user1_id, user2_id, user1_score, user2_score, date } = body;
  const scores_values = [
    game_id,
    user1_id,
    user2_id,
    user1_score,
    user2_score,
    date,
  ];
  const scores_sql =
    "INSERT INTO scores (game_id, user1_id, user2_id, user1_score, user2_score, date) VALUES (?, ?, ?, ?, ?, ?)";
  try {
    const [rows, fileds] = await conn.execute(scores_sql, scores_values);
    return check_insert(rows);
  } catch (error) {
    throw error;
  }
};
const setWinner = async (conn, winner) => {
  const sql = `UPDATE users SET win = win + 1 WHERE id = ${winner}`;
  try {
    const [rows, fileds] = await conn.execute(sql);
    return check_update(rows);
  } catch (error) {
    throw error;
  }
};
const setLoser = async (conn, loser) => {
  const sql = `UPDATE users SET lose = lose + 1 WHERE id = ${loser}`;
  try {
    const [rows, fileds] = await conn.execute(sql);
    return check_update(rows);
  } catch (error) {
    throw error;
  }
};
const setGame = async (conn, game) => {
  const sql = `UPDATE games SET maches = maches + 1 WHERE id = ${game};`;
  try {
    const [rows, fileds] = await conn.execute(sql);
    return check_update(rows);
  } catch (error) {
    throw error;
  }
};

const scoresController = {
  getAll: async (req, res) => {
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
      const [rows, fields] = await pool.query(sql);
      res.json({
        sataus: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getByElement: async (req, res) => {
    try {
      let sql = "SELECT * FROM scores ";
      const { game_id, user1_id, user2_id } = req.query;
      if (game_id) {
        sql += `WHERE game_id=${game_id}`;
      } else if (user1_id) {
        sql += `WHERE user1_id='${user1_id}'`;
      } else if (user2_id) {
        sql += `WHERE user2_id=${user2_id}`;
      }

      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        sataus: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const sql = "SELECT * FROM scores WHERE id=?";
      console.log(sql);
      const [rows, fields] = await pool.query(sql);
      res.json({
        sataus: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  create: async (req, res) => {
    let conn;
    const { user1_id, user2_id, game_id } = req.body;
    try {
      conn = await pool.getConnection(async (conn) => conn);
      await conn.beginTransaction();
      await newScore(conn, req.body);
      await setWinner(conn, user1_id);
      await setLoser(conn, user2_id);
      await setGame(conn, game_id);

      await conn.commit();
      res.json({ status: 201 });
    } catch (error) {
      console.log(error);
      if (conn) {
        conn.rollback();
        res.json({ status: 400 });
      }
    } finally {
      if (conn) {
        await conn.release();
      }
    }
  },
};

module.exports = scoresController;
