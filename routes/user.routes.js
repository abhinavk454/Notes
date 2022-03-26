const userRouter = require("express").Router();

userRouter.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = userRouter;
