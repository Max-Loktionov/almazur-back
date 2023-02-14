const { v4 } = require("uuid");

const { createCheckingEmail, sendEmail } = require("../../services/mail");
const { signUpService } = require("../../services/db/auth/authServices");

const gooogleAuthCTRL = async (req, res) => {
  //   const { password, email, ...rest } = await req.body;
  //   const { name, surname, birthday } = rest;

  const checkingToken = v4();
  //   const hashPassword = await bcrypt.hash(password, 10);
  const newData = {
    name,
    surname,
    birthday,
    email,
    password: hashPassword,
    checkingToken,
    verify: true,
    verificationToken: "",
  };
  const newUser = await signUpService(email, newData);

  const mail = createCheckingEmail(email, checkingToken, name, surname, birthday);

  await sendEmail(mail);

  res.status(201).json({
    message: "Після підтвердження даних адміністратором, ви зможете зайти в приватний кабінет",
    data: { _id: newUser._id, name, surname, birthday, email },
  });
};

module.exports = gooogleAuthCTRL;
