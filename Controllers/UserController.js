const User = require("../Models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var jwtSecret = "mysecrettoken";

const registerUser = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const {
      customerName,
      address,
      type,
      companyPhoneNumber,
      companyEmail,
      contactPersonName,
      contactPersonPhoneNumber,
      contactPersonEmail,
      remarks,
      password,
    } = req.body;

    // Validate user input
    if (
      !(
        customerName &&
        address &&
        type &&
        companyPhoneNumber &&
        companyEmail &&
        contactPersonName &&
        contactPersonPhoneNumber &&
        contactPersonEmail &&
        password
      )
    ) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ contactPersonEmail });

    if (oldUser) {
      res.status(409).send("User Already Exist. Please Login");
      return -1;
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = new User({
      customerName,
      address,
      type,
      companyPhoneNumber,
      companyEmail: companyEmail.toLowerCase(),
      contactPersonName,
      contactPersonPhoneNumber,
      contactPersonEmail: contactPersonEmail.toLowerCase(),
      remarks,
      password: encryptedPassword,
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { user_id: user._id, contactPersonEmail },
      "mysecrettoken",
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

const userLogin = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { contactPersonEmail, password } = req.body;

    // Validate user input
    if (!(contactPersonEmail && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ contactPersonEmail });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, contactPersonEmail },
        "mysecrettoken",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({ token, user });
    } else if (!user) {
      res.status(400).send("Invalid Email");
    }
    res.status(400).send("Invalid password");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      users,
    });
    res.status(200);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {

    const id = req.params.id;

    try {

        const users = await User.findById(id);
        res.status(200).json(users);
    }
    catch (err) {

        res.status(400).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {

    const { id } = req.params;
    const { customerName, address, companyPhoneNumber, companyEmail, contactPersonName, contactPersonPhoneNumber, contactPersonEmail, remarks, password } = req.body;

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    try {

        const updatedUser = ({
            customerName, address, companyPhoneNumber, companyEmail, contactPersonName, contactPersonPhoneNumber, contactPersonEmail, remarks, password: encryptedPassword,
            _id: id
        });
        await User.findByIdAndUpdate(id, updatedUser, { new: true });
        res.json(updatedUser);
    }
    catch (err) {

        res.status(400).json({ message: err.message });
    }
}

module.exports = { registerUser, userLogin, getUsers, getUserById, updateUser };
