const Project = require("../models/Project")
const saveImage = require("../utils/saveImage")
const fs = require("fs")
const path = require("path")

// CREATE PROJECT
exports.create = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" })
  }

  const image = await saveImage(req.file.buffer)
  const project = await Project.create({ ...req.body, image })

  res.status(201).json(project)
}

// GET ALL PROJECTS
exports.getAll = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 })
  res.json(projects)
}

// UPDATE PROJECT
exports.update = async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    return res.status(404).json({ message: "Project not found" })
  }

  // If new image uploaded
  if (req.file && project.image) {
    const oldImagePath = path.join(
      __dirname,
      "..",
      project.image.replace("/", "")
    )

    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath)
    }

    project.image = await saveImage(req.file.buffer)
  }

  project.title = req.body.title || project.title
  project.description = req.body.description || project.description

  await project.save()
  res.json(project)
}

// DELETE PROJECT
exports.remove = async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    return res.status(404).json({ message: "Project not found" })
  }

  if (project.image) {
    const imagePath = path.join(
      __dirname,
      "..",
      project.image.replace("/", "")
    )

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }

  await project.deleteOne()
  res.json({ message: "Project deleted" })
}
