const Encryption         = require("../../library/encryption")
const Stockmodel        = require("../../model/Stock")
module.exports = {
    stockawal: function(req, res){
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = Encryption.decrypt(req.cookies['cookielogin'].id)

        var resultdata = req.body.result
        let catch_array = []
        for(key in resultdata){
            split_key = key.split(', ')
            split_key[0] = Encryption.decrypt(split_key[0].toString())
            split_key[1] = Encryption.decrypt(split_key[1].toString())
            catch_array.push({
                batch_id : split_key[0],
                gudang_id : split_key[1],
                stock_type : 1,
                value: resultdata[key],
                id_create: req.body.id
            })
        }
        Stockmodel.stockinsert(req.con, catch_array, function(err, result){
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/stockawal')
                return false
            }
        })
    }
}