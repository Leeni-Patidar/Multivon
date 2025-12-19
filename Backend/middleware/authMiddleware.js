// const jwt = require("jsonwebtoken")

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization
//   if (!token) return res.status(401).json({ message: "No token" })

//   try {
//     jwt.verify(token, process.env.JWT_SECRET)
//     next()
//   } catch {
//     res.status(401).json({ message: "Invalid token" })
//   }
// }


const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({ message: "Access denied" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" })
    }

    req.admin = decoded
    next()
  } catch {
    res.status(401).json({ message: "Invalid token" })
  }
}
