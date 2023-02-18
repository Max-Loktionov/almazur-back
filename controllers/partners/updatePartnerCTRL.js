const { Partners } = require("../../models/partners");
const createError = require("http-errors");

const updatePartnerCTRL = async (req, res) => {
  const { id, properties } = req.params;

  let result = null;
  switch (properties) {
    case "title":
      result = await User.findOneAndUpdate(
        id,
        { title: req.body.title },
        {
          new: true,
          runValidators: true,
        }
      );
      break;

    case "description":
      result = await User.findOneAndUpdate(
        id,
        { description: req.body.description },
        {
          new: true,
          runValidators: true,
        }
      );
      break;

    case "adress":
      result = await User.findOneAndUpdate(
        id,
        { adress: req.body.adress },
        {
          new: true,
          runValidators: true,
        }
      );
      break;

    case "email":
      result = await User.findOneAndUpdate(id, { email: req.body.email });
      break;

    case "telegram":
      result = await User.findOneAndUpdate(id, { telegram: req.body.telegram });
      break;

    case "instagram":
      result = await User.findOneAndUpdate(id, { instagram: req.body.instagram });
      break;

    case "link":
      result = await User.findOneAndUpdate(id, { link: req.body.link });
      break;

    case "phone":
      result = await User.findOneAndUpdate(
        id,
        { phone: req.body.phone },
        {
          new: true,
          runValidators: true,
        }
      );
      break;

    default:
      throw createError(400, "Properties of user not found");
  }

  if (!result) {
    throw createError(404, "User not found");
  }

  res.json({
    message: "success",
    data: result,
  });
};

module.exports = updatePartnerCTRL;
