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
// Gudang
router.get("/gudang", masterdataControllerFrontend.gudangindex)
router.get("/gudang/dashboard", csrfProtection, masterdataControllerFrontend.gudangdashboard)

// Jenis Barang
router.get("/jenisbarang", masterdataControllerFrontend.jenisbarangindex)
router.get("/jenisbarang/dashboard", csrfProtection, masterdataControllerFrontend.jenisbarangdashboard)

// Kelas Terapi
router.get("/kelasterapi", masterdataControllerFrontend.kelasterapiindex)
router.get("/kelasterapi/dashboard", csrfProtection, masterdataControllerFrontend.kelasterapidashboard)

// Kelas Terapi
router.get("/jenisracikan", masterdataControllerFrontend.jenisracikanindex)
router.get("/jenisracikan/dashboard", csrfProtection, masterdataControllerFrontend.jenisracikandashboard)

// Satuan Barang
router.get("/satuanbarang", masterdataControllerFrontend.satuanbarangindex)
router.get("/satuanbarang/dashboard", csrfProtection, masterdataControllerFrontend.satuanbarangdashboard)

// Data Pabrik
router.get("/pabrik", masterdataControllerFrontend.pabrikindex)
router.get("/pabrik/dashboard", csrfProtection, masterdataControllerFrontend.pabrikdashboard)

// Supplier
router.get("/supplier", masterdataControllerFrontend.supplierindex)
router.get("/supplier/dashboard", csrfProtection, masterdataControllerFrontend.supplierdashboard)

// Setting Embalase
router.get("/setting/embalase", apotekControllerFrontend.settingembalase)
router.get("/setting/embalasedashboard", csrfProtection, apotekControllerFrontend.embalasedashboard)

// Setting Embalase
router.get("/setting/hargajual", apotekControllerFrontend.settingharga)
router.get("/setting/hargajualdashboard", csrfProtection, apotekControllerFrontend.hargajualdashboard)

router.get("/barang/:slug", function(req, res){
    res.send(req.params)
})

module.exports = router