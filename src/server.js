const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const routes = require("../routes/routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

const port = process.env.PORT || "3000";

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server listening on http://localhost:${port}`);
});
