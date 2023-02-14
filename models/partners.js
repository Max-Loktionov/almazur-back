const { Schema, model } = require("mongoose");

const partnersSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    description: {
      type: String,
    },
    adress: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    telegram: {
      type: String,
    },
    instagram: {
      type: String,
    },
    logo: {
      type: String,
    },
    link: {
      type: String,
      required: [true],
    },
  },
  { versionKey: false }
);

const Partners = model("partners", partnersSchema);

module.exports = {
  Partners,
};
