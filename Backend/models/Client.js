const mongoose = require("mongoose")

module.exports = mongoose.model(
  "Client",
  new mongoose.Schema(
    {
      name: String,
      designation: String,
      description: String,
      image: String
    },
    { timestamps: true }
  )
)
