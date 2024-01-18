const mongoose = require("mongoose");

const userInfo = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true, 
    },

    address: {
      type: String,
      required: true, 
    },

    type: {
      type: String,
    },

    companyPhoneNumber: {
      type: Number,
      required: true, 
    },

    companyEmail: {
      type: String,
      required: true, 
      unique: true
    },

    contactPersonName: {
      type: String,
      required: true, 
    },

    contactPersonPhoneNumber: {
      type: Number,
      required: true, 
    },

    contactPersonEmail: {
      type: String,
      required: true, 
      unique: true
    },

    remarks: {
      type: String,
    },

    password: {
      type: String,
      required: true, 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userInfo);
