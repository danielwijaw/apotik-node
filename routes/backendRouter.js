const express = require("express")
const router = express.Router()

const csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })

// Define Controllers Backend
const loginControllerBackend = require("../controller/backend/loginController")
const masterdataControllerBackend = require("../controller/backend/masterdataController")
const settingControllerBackend = require("../controller/backend/settingController")
const masterbarangControllerBackend = require("../controller/backend/masterbarangController")

// Backend
router.post("/login", csrfProtection, loginControllerBackend.login)
router.get("/logout", loginControllerBackend.logout)

// Setting
router.get("/setting", settingControllerBackend.index)
router.put("/setting", csrfProtection, settingControllerBackend.update)

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

// Jenis Racikan
router.post("/jenisracikan/create", csrfProtection, masterdataControllerBackend.jenisracikancreate)
router.post("/jenisracikan/update", csrfProtection, masterdataControllerBackend.jenisracikanupdate)
router.get("/jenisracikan/data", masterdataControllerBackend.jenisracikandata)
router.get("/jenisracikan/view", masterdataControllerBackend.jenisracikanview)
router.get("/jenisracikan/delete", masterdataControllerBackend.jenisracikandelete)

// Satuan Barang
router.post("/satuanbarang/create", csrfProtection, masterdataControllerBackend.satuanbarangcreate)
router.post("/satuanbarang/update", csrfProtection, masterdataControllerBackend.satuanbarangupdate)
router.get("/satuanbarang/data", masterdataControllerBackend.satuanbarangdata)
router.get("/satuanbarang/view", masterdataControllerBackend.satuanbarangview)
router.get("/satuanbarang/delete", masterdataControllerBackend.satuanbarangdelete)

// Data Pabrik
router.post("/pabrik/create", csrfProtection, masterdataControllerBackend.pabrikcreate)
router.post("/pabrik/update", csrfProtection, masterdataControllerBackend.pabrikupdate)
router.get("/pabrik/data", masterdataControllerBackend.pabrikdata)
router.get("/pabrik/view", masterdataControllerBackend.pabrikview)
router.get("/pabrik/delete", masterdataControllerBackend.pabrikdelete)

// Supplier
router.post("/supplier/create", csrfProtection, masterdataControllerBackend.suppliercreate)
router.post("/supplier/update", csrfProtection, masterdataControllerBackend.supplierupdate)
router.get("/supplier/data", masterdataControllerBackend.supplierdata)
router.get("/supplier/view", masterdataControllerBackend.supplierview)
router.get("/supplier/delete", masterdataControllerBackend.supplierdelete)

// Interaksi
router.post("/interaksi/create", csrfProtection, masterdataControllerBackend.interaksicreate)
router.post("/interaksi/update", csrfProtection, masterdataControllerBackend.interaksiupdate)
router.get("/interaksi/data", masterdataControllerBackend.interaksidata)
router.get("/interaksi/view", masterdataControllerBackend.interaksiview)
router.get("/interaksi/delete", masterdataControllerBackend.interaksidelete)

// Detail Batch
router.post("/detailbatch/create", csrfProtection, masterdataControllerBackend.detailbatchcreate)
router.post("/detailbatch/update", csrfProtection, masterdataControllerBackend.detailbatchupdate)
router.get("/detailbatch/data", masterdataControllerBackend.detailbatchdata)
router.get("/detailbatch/view", masterdataControllerBackend.detailbatchview)
router.get("/detailbatch/delete", masterdataControllerBackend.detailbatchdelete)

// Master Barang
router.post("/barang/:slug/create", csrfProtection, masterbarangControllerBackend.create)
router.post("/barang/:slug/update", csrfProtection, masterbarangControllerBackend.update)
router.get("/barang/:slug/data", masterbarangControllerBackend.data)
router.get("/barang/:slug/view", masterbarangControllerBackend.view)
router.get("/barang/:slug/delete", masterbarangControllerBackend.delete)

module.exports = router