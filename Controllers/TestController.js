const Test = require("../Models/Tests");

const addTest = async (req, res) => {
  // Our add logic starts here
  try {
    // Get user input
    const { testName, testPrice, status, outputs } = req.body;

    // Validate user input
    if (!(testName && testPrice && status && outputs && Array.isArray(outputs))) {
      res.status(400).send("All input is required and 'outputs' should be an array");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldTest = await Test.findOne({ testName });

    if (oldTest) {
      res.status(409).send("Test Already Exist. Please choose another name");
      return -1;
    }

    // Create user in our database
    const test = new Test({
      testName,
      testPrice,
      status, 
      outputs,
    });

    await test.save();

    // return new user
    res.status(201).json({ test });
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json({
      tests,
    });
    res.status(200);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTest = async (req, res) => {

  const { id } = req.params;
  const { testName, testPrice, status, outputs } = req.body;

  try {

      const updatedTest = ({
        testName, testPrice, outputs, status, 
          _id: id
      });
      await Test.findByIdAndUpdate(id, updatedTest, { new: true });
      res.json(updatedTest);
  }
  catch (err) {

      res.status(400).json({ message: err.message });
  }
}

const getTestById = async (req, res) => {

  const id = req.params.id;

  try {

      const tests = await Test.findById(id);
      res.status(200).json(tests);
  }
  catch (err) {

      res.status(400).json({ message: err.message });
  }
}

module.exports = { addTest, getTests, updateTest, getTestById };
