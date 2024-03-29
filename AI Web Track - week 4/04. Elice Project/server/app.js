const express = require("express");
const mongoose = require("mongoose");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

// ML
const ML = require("./routes/ML");

const authMiddleware = require("./utils/authMiddleware");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// DB 연결
mongoose.connect("mongodb://localhost:27017/myApp");

mongoose.connection.on("connected", () => {
  console.log("DB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ML 라우팅
app.use("/ml", ML);

// auth url 경로 라우팅
app.use("/auth", authRouter);

// posts url 경로 라우팅
app.use("/posts", authMiddleware, postsRouter);

// user url 경로 라우팅
app.use("/user", userRouter);

app.listen(8080, () => {
  console.log("Server Staaaaaaaaaaaaaaart");
});
