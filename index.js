const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user");
const { empRouter } = require("./routes/emp");
const { auth } = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", userRouter);
app.use("/api", auth, empRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Backed of Employee Management ");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDb Database");

    console.log("Connected to Database");
  } catch (error) {
    console.log(error.message);
    console.log("Database not Connected");
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
