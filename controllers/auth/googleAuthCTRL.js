const { v4 } = require("uuid");

const { createCheckingEmail, sendEmail } = require("../../services/mail");
const { signUpService } = require("../../services/db/auth/authServices");

authUser = (request, accessToken, refreshToken, profile, done) => {
  console.log("passport7 profile email===", profile);
  console.log("passport8 request====", request);
  console.log("passport9 accessToken====", accessToken);
  console.log("passport10 refreshToken====", refreshToken);

  //check if a user exists with this email or not
  // user.findOne({ email: profile.emails[0].value }).then(data => {
  //   if (data) {
  //     //user exists
  //     //update data
  //   } else {
  //     // create a user
  //     user({
  //       username: "",
  //       email: profile.emails[0].value,
  //       googleId: profile.Id,
  //       password: null,
  //       provider: "google",
  //       isverified: true,
  //     }).save((err, dats) => {
  //       return done(null, data);
  //     });
  //   }
  // });
  return done(null, profile);
};

const gooogleAuthCTRL = async (req, res) => {
  //   const { password, email, ...rest } = await req.body;
  //   const { name, surname, birthday } = rest;

  const checkingToken = v4();

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
