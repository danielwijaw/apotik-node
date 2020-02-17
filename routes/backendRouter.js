const express = require("express")
const router = express.Router()

const csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })

// Define Controllers Backend
const loginControllerBackend = require("../controller/backend/loginController")
const masterdataControllerBackend = require("../controller/backend/masterdataController")

// Backend
router.post("/login", csrfProtection, loginControllerBackend.login)
router.get("/logout", loginControllerBackend.logout)

router.post("/gudang/create", csrfProtection, masterdataControllerBackend.gudangcreate)

module.exports = router