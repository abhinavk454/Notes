const mongoose = require("mongoose");
var count = 0;

const mongo_options = {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const db = () =>
  mongoose
    .connect(process.env.MONGO_URI, mongo_options)
    .then(() => {
      console.log("Connected to DB successfully.");
    })
    .catch((err) => {
      console.log("DB connection failed retry after 5sec ", ++count);
      setTimeout(db, 5000);
    });

try {
  db();
} catch (err) {}
