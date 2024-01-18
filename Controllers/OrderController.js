const Order = require("../Models/Orders");

const addOrder = async (req, res) => {
  // Our add logic starts here
  try {
    // Get user input
    const {
      customerId,
      customerName,
      companyPhoneNumber,
      contactPersonPhoneNumber,
      companyEmail,
      contactPersonEmail,
      requiredTests,
      totalAmount,
      status,
    } = req.body;

    // Validate user input
    if (
      !(
        customerId &&
        customerName &&
        companyPhoneNumber &&
        contactPersonPhoneNumber &&
        companyEmail &&
        contactPersonEmail &&
        totalAmount &&
        status &&
        requiredTests &&
        Array.isArray(requiredTests)
      )
    ) {
      res
        .status(400)
        .send("All input is required and 'required tests' should be an array");
    }

    // check if user already exist
    // Validate if user exist in our database
    // const oldTest = await Test.findOne({ testName });

    // if (oldTest) {
    //   res.status(409).send("Test Already Exist. Please choose another name");
    //   return -1;
    // }

    // Create user in our database
    const order = new Order({
      customerId,
      customerName,
      companyPhoneNumber,
      contactPersonPhoneNumber,
      companyEmail,
      contactPersonEmail,
      requiredTests,
      totalAmount,
      status,
    });

    await order.save();

    // return new user
    res.status(201).json({ order });
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({
      orders,
    });
    res.status(200);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getOrdersByCustomerId = async (req, res) => {
  const  customerId  = req.params.id;

  try {
    const orders = await Order.find({ customerId: customerId });

    if (orders.length === 0) {
      res
        .status(404)
        .json({ message: "No orders found for the provided customerId" });
    } else {
      res.status(200).json(orders);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {

    const id = req.params.id;

    try {

        const orders = await Order.findById(id);
        res.status(200).json(orders);
    }
    catch (err) {

        res.status(400).json({ message: err.message });
    }
}

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = {
      status,
      _id: id,
    };
    await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addOrder,
  getOrdersByCustomerId,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
