const confignpm = require("../../library/confignpm")
var host = confignpm.base_url()

module.exports = {
    // Gudang
    gudangindex: function(req, res) {
        site = host+"/gudang/dashboard"
        res.render("apotek/main", { title: 'Master Data Gudang', url: site, base_url: host})
    },

    gudangdashboard: function(req, res) {
        res.render("gudang/dashboard", { base_url: host, csrfToken: req.csrfToken() })
    },

    // Jenis Barang
    jenisbarangindex: function(req, res) {
        site = host+"/jenisbarang/dashboard"
        res.render("apotek/main", { title: 'Master Jenis Barang', url: site, base_url: host})
    },

    jenisbarangdashboard: function(req, res) {
        res.render("jenisbarang/dashboard", { base_url: host, csrfToken: req.csrfToken() })
    },

    // Kelas Terapi
    kelasterapiindex: function(req, res) {
        site = host+"/kelasterapi/dashboard"
        res.render("apotek/main", { title: 'Master Data Kelas Terapi', url: site, base_url: host})
    },

    kelasterapidashboard: function(req, res) {
        res.render("kelasterapi/dashboard", { base_url: host, csrfToken: req.csrfToken() })
    },

    // Jenis Racikan
    jenisracikanindex: function(req, res) {
        site = host+"/jenisracikan/dashboard"
        res.render("apotek/main", { title: 'Master Data Jenis Racikan', url: site, base_url: host})
    },

    jenisracikandashboard: function(req, res) {
        res.render("jenisracikan/dashboard", { base_url: host, csrfToken: req.csrfToken() })
    },

    // Satuan Barang
    satuanbarangindex: function(req, res) {
        site = host+"/satuanbarang/dashboard"
        res.render("apotek/main", { title: 'Master Data Satuan Barang', url: site, base_url: host})
    },

    satuanbarangdashboard: function(req, res) {
        res.render("satuanbarang/dashboard", { base_url: host, csrfToken: req.csrfToken() })
    },

    // Data Pabrik
    pabrikindex: function(req, res) {
        site = host+"/pabrik/dashboard"
        res.render("apotek/main", { title: 'Master Data Pabrik', url: site, base_url: host})
    },

    pabrikdashboard: function(req, res) {
        res.render("pabrik/dashboard", { base_url: host, csrfToken: req.csrfToken() })
    },

    // Supplier
    supplierindex: function(req, res) {
        site = host+"/supplier/dashboard"
        res.render("apotek/main", { title: 'Master Data Supplier', url: site, base_url: host})
    },

    supplierdashboard: function(req, res) {
        res.render("supplier/dashboard", { base_url: host, csrfToken: req.csrfToken() })
    },

    // Data Interaksi
    interaksiindex: function(req, res) {
        site = host+"/interaksi/dashboard"
        res.render("apotek/main", { title: 'Master Data Interaksi', url: site, base_url: host})
    },

    interaksidashboard: function(req, res) {
        res.render("interaksi/dashboard", { base_url: host, csrfToken: req.csrfToken() })
    },
}