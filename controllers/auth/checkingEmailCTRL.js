const { v4 } = require("uuid");

// const { User } = require("../../models/user");
const { sendEmail, createVerifyEmail } = require("../../services/mail");
const { checkingEmailService } = require("../../services/db/auth/authServices");

const checkingEmailCTRL = async (req, res) => {
  const { checkingToken } = req.params;
  const verificationToken = v4();

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
  const user = await checkingEmailService(checkingToken, verificationToken);
  // =======================
  const { name, surname, birthday, email } = user;
  const mail = createVerifyEmail(email, verificationToken, name, surname, birthday);
  await sendEmail(mail);

  res.json({
    response: {
      message: "Checking successful",
    },
  });
};

module.exports = checkingEmailCTRL;
