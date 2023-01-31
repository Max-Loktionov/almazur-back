const signupCTRL = require("./signupCTRL");
const checkingEmailCTRL = require("./checkingEmailCTRL");
const resendVerifyEmailCTRL = require("./resendVerifyEmailCTRL");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");

module.exports = { signupCTRL, resendVerifyEmailCTRL, checkingEmailCTRL, login, logout, getCurrent };
