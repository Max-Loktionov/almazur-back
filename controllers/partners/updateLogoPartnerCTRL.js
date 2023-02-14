const { Partners } = require("../../models/partners");
const createError = require("http-errors");

const updateLogoPartnerCTRL = async (req, res) => {
  try {
    const { id } = req.params;
    // const { path: tempUpload } = req.file;

    // const jimpAvatar = await Jimp.read(tempUpload);
    // await jimpAvatar.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);

    // const uploader = async path => await cloudinary.uploads(path, "petly_dir/avatars");
    // const newPath = await uploader(tempUpload);
    // fs.unlink(req.file.path);

    await Partners.findByIdAndUpdate(
      id,
      { logo: newPath.url },
      {
        new: true,
      }
    );

    res.json({ message: "success", logo: newPath.url });
  } catch (error) {
    await fs.unlink(req.files.logo.filepath);
    throw createError(401, "Not avatar");
  }
};

module.exports = updateLogoPartnerCTRL;
