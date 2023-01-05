const e = require("express");
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

const check = {
    userId: (req, res, next) => {
        try {
            const { id } = req.params;
            const sql = `SELECT * FROM users WHERE id = ${id}`;
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                if (result[0] === undefined) {
                    console.log(`there is no user 'id = ${id}'`);
                    res.send(`there is no user 'id = ${id}'`);
                }
                else next();
            })
        }  catch (error) {
            console.log(error);
        }
    },
    gameId: (req, res, next) => {
        try {
            const { id } = req.params;
            const sql = `SELECT * FROM games WHERE id = ${id}`;
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                if (result[0] === undefined) {
                    console.log(`there is no game 'id = ${id}'`);
                    res.send(`there is no game 'id = ${id}'`);
                }
                else next();
            })
        }  catch (error) {
            console.log(error);
        }
    },
    scoreUserId: (req, res, next) => {
        try {
            const { user1_id, user2_id, user1_score, user2_score } = req.body;
            const sql = `SELECT * FROM users WHERE id = ${user1_id} OR id = ${user2_id}`;
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                if (result.length == 2) {
                    console.log('user id check ok!');
                    // if (user1_id < user2_id)
                    //     req.flag = result[0].id == user1_id && result[1].id == user2_id;
                    // else
                    //     req.flag = result[1].id == user1_id && result[0].id == user2_id;
                    next();
                } 
                else res.send('there is no..');
                
            })
        }  catch (error) {
            console.log(error);
        }
    },
    scoreGameId: (req, res, next) => {
        try {
            const { game_id } = req.body;
            const sql = `SELECT * FROM games WHERE id = ${game_id}`;
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                if (result[0] === undefined) {
                    console.log(`there is no game 'id = ${game_id}'`);
                    res.send(`there is no game 'id = ${game_id}'`);
                }
                else next();
            })
        }  catch (error) {
            console.log(error);
        }
    }
 }

module.exports = check;