const confignpm = require("../../library/confignpm")
const http = require('http');
var host = confignpm.base_url()
var localhost = confignpm.local_url()

module.exports = {
    // Base
    index: function(req, res) {
        site = host+"/apotek/dashboard"
        res.render("apotek/main", { title: 'Panel Apotek', url: site, base_url: host})
    },

    dashboard: function(req, res) {
        res.render("apotek/dashboard")
    },

    sidebar: function(req, yes) {
        var url = localhost+'/backend/jenisbarang/data?allow=true&search[value]=&length=1000&start=0';
        http.get(url, function(res){
            
            var body = '';
        
            res.on('data', function(chunk){
                body += chunk;
            });
        
            res.on('end', function(){
                var response = JSON.parse(body);
                var num = 0;
                response.data.forEach(element => {
                    var numplus = num++
                    response.data[numplus][1] = response.data[numplus][0].toLowerCase()
                    response.data[numplus][1] = response.data[numplus][1].replace(new RegExp(" ", 'g'), "_")
                    // replace(new RegExp(" ", 'g'), "_") || replace(" ", "_")
                })
                yes.render("apotek/sidebar", { data: response.data, base_url: host });
            });
        }).on('error', function(e){
            console.log("Got an error: ", e);
        });
    },

    topbar: function(req, res) {
        var logout_site = host+'/backend/logout'
        res.render("apotek/topbar", { logout: logout_site })
    },

    // Setting Embalase

    settingembalase: function(req, res) {
        site = host+"/setting/embalasedashboard"
        res.render("apotek/main", { title: 'Panel Apotek', url: site, base_url: host})
    },

    embalasedashboard: function(req, yes) {
        var url = localhost+'/backend/setting?allow=true';
        http.get(url, function(res){
            
            var body = '';
        
            res.on('data', function(chunk){
                body += chunk;
            });
        
            res.on('end', function(){
                var response = JSON.parse(body);
                yes.render("apotek/embalase", { data: response, base_url: host, csrfToken: req.csrfToken() });
            });
        }).on('error', function(e){
            console.log("Got an error: ", e);
        });
    },

    // Setting Harga Jual

    settingharga: function(req, res) {
        site = host+"/setting/hargajualdashboard"
        res.render("apotek/main", { title: 'Panel Apotek', url: site, base_url: host})
    },

    hargajualdashboard: function(req, yes) {
        var url = localhost+'/backend/setting?allow=true';
        http.get(url, function(res){
            
            var body = '';
        
            res.on('data', function(chunk){
                body += chunk;
            });
        
            res.on('end', function(){
                var response = JSON.parse(body);
                yes.render("apotek/hargajual", { data: response, base_url: host, csrfToken: req.csrfToken() });
            });
        }).on('error', function(e){
            console.log("Got an error: ", e);
        });
    },
}