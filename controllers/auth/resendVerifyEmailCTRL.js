const createError = require("http-errors");

const { User } = require("../../models/user");
const { sendEmail, createVerifyEmail } = require("../../helpers");

const resendVerifyEmailCTRL = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(404, `User not found`);
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  // const { name, surname, birthday, email } = user;
  // const mail = createVerifyEmail(email, verificationToken);

  // await sendEmail(mail);

  res.json({
    response: {
      message: "Verification email is successful",
    },
  });
};

module.exports = resendVerifyEmailCTRL;
