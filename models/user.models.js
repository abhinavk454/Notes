const Schema = require("mongoose").Schema,
  Model = require("mongoose").model;

const User = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  docs: [
    {
      title: {
        type: String,
        default: "Title",
      },
      description: {
        type: String,
        default: "Desc....",
      },
      status: {
        type: String,
        enum: ["done", "todo"],
        default: "todo",
      },
    },
  ],
  token: {
    type: String,
  },
});

module.exports = Model("User", User);
