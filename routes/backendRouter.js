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

// Gudang
router.post("/gudang/create", csrfProtection, masterdataControllerBackend.gudangcreate)
router.post("/gudang/update", csrfProtection, masterdataControllerBackend.gudangupdate)
router.get("/gudang/data", masterdataControllerBackend.gudangdata)
router.get("/gudang/view", masterdataControllerBackend.gudangview)
router.get("/gudang/delete", masterdataControllerBackend.gudangdelete)

// Jenis Barang
router.post("/jenisbarang/create", csrfProtection, masterdataControllerBackend.jenisbarangcreate)
router.post("/jenisbarang/update", csrfProtection, masterdataControllerBackend.jenisbarangupdate)
router.get("/jenisbarang/data", masterdataControllerBackend.jenisbarangdata)
router.get("/jenisbarang/view", masterdataControllerBackend.jenisbarangview)
router.get("/jenisbarang/delete", masterdataControllerBackend.jenisbarangdelete)

// Kelas Terapi
router.post("/kelasterapi/create", csrfProtection, masterdataControllerBackend.kelasterapicreate)
router.post("/kelasterapi/update", csrfProtection, masterdataControllerBackend.kelasterapiupdate)
router.get("/kelasterapi/data", masterdataControllerBackend.kelasterapidata)
router.get("/kelasterapi/view", masterdataControllerBackend.kelasterapiview)
router.get("/kelasterapi/delete", masterdataControllerBackend.kelasterapidelete)

module.exports = router