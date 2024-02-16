// const { auth } = require("express-openid-connect");
const express = require("express");
const cors = require("cors");
const dbo = require("./src/connection/conn.js");
// const routes = require("./src/routes/index");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname,"../../.env") });
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
// app.use("items", routes.items);

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
