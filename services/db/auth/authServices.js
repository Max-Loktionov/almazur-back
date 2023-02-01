const createError = require("http-errors");

const { User } = require("../../../models/user");

const checkingEmailService = async (checkingToken, verificationToken) => {
  const user = await User.findOne({ checkingToken }); // maybe it can be separate service?

  if (!user) {
    throw createError(404, `User not found`);
  }
  if (user.checked) {
    throw createError(400, "Checking has already been passed");
  }
  await User.findByIdAndUpdate(user._id, {
    checked: true,
    checkingToken: "",
    verificationToken,
  });

  return user;
};

module.exports = {
  checkingEmailService,
};
