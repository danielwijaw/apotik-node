var http = require('http');

module.exports = {
    index: function(req, res) {
        if (req.param("error")== 1) { 
            var error = "Gagal Login , Username atau Password Salah"
        }else{
            error = "";
        }
        res.render("login/login", { title: 'Login Administrator!', reporting: error})
    },
}