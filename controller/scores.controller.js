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

/*
todo:

POST(Create)
    새로운 대결 입력하기
    - 관련 게임 매치 수 증가
    - 관련 유저들 승/패 수 증가
    
GET(Read)
    0. 전체 다 찾기
    1. id로 찾기
    2. game 이름으로 찾기
    3. 대결한 유저 이름으로 찾기
    3-1. 이긴사람 이름으로 찾기
    3-2. 진사람 이름으로 찾기
    4. 대결한 날짜로 찾기
    4-1. 최근 n개 대결 찾기
    4-2. 오래된 n개 대결 찾기

PUT(Update)
    1. 대결 점수 변경
       - 승, 패 바뀔 경우: 관련 유저들 승/패 수 변경
    2. 대결 날짜 변경
    3. 대결 게임 변경
    - 이전 게임 및 바뀐 게임 매치수 변경
    4. 대결 유저 변경
    - 알맞게 승/패도 변경
*/

const scoresController = {
    //sql 문이 너무 길면 안됨.. 내일 나누는거 시도해보기.
  create: (req, res) => {
    try {
      const { game_id, user1_id, user2_id, user1_score, user2_score, date } = req.body;
      const values = [game_id, user1_id, user2_id, user1_score, user2_score, date];
      const sql = makeSQL.newScore(req.body);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json({data : result});
      })
    } catch (error) {
      console.log(error);
      res.json({ status: "error" });
    }
  },
  getAll: (req, res) => {
    try {
      const sql = "SELECT * FROM scores";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log(result[0]);

        res.json({ data: result });
      });
      console.log("READ all scores");
    } catch (error) {
      console.log(error);
    }
  }
};

const makeSQL = {
    newScore: (body) => {
        const { game_id, user1_id, user2_id, user1_score, user2_score, date } = body;
        let sql;
        sql = 
`INSERT INTO scores (game_id, user1_id, user2_id, user1_score, user2_score, date) 
VALUES (${game_id}, ${user1_id}, ${user2_id}, ${user1_score}, ${user2_score}, '${date}');`
        if (user1_score > user2_score) {
            sql += `UPDATE users SET win = win + 1 WHERE id = ${user1_id};`;
            sql += `UPDATE users SET lose = lose + 1 WHERE id = ${user2_id};`;
        } else {
            sql += `UPDATE users SET win = win + 1 WHERE id = ${user2_id};`;
            sql += `UPDATE users SET lose = lose + 1 WHERE id = ${user1_id};`;
        }
        sql += `UPDATE games SET maches = maches + 1 WHERE id = ${game_id};`;
        
        return sql;
    }
};




module.exports = scoresController;
