const mongoose = require("mongoose")

module.exports = mongoose.model(
  "Subscriber",
  new mongoose.Schema(
    { email: String },
    { timestamps: true }
  )
)
