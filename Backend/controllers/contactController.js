const Contact = require("../models/Contact")

exports.submitContact = async (req, res) => {
  const contact = await Contact.create(req.body)
  res.status(201).json({ message: "Contact submitted" })
}

exports.getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json(contacts)
}
