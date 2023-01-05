const express = require("express");
const app = express();

require("dotenv").config();

const gamesRouter = require("./routes/games.router");
const usersRouter = require("./routes/users.router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/games", gamesRouter);
app.use("/api/v1/users", usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running...");
});
