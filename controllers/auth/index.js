const signupCTRL = require("./signupCTRL");
const checkingEmailCTRL = require("./checkingEmailCTRL");
const resendVerifyEmailCTRL = require("./resendVerifyEmailCTRL");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const googleAuthCTRL = require("./googleAuthCTRL");
const testCTRL = require("./testCTRL"); /// it's test only

module.exports = { signupCTRL, resendVerifyEmailCTRL, checkingEmailCTRL, login, logout, getCurrent, googleAuthCTRL, testCTRL };
