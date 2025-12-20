const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, no token" })
  }

  // ✅ Remove "Bearer "
  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" })
    }

    req.admin = decoded
    next()
  } catch (error) {
    console.error("JWT Error:", error.message)
    res.status(401).json({ message: "Invalid token" })
  }
}
