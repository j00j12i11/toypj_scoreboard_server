const express = require("express");
const app = express();

require("dotenv").config();

const gamesRouter = require("./routes/games.router");
const usersRouter = require("./routes/users.router");
const scoresRouter = require("./routes/scores.router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/games", gamesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/scores", scoresRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
      msg: "hello world!",
  });
})
app.listen(PORT, () => {
  console.log("Server running... in ", PORT);
});
