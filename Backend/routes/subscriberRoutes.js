const express = require("express")
const router = express.Router()
const { subscribe, getSubscribers } = require("../controllers/subscriberController")
const auth = require("../middleware/authMiddleware")

router.post("/", subscribe)
router.get("/", auth, getSubscribers)

module.exports = router
