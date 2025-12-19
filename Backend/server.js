const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")

const adminRoutes = require("./routes/adminRoutes")
const projectRoutes = require("./routes/projectRoutes")
const clientRoutes = require("./routes/clientRoutes")
const contactRoutes = require("./routes/contactRoutes")
const subscriberRoutes = require("./routes/subscriberRoutes")

const app = express()
connectDB()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use("/api/admin", adminRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/clients", clientRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/subscriber", subscriberRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
