const express = require("express")
const router = express.Router()


const csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })

// Define Controllers Frontend
const loginControllerFrontend = require("../controller/frontend/loginController")
const apotekControllerFrontend = require("../controller/frontend/apotekController")
const masterdataControllerFrontend = require("../controller/frontend/masterdataController")

// Login
router.get("/", loginControllerFrontend.main)
router.get("/login", csrfProtection, loginControllerFrontend.index)
router.get("/logout", loginControllerFrontend.index)

// Apotek
router.get("/apotek/topbar", apotekControllerFrontend.topbar)
router.get("/apotek/sidebar", apotekControllerFrontend.sidebar)
router.get("/apotek", apotekControllerFrontend.index)
router.get("/apotek/dashboard", apotekControllerFrontend.dashboard)

// Master Data
router.get("/gudang", masterdataControllerFrontend.gudangindex)
router.get("/gudang/dashboard", csrfProtection, masterdataControllerFrontend.dashboard)

module.exports = router