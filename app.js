const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session"); //?
const passport = reequire("passport"); // ??
require("dotenv").config();

const authRouter = require("./routes/auth");
const passportSetup = require("./services/passport/passport");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const FILE_LIMIT_SIZE = 9000000;

app.use(cookieSession({ name: "session", keys: ["stud"], maxAge: 24 * 60 * 60 * 100 }));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(bodyParser.json({ limit: FILE_LIMIT_SIZE, parameterLimit: FILE_LIMIT_SIZE, type: "application/*+json" }));
app.use(bodyParser.urlencoded({ limit: FILE_LIMIT_SIZE, extended: false }));

app.use("/auth", authRouter);
// app.use("/user", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
