const confignpm = require("../../library/confignpm")
var host = confignpm.base_url()

module.exports = {

    // Template
    rencanakebutuhandashboard: function(req, res) {
        res.render("gudang/rencanakebutuhandashboard", { base_url: host, csrfToken: req.csrfToken() })
    },

    // Stock Awal
    rencanakebutuhanindex: function(req, res) {
        site = host+"/rencanakebutuhan/dashboard"
        res.render("apotek/main", { title: 'Rencana Kebutuhan', url: site, base_url: host})
    }
}