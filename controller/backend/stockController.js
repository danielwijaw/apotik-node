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
            if(resultdata[key] != ''){
                catch_array.push({
                    batch_id : split_key[0],
                    gudang_id : split_key[1],
                    stock_type : 1,
                    value: resultdata[key],
                    id_create: req.body.id,
                    increase_type: 1,
                })
            }
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
    },

    stockopname: function(req, res){
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = Encryption.decrypt(req.cookies['cookielogin'].id)

        var status_approve = 0
        if(req.cookies['cookielogin'].role == 'Administrator'){
            status_approve = 1
        }

        var resultdata = req.body.result
        var validationdata = req.body.validation
        let catch_array = []
        let plus_array = []
        let split_key = []
        for(key in resultdata){
            split_key_encrypt = key.split(', ')
            split_key[0] = Encryption.decrypt(split_key_encrypt[0].toString())
            split_key[1] = Encryption.decrypt(split_key_encrypt[1].toString())
            if(validationdata[split_key_encrypt[0]]==1){
                arrayplus = '+'
            }else{
                arrayplus = '-'
            }
            if(resultdata[key] != ''){
                if(status_approve == 1){
                    catch_array.push({
                        batch_id : split_key[0],
                        gudang_id : split_key[1],
                        stock_type : 2,
                        value: resultdata[key],
                        id_create: req.body.id,
                        increase_type: validationdata[split_key_encrypt[0]],
                        approval: status_approve
                    })
                    plus_array.push({
                        batch_id : split_key[0],
                        gudang_id : split_key[1],
                        value: arrayplus+resultdata[key]
                    })
                }
            }
        }
        Stockmodel.stockopname(req.con, catch_array, function(err, result){
            if(err){
                res.send(err)
                return false
            }else{
                if(status_approve == 1){
                    Stockmodel.stockapproval(req.con, plus_array, function(err, result){
                        if(err){
                            res.send(err)
                            return false
                        }else{
                            res.redirect('/stockopname')
                            return false
                        }
                    })
                }else{
                    res.redirect('/stockopname')
                    return false
                }
            }
        })
    }
}