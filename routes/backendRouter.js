const express = require("express")
const router = express.Router()
const biodataControllerBackend = require("../controller/backend/biodataController")

// Backend
router.get("/", biodataControllerBackend.index)
router.get("/:id/edit", biodataControllerBackend.edit)
router.post("/", biodataControllerBackend.store)
router.put("/:id", biodataControllerBackend.update)
router.delete("/:id", biodataControllerBackend.destroy)

module.exports = router