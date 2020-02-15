module.exports = {
    index: function(req, res) {
        if(typeof req.cookies['cookielogin'] == 'undefined'){
            res.redirect('/login')
        }else{
            error = "APOTEK SITE"
            res.render("login/login", { title: 'Login Administrator!', reporting: error})
        }
    },
}