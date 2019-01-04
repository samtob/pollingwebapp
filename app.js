const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const poll= require("./routes/poll");
const mongoose = require("mongoose");
const port = 5000;


require("./config/db");


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : false}));

app.use("/poll", poll);

app.use(cors());

app.listen(port, ()=> {
    console.log(`Running on port : ${port}`);
});

