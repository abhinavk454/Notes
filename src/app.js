//importing modules
const express = require("express"),
  cors = require("cors"),
  routes = require("../routes/user.routes");
require("dotenv").config();

//creating app
const app = express();
const port = process.env.PORT || 3000;

//configuring apps
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

//setting routes
app.use(routes);

//starting server
try {
  app.listen(port, () => {
    console.log(`Server is on http://localhost:${port}.`);
  });
} catch (err) {
  console.error(err);
}
