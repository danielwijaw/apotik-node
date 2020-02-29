const confignpm = require("../../library/confignpm")
var host = confignpm.base_url()

module.exports = {
    // Template
    stockdashboard: function(req, res) {
        res.render("stock/dashboard", { base_url: host, csrfToken: req.csrfToken() })
    },

    stockgudang: function(req, res) {
        res.render("gudang/dashboard", { base_url: host })
    },

    // Stock Awal
    stockawalindex: function(req, res) {
        site = host+"/stock/dashboard"
        res.render("apotek/main", { title: 'Stock Awal', url: site, base_url: host})
    }
}