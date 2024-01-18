const mongoose = require("mongoose");

const orderInfo = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    companyPhoneNumber: {
      type: Number,
    },

    contactPersonPhoneNumber: {
      type: Number,
      required: true,
    },

    companyEmail: {
      type: String,
    },

    contactPersonEmail: {
      type: String,
      required: true,
    },

    requiredTests: {
      type: [String],
      required: true,
    },

    totalAmount: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderInfo);
