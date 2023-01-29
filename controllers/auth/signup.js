const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const { User } = require("../../models/user");
const { sendEmail, createVerifyEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { password, email, ...rest } = await req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...rest,
    email,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(
    payload,
    SECRET_KEY
    // { expiresIn: "12h" }
  );
  await User.findByIdAndUpdate(newUser._id, { token });

  const verificationToken = v4();
  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    message: "Для підтвердження перейдіть за вказаною при реєстрації адресою",
    token,
    status: "dele",
    data: { _id: newUser._id, name: newUser.name, email: newUser.email },
  });
};

module.exports = signup;
