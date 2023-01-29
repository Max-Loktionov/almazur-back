const getUser = async (req, res) => {
  const { name, surname, email, avatar, birthday, phone } = req.user;

  res.json({
    message: "success",
    data: { result: { name, surname, email, avatar, birthday, phone } },
  });
};

module.exports = getUser;
