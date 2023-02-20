const { v4 } = require("uuid");

const { createCheckingEmail, sendEmail } = require("../../services/mail");
const { signUpService } = require("../../services/db/auth/authServices");

const authUser = async (request, accessToken, refreshToken, profile, done) => {
  console.log("google7 profile email===", profile);
  // console.log("google8 request====", request);
  console.log("google9 accessToken====", accessToken);
  console.log("google10 refreshToken====", refreshToken);

  //  ============= ctrl ============

  const { name, displayName } = profile;
  const userEmail = profile.emails[0].value;
  const checkingToken = v4();

  const newData = {
    name: displayName,
    surname: name.familyName,

    email: userEmail,
    password: null,
    checkingToken,
    verify: true,
    verificationToken: "",
  };
  const newUser = await signUpService(userEmail, newData);

  const mail = createCheckingEmail(userEmail, checkingToken, newData);

  await sendEmail(mail);

  return done(null, profile);
};

module.exports = authUser;
