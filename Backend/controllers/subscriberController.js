const Subscriber = require("../models/Subscriber")

exports.subscribe = async (req, res) => {
  const { email } = req.body
  await Subscriber.create({ email })
  res.status(201).json({ message: "Subscribed successfully" })
}

exports.getSubscribers = async (req, res) => {
  const subs = await Subscriber.find().sort({ createdAt: -1 })
  res.json(subs)
}
