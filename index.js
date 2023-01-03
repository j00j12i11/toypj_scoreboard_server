const express = require('express');
const app = express();

require('dotenv').config()

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running...")
})
