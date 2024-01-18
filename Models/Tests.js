const mongoose = require("mongoose");

const testInfo = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
      unique: true,
    },

    testPrice: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    outputs: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tests", testInfo);
