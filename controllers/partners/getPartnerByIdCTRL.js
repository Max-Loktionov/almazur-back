const { RequestError } = require("../../helpers");
const { Partners } = require("../../models/partners");

const getPartnerByIdCTRL = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw RequestError(404, { message: "please add id" });
  }

  const partners = await Partners.findById(id);

  if (!partners) {
    return res.status(404).json({ message: "partners with such id not found" });
  }

  res.json({
    message: "success",
    data: { result: partners },
  });
};

module.exports = getPartnerByIdCTRL;
