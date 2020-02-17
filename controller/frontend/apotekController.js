const confignpm = require("../../library/confignpm")
var host = confignpm.base_url()

module.exports = {
    // Base
    index: function(req, res) {
        site = host+"/apotek/dashboard"
        res.render("apotek/main", { title: 'Panel Apotek', url: site, base_url: host})
    },

    dashboard: function(req, res) {
        res.render("apotek/dashboard")
    },

    sidebar: function(req, res) {
        res.render("apotek/sidebar", { base_url: host })
    },

    topbar: function(req, res) {
        var logout_site = host+'/backend/logout'
        res.render("apotek/topbar", { logout: logout_site })
    },
}