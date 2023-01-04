const { response } = require('express');
const mysql = require('mysql');
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

con.connect();

const usersController = {

    getAll: (req, res) => {
        try{
            const sql = "SELECT * FROM users"
            con.query(sql, function(err, result, fields) {
                if (err) throw err;
                res.json({data:result});
            });
        } catch (error) {
            console.log(error);
        }
    },
    getById: (req, res) => {
        try {
            const { id } = req.params;
            const sql = "SELECT * FROM users WHERE id=?";
            con.query(sql, id, function(err, result, fields) {
                if (err) throw err;
                res.json({data:result});
            })
        } catch (error) {
            console.log(error);
        }
    },
    // 여기서부턴 고쳐야함.
    create: (req, res) => {
        try {
            const { name } = req.body;
            console.log(`insert new user : ${name}`);
            const sql = `INSERT INTO users (name) VALUES ('${name}')`;
            con.query(sql, function(err, result, fields) {
                if (err) throw err;
                res.json({data:result});
            })
        } catch (error) {
            console.log(error);
            res.json({status: "error"});
        }
    },
    update: (req, res) => {
        try {
            const { name, maches } = req.body;
            const { id } = req.params;
            const sql = `UPDATE users SET name = '${name}', maches = ${maches} WHERE id = ${id}`;
            console.log("[send]", sql);
            con.query(sql, function(err, result, fields) {
                if (err) throw err;
                res.json({data:result});
            })
        } catch (error) {
            console.log(error);
            res.json({status: "error"});
        }
    }
};

module.exports = usersController;