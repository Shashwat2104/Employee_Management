const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserModel } = require("../model/user.model");
const userRouter = express.Router();



userRouter.post("/signup", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, secure_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ email, pass: secure_pass, name });
        await user.save();
        res.send("Registered Sucessfull");
      }
    });
  } catch (error) {
    res.send("Error in Registering User");
    console.log(error);
  }
});




userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              userID: user[0]._id,
            },
            process.env.secret
          );

          res.send({ msg: "Login successful", token: token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (error) {
    res.send("error");
    console.log(error);
  }
});

module.exports = {
  userRouter,
};
