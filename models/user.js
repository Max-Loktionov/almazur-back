const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleError } = require("../helpers");

const passwordRegex = /^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]{7,32}$/;
const passwordMessage = "Passwords no contain space, min length 7 characters, max 32.";

const userSchema = new Schema(
  {
    password: {
      type: String,
      match: passwordRegex,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      default: "01.01.2010",
    },

    phone: {
      type: String,
      default: "No phone",
    },
    verificationToken: {
      type: String,
      // required: [true, "Verify token is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    dan: {
      type: String,
      enum: ["nub", "semi", "queen"],
      default: "nub",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleError);

const registerJoiSchema = Joi.object({
  password: Joi.string()
    .trim()
    .regex(passwordRegex)
    .required()
    .messages({
      "string.empty": `password must contain value`,
      "string.pattern.base": `${passwordMessage}`,
    }),
  email: Joi.string().trim().email().required().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `email must contain value`,
  }),
  name: Joi.string().trim().required().messages({
    "string.base": `name should be a type of string`,
    "string.empty": `name must contain value`,
  }),
  surname: Joi.string().trim().required().messages({
    "string.base": `surname should be a type of string`,
    "string.empty": `surname must contain value`,
  }),
  phone: Joi.string().empty(""),
  birthday: Joi.string(),
  token: Joi.string(),
});

const loginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const schemasUser = { registerJoiSchema, loginJoiSchema };

const User = model("user", userSchema);

module.exports = { User, schemasUser };
