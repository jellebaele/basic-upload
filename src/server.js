const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const routes = require("./api/routes")

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  process.env.DATABASE_URL,
  {
      useUnifiedTopology: true, 
      useNewUrlParser: true
  },
  () => console.log('Connected to db')
)

app.set("view engine", "ejs");
app.use(routes);

const port = process.env.PORT || "3000";

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server listening on http://localhost:${port}`);
});
