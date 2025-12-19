const mongoose = require("mongoose")

module.exports = mongoose.model(
  "Project",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      image: String
    },
    { timestamps: true }
  )
)
