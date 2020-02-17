module.exports = {
    index: function(req, res) {
        if(typeof req.cookies['cookielogin'] !== 'undefined'){
            res.redirect('/apotek')
        }else{
            if (req.query.error == 1) { 
                var error = "Gagal Login , Username atau Password Salah"
            }else{
                error = ""
            }
            res.render("login/login", { title: 'Login Administrator!', reporting: error, csrfToken: req.csrfToken()})
        }
    },

    main: function(req, res) {
        if(typeof req.cookies['cookielogin'] !== 'undefined'){
            res.redirect('/apotek')
            return false
        }else{
            res.redirect('/login')
            return false
        }
    }
}