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
const insertScore = async (conn, body) => {
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
const setScore = async (conn, sets, id) => {
  let sql = "UPDATE scores SET ";
  for (let set of sets) {
    sql += set;
    sql += ", ";
  }
  sql = sql.slice(0, -2);
  sql += ` WHERE id = ${id}`;
  try {
    console.log(sql);
    const [rows, fileds] = await conn.execute(sql);
    return check_update(rows);
  } catch (error) {
    throw error;
  }
};
const setUser = async (conn, set, id) => {
  const sql = `UPDATE users SET ${set} WHERE id = ${id}`;
  try {
    console.log(sql);
    const [rows, fileds] = await conn.execute(sql);
    return check_update(rows);
  } catch (error) {
    throw error;
  }
};
const setGame = async (conn, set, game) => {
  const sql = `UPDATE games SET ${set} WHERE id = ${game}`;
  try {
    console.log(sql);
    const [rows, fileds] = await conn.execute(sql);
    return check_update(rows);
  } catch (error) {
    throw error;
  }
};
const makeSets = (body, prev) => {
  const sets = {};
  const scores = [];
  // game 변동
  if (body["game_id"] && body["game_id"] != prev["game_id"]) {
    scores.push(`game_id = ${body["game_id"]}`);
    const game_set = {};
    game_set[prev["game_id"]] = "maches = maches - 1";
    game_set[body["game_id"]] = "maches = maches + 1";
    sets.games = game_set;
  }
  // user id 변동
  if (body["user1_id"] || body["user2_id"]) {
    const user_set = {};
    // case1) 둘 중 하나만 바뀜
    if (
      body["user1_id"] == prev["user1_id"] &&
      body["user2_id"] != prev["user2_id"]
    ) {
      user_set[prev["user2_id"]] = `lose = lose - 1`;
      user_set[body["user2_id"]] = `lose = lose + 1`;
      scores.push(`user2_id = ${body["user2_id"]}`);
    } else if (
      body["user2_id"] == prev["user2_id"] &&
      body["user1_id"] != prev["user1_id"]
    ) {
      user_set[prev["user1_id"]] = `win = win - 1`;
      user_set[body["user1_id"]] = `win = win + 1`;
      scores.push(`user1_id = ${body["user1_id"]}`);
    }
    // case2) user1,2가 서로 바뀜
    else if (
      body["user1_id"] == prev["user2_id"] &&
      body["user2_id"] == prev["user1_id"]
    ) {
      user_set[body["user1_id"]] = `win = win + 1, lose = lose - 1`;
      user_set[body["user2_id"]] = `win = win - 1, lose = lose + 1`;
      scores.push(
        `user1_id = ${body["user1_id"]}, user2_id = ${body["user2_id"]}`
      );
    }
    // case3) user1과 user2가 이전과 완전히 상관없는 사람으로 변경
    else {
      if (body["user1_id"] != prev["user1_id"]) {
        user_set[prev["user1_id"]] = `win = win - 1`;
        user_set[body["user1_id"]] = `win = win + 1`;
        scores.push(`user1_id = ${body["user1_id"]}`);
      }
      if (body["user2_id"] != prev["user2_id"]) {
        if (!user_set[prev["user2_id"]]) {
          user_set[prev["user2_id"]] = `lose = lose - 1`;
        } else {
          user_set[prev["user2_id"]] += `, lose = lose - 1`;
        }
        if (!user_set[body["user2_id"]]) {
          user_set[body["user2_id"]] = `lose = lose + 1`;
        } else {
          user_set[body["user2_id"]] = `, lose = lose + 1`;
        }

        scores.push(`user2_id = ${body["user2_id"]}`);
      }
    }
    sets.users = user_set;
  }
  // user score 변동
  if (body["user1_score"] && body["user1_score"] != prev["user1_score"]) {
    scores.push(`user1_score = ${body["user1_score"]}`);
  }
  if (body["user2_score"] && body["user2_score"] != prev["user2_score"]) {
    scores.push(`user2_score = ${body["user2_score"]}`);
  }

  // date 변동
  if (body["date"] && body["date"] != prev["date"]) {
    scores.push(`date = '${body["date"]}'`);
  }
  sets.scores = scores;
  return sets;
};
const prevScore = async (conn, id) => {
  const sql = `SELECT * FROM scores WHERE id = ${id}`;
  try {
    const [rows, fileds] = await conn.execute(sql);
    return rows;
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
      await insertScore(conn, req.body);
      await setUser(conn, "win = win + 1", user1_id);
      await setUser(conn, "lose = lose + 1", user2_id);
      await setGame(conn, "maches = maches + 1", game_id);

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
  update: async (req, res) => {
    let conn;
    const id = req.params.id;
    try {
      conn = await pool.getConnection(async (conn) => conn);
      await conn.beginTransaction();
      const [prev] = await prevScore(conn, id);
      const sets = makeSets(req.body, prev);
      console.log(sets);
      if (sets.scores) {
        await setScore(conn, sets.scores, id);
      }
      if (sets.games) {
        const id_list = Object.keys(sets.games);
        for (let id of id_list) {
          await setGame(conn, sets.games[id], id);
        }
      }
      if (sets.users) {
        const id_list = Object.keys(sets.users);
        for (let id of id_list) {
          await setUser(conn, sets.users[id], id);
        }
      }
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
