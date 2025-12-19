const mongoose = require("mongoose")

module.exports = mongoose.model(
  "Contact",
  new mongoose.Schema(
    {
      fullName: String,
      email: String,
      mobile: String,
      city: String
    },
    { timestamps: true }
  )
)
