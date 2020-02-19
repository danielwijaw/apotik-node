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
}