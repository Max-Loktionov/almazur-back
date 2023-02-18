const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const { createCheckingEmail, sendEmail } = require("../../services/mail");
const { findUserByAnyFieldService, createUserService } = require("../../services/db/auth/authServices");

const { SECRET_KEY } = process.env;

const authUser = async (request, accessToken, refreshToken, profile, done) => {
  console.log("google7 profile email===", profile);
  // console.log("google8 request====", request);
  console.log("google9 accessToken====", accessToken);
  // console.log("google10 refreshToken====", refreshToken);

  //  ============= ctrl ============

  const { name, displayName } = profile;
  const userEmail = profile.emails[0].value;
  const checkingToken = v4();
  let message = "";

  const newData = {
    name: displayName,
    surname: name.familyName,
    googleId: profile.id,
    email: userEmail,
    password: null,
    checkingToken,
    verify: true,
    verificationToken: "",
  };

  //check if user exists with this email or not

  const field = { email: userEmail };
  const user = await findUserByAnyFieldService({ email: userEmail });

  if (user) {
    console.log("=====google41 user====", user);
    // if user exists  we have to generate the token

    // const passwordCompare = await bcrypt.compare(password, user.password);
    // if (!passwordCompare) {
    //   throw createError(401, "Email or password is wrong");
    // }
    if (!user.checked) {
      throw createError(400, "Administrator hasn't checked your status");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(
      payload,
      SECRET_KEY
      // { expiresIn: "12h" }
    );

    console.log("=====google59 token====", token);
    await User.findByIdAndUpdate(user._id, { token });
    message = " success login with googleAuth";
    // res.json({
    //   message: "success",
    //   token,
    //   data: { result: { _id: user._id } },
    // });
  } else {
    // if user doesn't exist we have to create newUser
    const newUser = await createUserService(newData);

    const mail = createCheckingEmail(userEmail, checkingToken, newData);

    await sendEmail(mail);
    message = "Після підтвердження даних адміністратором, ви зможете зайти до профілю";
  }

  return done(null, profile);

  // res.status(201).json({
  //   message: "Після підтвердження даних адміністратором, ви зможете зайти в приватний кабінет",
  //   data: { userEmail },
  // });
};

module.exports = authUser;

//check if user exists with this email or not
//   // user.findOne({ email: profile.emails[0].value }).then(data => {
//   //   if (data) {
//   //     //user exists
//   //     //update data
//   //   } else {
//   //     // create a user
//   //     user({
//   //       username: "",
//   //       email: profile.emails[0].value,
//   //       googleId: profile.Id,
//   //       password: null,
//   //       provider: "google",
//   //       isverified: true,
//   //     }).save((err, dats) => {
//   //       return done(null, data);
//   //     });
//   //   }
//   // });
