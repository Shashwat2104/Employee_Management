

const express = require("express");
const cors = require("cors");
require("dotenv").config()
const { connection } = require("./config/db");

const { userRouter } = require("./routes/user");
const {empRouter} = require("./routes/emp")
const { auth } = require("./middleware/auth");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api",userRouter )
app.use("/api",auth,empRouter )

app.get("/", (req, res) => {
  res.send("Welcome");
});



app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log(error, "unable to connect to DB");
  }
});

