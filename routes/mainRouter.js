const express = require("express")
const router = express.Router()

// Define Controllers Frontend
const loginControllerFrontend = require("../controller/frontend/loginController")
const apotekControllerFrontend = require("../controller/frontend/apotekController")

// Login
router.get("/", loginControllerFrontend.main)
router.get("/login", loginControllerFrontend.index)
router.get("/logout", loginControllerFrontend.index)

// Apotek
router.get("/apotek/topbar", apotekControllerFrontend.topbar)
router.get("/apotek/sidebar", apotekControllerFrontend.sidebar)

router.get("/apotek", apotekControllerFrontend.index)
router.get("/apotek/dashboard", apotekControllerFrontend.dashboard)

module.exports = router