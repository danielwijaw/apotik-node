
const EncryptionLib     = require("../../library/encryption")
const confignpm         = require("../../library/confignpm")
const async             = require('async');
const Barangmodel       = require("../../model/Barang")

module.exports = {
    create: function(req, res) {
        Barangmodel.countdata
            (req.con, req.query, req.params.slug,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        var code = parseInt(resultnya[0].recordsTotal)+1
                        var split = confignpm.codeCase(req.params.slug)

                        // Attribute Insert
                        req.body.result.k2 = EncryptionLib.decrypt(req.body.result.k2)
                        req.body.result.k3 = EncryptionLib.decrypt(req.body.result.k3)
                        req.body.result.k5 = split+code
                        req.body.result.k9 = EncryptionLib.decrypt(req.body.result.k9)
                        req.body.result.k10 = EncryptionLib.decrypt(req.body.result.k10)

                        // Attribute ID
                        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
                        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)

                        Barangmodel.insert(req.con, req.body, function(err) {
                            if(err){
                                res.send(err)
                                return false
                            }else{
                                res.redirect('/barang/'+req.params.slug)
                                return false
                                res.send(req.body)
                            }
                        })
                    }
                    
                }
            )
    },
    update: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k2 = EncryptionLib.decrypt(req.body.result.k2)
        req.body.result.k3 = EncryptionLib.decrypt(req.body.result.k3)
        req.body.result.k9 = EncryptionLib.decrypt(req.body.result.k9)
        req.body.result.k10 = EncryptionLib.decrypt(req.body.result.k10)
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Update
        Barangmodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/barang/'+req.params.slug)
                return false
            }
        })
    },
    data: function(req, res) {
        if(typeof req.query.q !='undefined'){
            req.query.search.value = req.query.q
        }
        if(typeof req.query.order =='undefined'){
            req.query.order =  {
                0 :{
                    column  : 1,
                    dir     : "DESC"
                }
            }
        }
        async.parallel({
            count: cb => Barangmodel.countdata(req.con, req.query, req.params.slug,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Barangmodel.getfull(req.con, req.query, req.params.slug,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya);
                    }
                    
                }
            )
        },(err, response) => {
            var catchdata = []
            if(err){
                res.send(err)
                return false
            }
            if(typeof req.query.select2!='undefined'){
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    response.data[numplus].id = EncryptionLib.encrypt(response.data[numplus].id.toString())
                    response.data[numplus].text = response.data[numplus].is2
                }
                data = {
                    results: response.data,
                    pagination: {
                        more: false
                    }
                }
            }else if(typeof req.query.stock!='undefined'){
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    catchdata[numplus] = {
                        '0': response.data[numplus].is2,
                        '1': response.data[numplus].is1,
                        '2': response.data[numplus].is4,
                        '3': '0',
                        '4': `
                            <input type="text" class="form-control" name="[`+EncryptionLib.encrypt(response.data[numplus].k2.toString())+` , `+EncryptionLib.encrypt(response.data[numplus].id.toString())+`]">
                            `
                    }
                }
                data = {
                    draw: req.query.draw,
                    status: true,
                    recordsTotal: response.count,
                    recordsFiltered: response.count,
                    data: catchdata
                }
            }else{
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    catchdata[numplus] = {
                        '0': response.data[numplus].is0,
                        '1': response.data[numplus].is1,
                        '2': response.data[numplus].is2,
                        '3': response.data[numplus].is3,
                        '4': response.data[numplus].is4,
                        '5': response.data[numplus].is5,
                        '6': response.data[numplus].is6,
                        '7': response.data[numplus].is7,
                        '8': response.data[numplus].is8,
                        '9': response.data[numplus].is9,
                        '10': response.data[numplus].is10,
                        '11': response.data[numplus].is11,
                        '12': response.data[numplus].is12,
                        '13': `
                            <button data-toggle="modal" data-target="#modal`+req.params.slug+`" onclick="editbarang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                            <button onclick="hapusbarang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
                    }
                }
                data = {
                    draw: req.query.draw,
                    status: true,
                    recordsTotal: response.count,
                    recordsFiltered: response.count,
                    data: catchdata
                }
            }
            res.send(data)
        })
    },
    view: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Get ID
        Barangmodel.view(req.con, req.query.id, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                // Attribute Insert
                rows[0].k2 = EncryptionLib.encrypt(rows[0].k2.toString())
                rows[0].k3 = EncryptionLib.encrypt(rows[0].k3.toString())
                rows[0].k9 = EncryptionLib.encrypt(rows[0].k9.toString())
                rows[0].k10 = EncryptionLib.encrypt(rows[0].k10.toString())
                res.send(rows[0])
                return false
            }
        })
    },
    delete: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_update = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Get ID
        Barangmodel.destroy(req.con, req.query, function(err) {
            res.redirect('/barang/'+req.params.slug)
            return false;
        })
    }
}