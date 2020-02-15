const express = require("express")
const router = express.Router()

// Define Controllers Backend
const loginControllerBackend = require("../controller/backend/loginController")

// Backend
router.post("/login", loginControllerBackend.login)

module.exports = router