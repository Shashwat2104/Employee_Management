const express = require("express")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("../model/user.model")
const userRouter = express.Router()

userRouter.post("/signup", async (req, res) => {
    const {  email, pass , confirmPassword} = req.body;
    try {
      bcrypt.hash(pass, 5, async (err, secure_pass) => {
        if (err) {
          console.log(err);
        } else {
          const user = new UserModel({ email, pass: secure_pass, confirmPassword });
          await user.save();
          res.send("Registered");
        }
      });
    } catch (error) {
      res.send("Error in registering user");
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
                // exp: Math.floor(Date.now() / 1000) + 60 * 60,
                userID: user[0]._id,
              },
              "masai"
            );
            // let storedToken = localStorage.setItem("token", JSON.stringify(token))
            res.send({ msg: "login successful", token: token });
          } else {
            res.send("wrong credentials");
          }
        });
      } else {
        res.send("wrong credentials");
      }
    } catch (error) {
      res.send("error");
      console.log(error);
    }
  });



  module.exports ={
    userRouter
  }