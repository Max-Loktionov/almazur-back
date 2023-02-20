const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session"); //?
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./services/passport/passport")(passport);

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const FILE_LIMIT_SIZE = 9000000;
const { CLIENT_URL } = process.env;

//Middleware
// app.use(cookieSession({ name: "session", keys: ["stud"], maxAge: 24 * 60 * 60 * 100 }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger(formatsLogger));
app.use(cors({ origin: CLIENT_URL, methods: "get,post,put,delete", credentials: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(bodyParser.json({ limit: FILE_LIMIT_SIZE, parameterLimit: FILE_LIMIT_SIZE, type: "application/*+json" }));
app.use(bodyParser.urlencoded({ limit: FILE_LIMIT_SIZE, extended: false }));

app.use("/auth", authRouter);
// app.use("/user", usersRouter);
app.use("/partner", partnersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
