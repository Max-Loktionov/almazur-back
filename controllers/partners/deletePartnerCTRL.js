const { RequestError } = require("../../helpers");

const deletePartnerCTRL = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw RequestError(404, "please add id");
  }

  const data = await Notice.findOneAndDelete({ _id: id }, {});

  if (!data) {
    return res.status(404).json({ message: "Partners's notice with such id not found" });
  }

  return res.status(200).json({ message: "successful" });
};

module.exports = deletePartnerCTRL;
