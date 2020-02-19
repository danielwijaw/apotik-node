const Usermodel = require("../../model/User")
const EncryptionLib = require("../../library/encryption")

module.exports = {
    login: function(req, res) {
        req.body.password = EncryptionLib.encrypt(req.body.password)
        Usermodel.getLogin(req.con, req.body, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                if(rows != '' && typeof rows !="undefined"){
                    rows[0].id          = EncryptionLib.encrypt(rows[0].id.toString())
                    rows[0].user_access = EncryptionLib.encrypt(rows[0].user_access.toString())
                    rows = rows[0]
                    res.cookie('cookielogin', JSON.stringify(rows)).redirect('/apotek')
                }else{
                    res.redirect('/login?error=1')
                }
                return false
            }
        })
    },

    logout: function(req, res) {
        res.clearCookie('cookielogin')
        res.redirect('/login')
    }
}