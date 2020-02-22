const confignpm = require("../../library/confignpm")
const http = require('http');
var host = confignpm.base_url()

module.exports = {
    // Barang
    barang: function(req, res) {
        var param = req.params.slug
        var title = param.replace(new RegExp("_", 'g'), " ")
        var title = confignpm.titleCase(title)
        site = host+"/barangview/"+param
        res.render("apotek/main", { title: title, url: site, base_url: host, slug: param})
    },

    barangview: function(req, yes) {
        var url = host+'/backend/setting?allow=true';
        var param = req.params.slug
        var title = param.replace(new RegExp("_", 'g'), " ")
        var title = confignpm.titleCase(title)
        http.get(url, function(res){

            var body = '';
        
            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                var response = JSON.parse(body);
                yes.render("barang/dashboard", { base_url: host, title: title, slug: param, csrfToken: req.csrfToken(), data: response })
            });
        })
    },
}