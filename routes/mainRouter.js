const express = require("express")
const router = express.Router()

// Define Controllers
const loginControllerFrontend = require("../controller/frontend/loginController")
const loginControllerBackend = require("../controller/backend/loginController")

// Frontend
router.get("/login", loginControllerFrontend.index)
router.post("/login", loginControllerBackend.login)

module.exports = router