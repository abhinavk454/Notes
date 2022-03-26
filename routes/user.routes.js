//importing models
const userRouter = require("express").Router();
const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register route
userRouter.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    //check for valid data
    if (!(first_name && last_name && email && password)) {
      res.status(400).send("All field is required");
    }

    //check for if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(409).send("User already exists please login.");
    } else {
      encryptedPassword = await bcrypt.hash(password, 10);

      //create user
      const user = new User({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      //create token
      const token = await jwt.sign(
        { user: user._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "5h",
        }
      );

      //saving user and assigning token
      user.token = token;
      await user.save();

      //sending response
      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//login route

//welcome route

//document route

//home route
userRouter.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = userRouter;
