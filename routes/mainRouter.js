const express = require("express")
const router = express.Router()
const biodataControllerFronend = require("../controller/frontend/biodataController")

// Frontend
router.get("/", biodataControllerFronend.index)
router.get("/create", biodataControllerFronend.create)
router.get("/:id/edit", biodataControllerFronend.edit)

module.exports = router