const createError = require("http-errors");

const { User } = require("../../../models/user");

const signUpService = async (email, newData) => {
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const newUser = await User.create({ ...newData });

  return newUser;
};

const checkingEmailService = async (checkingToken, verificationToken) => {
  const user = await User.findOne({ checkingToken }); // maybe it can be separate service?

  if (!user) {
    throw createError(404, `User not found`);
  }
  if (user.checked) {
    throw createError(400, "Checking has already been passed");
  }
  if (user.verify) {
    await User.findByIdAndUpdate(user._id, {
      checked: true,
      checkingToken: "",
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      checked: true,
      checkingToken: "",
      verificationToken,
    });
  }

  return user;
};

const resendVerifyEmailService = async verificationToken => {
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
  return user;
};

module.exports = {
  signUpService,
  checkingEmailService,
  resendVerifyEmailService,
};
