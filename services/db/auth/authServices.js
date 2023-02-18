const createError = require("http-errors");

const { User } = require("../../../models/user");

const findUserByAnyFieldService = async field => {
  console.log("===authService6  field=====", field); // todo: delete console.log
  const user = await User.findOne(field);
  console.log("===authService8  user=====", user); // todo: delete console.log
  return user;
};

const createUserService = async newData => {
  return await User.create({ ...newData });
};

const findByIdAndUpdService = async (userId, fieldsForUpdate) => {
  // const user = await User.findOne({ checkingToken }); // maybe it can be separate service?

  // if (!user) {
  //   throw createError(404, `User not found`);
  // }
  // if (user.checked) {
  //   throw createError(400, "Checking has already been passed");
  // }
  // if (user.verify) {
  //   await User.findByIdAndUpdate(user._id, {
  //     checked: true,
  //     checkingToken: "",
  //   });
  // } else {
  //   await User.findByIdAndUpdate(user._id, {
  //     checked: true,
  //     checkingToken: "",
  //     verificationToken,
  //   });
  // }
  console.log("===authService37  fieldsForUpdate=====", fieldsForUpdate); // todo: delete console.log
  console.log("===authService38  userId=====", userId); // todo: delete console.log
  await User.findByIdAndUpdate(userId, fieldsForUpdate);

  // return user;
};

const resendVerifyEmailService = async verificationToken => {
  const user = await User.findOne({ verificationToken }); // maybe it can be separate service?
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
  findUserByAnyFieldService,
  createUserService,
  findByIdAndUpdService,
  resendVerifyEmailService,
};
