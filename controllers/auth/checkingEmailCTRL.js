const { v4 } = require("uuid");
const createError = require("http-errors");

// const { User } = require("../../models/user");
const { sendEmail, createVerifyEmail } = require("../../services/mail");
const { findByIdAndUpdService, findUserByAnyFieldService } = require("../../services/db/auth/authServices");

const checkingEmailCTRL = async (req, res) => {
  const { checkingToken } = req.params;
  const verificationToken = v4();
  let fieldsForUpdate = {};
  // const user = await User.findOne({ checkingToken });
  // if (!user) {
  //   throw createError(404, `User not found`);
  // }
  // await User.findByIdAndUpdate(user._id, {
  //   checked: true,
  //   checkingToken: "",
  //   verificationToken,
  // });
  //  ========= here will be authServices
  // here we have to find user by the checkingToken
  // const user = await checkingEmailService(checkingToken, verificationToken); // change with findOne
  const field = { checkingToken };
  const user = await findUserByAnyFieldService(field);

  if (!user) {
    throw createError(404, `User not found `);
  }
  const userId = user._id;
  const { name, surname, birthday, email } = user;

  if (user.checked) {
    // in case user.checked=== true ==> admin has already linked by the email link
    throw createError(400, "Checking has already been passed");
  }
  if (user.verify) {
    // in case  user.verify=== true ==>from route 'googleAuth'; in case  user.verify===false ==> signup

    fieldsForUpdate = {
      checked: true,
      checkingToken: "",
    };
    await findByIdAndUpdService(userId, fieldsForUpdate);
    console.log("===checkingEmailCTRL42  fieldsForUpdate=====", fieldsForUpdate); // todo: delete console
    console.log("===checkingEmailCTRL43  userId=====", userId); // todo: delete console.log
    // await User.findByIdAndUpdate(user._id, {
    //   checked: true,
    //   checkingToken: "",
    // });
  } else {
    // in case  user.verify===false ==>  from route 'signup'  here we are sending email to user address with link

    fieldsForUpdate = {
      checked: true,
      checkingToken: "",
      verificationToken,
    };
    console.log("===checkingEmailCTRL56  fieldsForUpdate=====", fieldsForUpdate); // todo: delete console
    console.log("===checkingEmailCTRL57  userId=====", userId); // todo: delete console
    await findByIdAndUpdService(userId, fieldsForUpdate);
    const mail = createVerifyEmail(email, verificationToken, name, surname, birthday);
    await sendEmail(mail);
  }
  // =======================

  res.json({
    response: {
      message: "Checking successful",
    },
  });
};

module.exports = checkingEmailCTRL;
