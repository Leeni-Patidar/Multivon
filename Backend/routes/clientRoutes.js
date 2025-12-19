const router = require("express").Router()
const auth = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware")
const c = require("../controllers/clientController")

router.get("/", c.getAll)
router.post("/", auth, upload.single("image"), c.create)
router.put("/:id", auth, upload.single("image"), c.update)
router.delete("/:id", auth, c.remove)

module.exports = router
