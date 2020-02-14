var http = require('http');

module.exports = {
    index: function(req, yes) {
        var host = req.protocol+'://'+req.headers.host;
        var url = host+'/backend';
        http.get(url, function(res){
            
            var body = '';
        
            res.on('data', function(chunk){
                body += chunk;
            });
        
            res.on('end', function(){
                var response = JSON.parse(body);
                yes.render("biodata/index", { data: response });
            });
        }).on('error', function(e){
            console.log("Got an error: ", e);
        });
    },

    create: function(req, res) {
        res.render("biodata/create")
    },

    edit: function(req, yes) {
        var host = req.protocol+'://'+req.headers.host;
        var url = host+'/biodata/backend/'+req.params.id+'/edit';
        http.get(url, function(res){
            
            var body = '';
        
            res.on('data', function(chunk){
                body += chunk;
            });
        
            res.on('end', function(){
                var response = JSON.parse(body);
                yes.render("biodata/edit", { data: response });
            });
        }).on('error', function(e){
            console.log("Got an error: ", e);
        });
    },
}