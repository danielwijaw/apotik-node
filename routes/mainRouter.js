const express = require("express")
const router = express.Router()

// Define Controllers Frontend
const loginControllerFrontend = require("../controller/frontend/loginController")
const apotekControllerFrontend = require("../controller/frontend/apotekController")

// Login
router.get("/", loginControllerFrontend.main)
router.get("/login", loginControllerFrontend.index)

// Apotek
router.get("/apotek", apotekControllerFrontend.index)

module.exports = router