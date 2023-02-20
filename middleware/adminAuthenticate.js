const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const adminAuthenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);

      if (!user) {
        throw createError(401, "Usear not found");
      }

      if (!token) {
        throw createError(401, "Not authorized");
      }

      if (user.dan !== "queen") {
        throw createError(401, "This's not a Queen");
      }
      req.user = user;
      next();
    } catch (error) {
      throw createError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = adminAuthenticate;
