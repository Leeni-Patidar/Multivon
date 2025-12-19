const Client = require("../models/Client")
const saveImage = require("../utils/saveImage")
const fs = require("fs")

exports.create = async (req, res) => {
  const image = await saveImage(req.file.buffer)
  const client = await Client.create({ ...req.body, image })
  res.status(201).json(client)
}

exports.getAll = async (req, res) => {
  res.json(await Client.find().sort({ createdAt: -1 }))
}

exports.update = async (req, res) => {
  const client = await Client.findById(req.params.id)
  if (req.file) {
    fs.unlinkSync(client.image.slice(1))
    client.image = await saveImage(req.file.buffer)
  }
  Object.assign(client, req.body)
  await client.save()
  res.json(client)
}

exports.remove = async (req, res) => {
  const client = await Client.findById(req.params.id)
  fs.unlinkSync(client.image.slice(1))
  await client.deleteOne()
  res.json({ message: "Client deleted" })
}
