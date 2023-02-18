const testCTRL = async (req, res) => {
  const testVar = await req;
  console.log("====11===testCTRL3 testVar", testVar);
  res.status(201).json({
    message: "test CTRL",
  });
};

module.exports = testCTRL;
