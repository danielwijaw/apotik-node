const Settingmodel = require("../../model/Setting")

module.exports = {
    index: function(req, res) {
        Settingmodel.get(req.con, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                res.send(rows[0])
                return false
            }
        })
    },

    update: function(req, res) {
        Settingmodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/')
                return false
            }
        })
    }
}