const sharp = require("sharp")
const path = require("path")
const fs = require("fs")

module.exports = async (buffer) => {
  // Absolute path to uploads folder
  const uploadDir = path.join(__dirname, "..", "uploads")

  // Create uploads folder if not exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const filename = `img-${Date.now()}.jpg`
  const fullPath = path.join(uploadDir, filename)

  await sharp(buffer)
    .resize(450, 350)
    .jpeg({ quality: 90 })
    .toFile(fullPath)

  // Return path usable in frontend
  return `/${filename}`
}
