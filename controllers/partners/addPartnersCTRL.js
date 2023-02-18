const { Partners } = require("../../models/partners");

const addPartnersCTRL = async (req, res) => {
  const newPartners = await Partners.create(req.body);

  res.status(201).json({
    message: "success",
    data: { result: newPartners },
  });
};

module.exports = addPartnersCTRL;
