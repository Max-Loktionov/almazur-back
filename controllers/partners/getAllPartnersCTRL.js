const { Partners } = require("../../models/partners");

const getAllPartnersCTRL = async (req, res) => {
  const partners = await Partners.find();

  res.json({
    message: "success",
    data: { result: partners },
  });
};

module.exports = getAllPartnersCTRL;
