const Gudangmodel = require("../../model/Gudang")
const Jenisbarangmodel = require("../../model/Jenisbarang")
const Kelasterapimodel = require("../../model/Kelasterapi")
const EncryptionLib = require("../../library/encryption")
const async = require('async');

module.exports = {
    // Gudang
    gudangcreate: function(req, res) {
        // Attribute Insert
        req.body.result.k0 = "master_gudang"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(" ", "_")
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Insert
        Gudangmodel.insert(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/gudang')
                return false
                res.send(req.body)
            }
        })
    },
    
    gudangdata: function(req, res){
        async.parallel({
            count: cb => Gudangmodel.countdata(req.con, req.query,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Gudangmodel.getfull(req.con, req.query,
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
            var num = 0;
            response.data.forEach(element => {
                var numplus = num++
                catchdata[numplus] = {
                    '0': response.data[numplus].text,
                    '1': `
                        <button data-toggle="modal" data-target="#modalgudang" onclick="editgudang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                        <button onclick="hapusgudang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
                }
            })
            data = {
                draw: req.query.draw,
                status: true,
                recordsTotal: response.count,
                recordsFiltered: response.count,
                data: catchdata
            }
            res.send(data)
        })
    },

    gudangupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_gudang"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(" ", "_")
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Update
        Gudangmodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/gudang')
                return false
            }
        })
    },

    gudangview: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Get ID
        Gudangmodel.view(req.con, req.query.id, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                res.send(rows[0])
                return false
            }
        })
    },

    gudangdelete: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_update = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Get ID
        Gudangmodel.destroy(req.con, req.query, function(err) {
            res.redirect("/gudang")
            return false;
        })
    },

    // Jenis Barang

    jenisbarangcreate: function(req, res) {
        // Attribute Insert
        req.body.result.k0 = "master_jenisbarang"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(" ", "_")
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Insert
        Jenisbarangmodel.insert(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/jenisbarang')
                return false
                res.send(req.body)
            }
        })
    },
    
    jenisbarangdata: function(req, res){
        async.parallel({
            count: cb => Jenisbarangmodel.countdata(req.con, req.query,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Jenisbarangmodel.getfull(req.con, req.query,
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
            var num = 0;
            response.data.forEach(element => {
                var numplus = num++
                catchdata[numplus] = {
                    '0': response.data[numplus].text,
                    '1': `
                        <button data-toggle="modal" data-target="#modaljenisbarang" onclick="editjenisbarang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                        <button onclick="hapusjenisbarang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
                }
            })
            data = {
                draw: req.query.draw,
                status: true,
                recordsTotal: response.count,
                recordsFiltered: response.count,
                data: catchdata
            }
            res.send(data)
        })
    },

    jenisbarangupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_jenisbarang"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(" ", "_")
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Update
        Jenisbarangmodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/jenisbarang')
                return false
            }
        })
    },

    jenisbarangview: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Get ID
        Jenisbarangmodel.view(req.con, req.query.id, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                res.send(rows[0])
                return false
            }
        })
    },

    jenisbarangdelete: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_update = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Get ID
        Jenisbarangmodel.destroy(req.con, req.query, function(err) {
            res.redirect("/jenisbarang")
            return false;
        })
    },

    // Kelasterapi

    kelasterapicreate: function(req, res) {
        // Attribute Insert
        req.body.result.k0 = "master_kelasterapi"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(" ", "_")
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Insert
        Kelasterapimodel.insert(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/kelasterapi')
                return false
                res.send(req.body)
            }
        })
    },
    
    kelasterapidata: function(req, res){
        async.parallel({
            count: cb => Kelasterapimodel.countdata(req.con, req.query,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Kelasterapimodel.getfull(req.con, req.query,
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
            var num = 0;
            response.data.forEach(element => {
                var numplus = num++
                catchdata[numplus] = {
                    '0': response.data[numplus].text,
                    '1': `
                        <button data-toggle="modal" data-target="#modalkelasterapi" onclick="editkelasterapi('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                        <button onclick="hapuskelasterapi('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
                }
            })
            data = {
                draw: req.query.draw,
                status: true,
                recordsTotal: response.count,
                recordsFiltered: response.count,
                data: catchdata
            }
            res.send(data)
        })
    },

    kelasterapiupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_kelasterapi"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(" ", "_")
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Update
        Kelasterapimodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/kelasterapi')
                return false
            }
        })
    },

    kelasterapiview: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Get ID
        Kelasterapimodel.view(req.con, req.query.id, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                res.send(rows[0])
                return false
            }
        })
    },

    kelasterapidelete: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_update = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Get ID
        Kelasterapimodel.destroy(req.con, req.query, function(err) {
            res.redirect("/kelasterapi")
            return false;
        })
    }
}