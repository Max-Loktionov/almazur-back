const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const { SECRET_KEY } = process.env;
const { User } = require("../../models/user");
const { sendEmail, createCheckingEmail } = require("../../helpers");

const signupCTRL = async (req, res) => {
  const { password, email, ...rest } = await req.body;
  const { name, surname, birthday } = rest;

  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const checkingToken = v4();
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...rest,
    name,
    surname,
    birthday,
    email,
    password: hashPassword,
    checkingToken,
    verificationToken: "",
  });
  console.log("signupCTRL: ", name, surname, birthday);

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(
    payload,
    SECRET_KEY
    // { expiresIn: "12h" }
  );
  await User.findByIdAndUpdate(newUser._id, { token });

  const mail = createCheckingEmail(email, checkingToken, name, surname, birthday);

  await sendEmail(mail);

  res.status(201).json({
    message: "Після підтвердження даних адміністратором, на вказану вами адресу буде надіслано лист",
    token,
    data: { _id: newUser._id, name, surname, birthday, email },
  });
};

module.exports = signupCTRL;
