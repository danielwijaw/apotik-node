module.exports = {
    // Base
    index: function(req, res) {
        var host = req.protocol+'://'+req.headers.host;
        if(typeof req.cookies['cookielogin'] == 'undefined'){
            res.redirect('/login')
            return false;
        }
        site = host+"/apotek/dashboard"
        res.render("apotek/main", { title: 'Panel Apotek', url: site, base_url: host})
    },

    dashboard: function(req, res) {
        res.render("apotek/dashboard")
    },

    sidebar: function(req, res) {
        var host = req.protocol+'://'+req.headers.host;
        res.render("apotek/sidebar", { base_url: host })
    },

    topbar: function(req, res) {
        var host = req.protocol+'://'+req.headers.host
        var logout_site = host+'/backend/logout'
        res.render("apotek/topbar", { logout: logout_site })
    },
}