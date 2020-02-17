const confignpm = require("../../library/confignpm")
var host = confignpm.base_url()

module.exports = {
    // Base
    gudangindex: function(req, res) {
        site = host+"/gudang/dashboard"
        res.render("apotek/main", { title: 'Master Data Gudang', url: site, base_url: host})
    },

    dashboard: function(req, res) {
        res.render("gudang/dashboard", { base_url: host, csrfToken: req.csrfToken() })
    },
}