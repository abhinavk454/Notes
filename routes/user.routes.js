//importing models
const userRouter = require("express").Router();
const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.middlewares");

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
      const encryptedPassword = await bcrypt.hash(password, 10);
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
    //returning error
    res.status(500).json({ error: err });
  }
});

//login route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("Email and password is required for login.");
    }

    //check for if user is not registered
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("User not found please register.");
    } else if (user && (await bcrypt.compare(password, user.password))) {
      //sign access token
      const token = jwt.sign(
        {
          user: user._id,
          email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "4h",
        }
      );

      //assign token
      user.token = token;
      res.body = user;
      req.body = user;
      console.log(res.body);
      //redirect to welcome route
      res.redirect("/welcome");
    } else {
      res.status(400).send("Invalid credentials.");
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//welcome route
userRouter.post("/welcome", auth, async (req, res) => {
  var res_l = {};
  const email = req.body.email;

  // getting user details
  await User.findOne({ email })
    .then((result) => {
      res_l = result;
    })
    .catch((err) => {
      console.log(err);
    });

  res.send(`Welcome ${res_l.first_name} ${res_l.last_name}😎😎.`);
});
//document route

//home route
userRouter.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = userRouter;
