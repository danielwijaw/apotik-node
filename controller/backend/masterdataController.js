const Gudangmodel       = require("../../model/Gudang")
const Jenisbarangmodel  = require("../../model/Jenisbarang")
const Kelasterapimodel  = require("../../model/Kelasterapi")
const Jenisracikanmodel = require("../../model/Jenisracikan")
const Satuanbarangmodel = require("../../model/Satuanbarang")
const Pabrikmodel       = require("../../model/Pabrik")
const Interaksimodel    = require("../../model/Interaksi")
const Suppliermodel     = require("../../model/Supplier")
const Detailbatchmodel  = require("../../model/Detailbatch")
const EncryptionLib     = require("../../library/encryption")
const async             = require('async');

module.exports = {
    // Gudang
    gudangcreate: function(req, res) {
        // Attribute Insert
        req.body.result.k0 = "master_gudang"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(new RegExp(" ", 'g'), "_")
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
            for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                if(typeof req.query.stock != 'undefined'){
                    var button = `<buttton onclick="showgudang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`', '`+response.data[numplus].text+`')" class=\"btn btn-primary btn-md\" style="cursor: pointer"><i class="fas fa-fw fa-folder-open"></i></buttton>`
                }else{
                    var button = `
                    <button data-toggle="modal" data-target="#modalgudang" onclick="editgudang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                    <button onclick="hapusgudang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
                }
                catchdata[numplus] = {
                    '0': response.data[numplus].text,
                    '1': button
                }
            }
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
        req.body.result.k1 = req.body.result.k1.replace(new RegExp(" ", 'g'), "_")
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
        req.body.result.k1 = req.body.result.k1.replace(new RegExp(" ", 'g'), "_")
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
        if(typeof req.query.q !='undefined'){
            req.query.search.value = req.query.q
        }
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
            if(typeof req.query.select2!='undefined'){
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    response.data[numplus].id = EncryptionLib.encrypt(response.data[numplus].id.toString())
                    response.data[numplus].slug = response.data[numplus].text.toLowerCase()
                    response.data[numplus].slug = response.data[numplus].slug.replace(new RegExp(" ", 'g'), "_")
                }
                data = {
                    results: response.data,
                    pagination: false
                }
            }else{
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    catchdata[numplus] = {
                        '0': response.data[numplus].text,
                        '1': `
                            <button data-toggle="modal" data-target="#modaljenisbarang" onclick="editjenisbarang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                            <button onclick="hapusjenisbarang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
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

    jenisbarangupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_jenisbarang"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(new RegExp(" ", 'g'), "_")
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
        req.body.result.k1 = req.body.result.k1.replace(new RegExp(" ", 'g'), "_")
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
        if(typeof req.query.q !='undefined'){
            req.query.search.value = req.query.q
        }
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
            if(typeof req.query.select2!='undefined'){
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    response.data[numplus].id = EncryptionLib.encrypt(response.data[numplus].id.toString())
                }
                data = {
                    results: response.data,
                    pagination: false
                }
            }else{
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    catchdata[numplus] = {
                        '0': response.data[numplus].text,
                        '1': `
                            <button data-toggle="modal" data-target="#modalkelasterapi" onclick="editkelasterapi('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                            <button onclick="hapuskelasterapi('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
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

    kelasterapiupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_kelasterapi"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(new RegExp(" ", 'g'), "_")
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
    },

    // Jenis Racikan
    jenisracikancreate: function(req, res) {
        // Attribute Insert
        req.body.result.k0 = "master_jenisracikan"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(new RegExp(" ", 'g'), "_")
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Insert
        Jenisracikanmodel.insert(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/jenisracikan')
                return false
                res.send(req.body)
            }
        })
    },
    
    jenisracikandata: function(req, res){
        async.parallel({
            count: cb => Jenisracikanmodel.countdata(req.con, req.query,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Jenisracikanmodel.getfull(req.con, req.query,
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
            for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                catchdata[numplus] = {
                    '0': response.data[numplus].text,
                    '1': `
                        <button data-toggle="modal" data-target="#modaljenisracikan" onclick="editjenisracikan('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                        <button onclick="hapusjenisracikan('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
                }
            }
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

    jenisracikanupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_jenisracikan"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(new RegExp(" ", 'g'), "_")
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Update
        Jenisracikanmodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/jenisracikan')
                return false
            }
        })
    },

    jenisracikanview: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Get ID
        Jenisracikanmodel.view(req.con, req.query.id, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                res.send(rows[0])
                return false
            }
        })
    },

    jenisracikandelete: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_update = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Get ID
        Jenisracikanmodel.destroy(req.con, req.query, function(err) {
            res.redirect("/jenisracikan")
            return false;
        })
    },

    // Satuan Barang
    satuanbarangcreate: function(req, res) {
        // Attribute Insert
        req.body.result.k0 = "master_satuanbarang"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(new RegExp(" ", 'g'), "_")
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Insert
        Satuanbarangmodel.insert(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/satuanbarang')
                return false
                res.send(req.body)
            }
        })
    },
    
    satuanbarangdata: function(req, res){
        if(typeof req.query.q !='undefined'){
            req.query.search.value = req.query.q
        }
        async.parallel({
            count: cb => Satuanbarangmodel.countdata(req.con, req.query,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Satuanbarangmodel.getfull(req.con, req.query,
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
                }
                data = {
                    results: response.data,
                    pagination: false
                }
            }else{
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    catchdata[numplus] = {
                        '0': response.data[numplus].text,
                        '1': `
                            <button data-toggle="modal" data-target="#modalsatuanbarang" onclick="editsatuanbarang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                            <button onclick="hapussatuanbarang('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
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

    satuanbarangupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_satuanbarang"
        req.body.result.k1 = req.body.result.k2.toLowerCase()
        req.body.result.k1 = req.body.result.k1.replace(new RegExp(" ", 'g'), "_")
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Update
        Satuanbarangmodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/satuanbarang')
                return false
            }
        })
    },

    satuanbarangview: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Get ID
        Satuanbarangmodel.view(req.con, req.query.id, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                res.send(rows[0])
                return false
            }
        })
    },

    satuanbarangdelete: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_update = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Get ID
        Satuanbarangmodel.destroy(req.con, req.query, function(err) {
            res.redirect("/satuanbarang")
            return false;
        })
    },

    // Data Pabrik
    pabrikcreate: function(req, res) {
        // Attribute Insert
        req.body.result.k0 = "master_pabrik"
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Insert
        Pabrikmodel.insert(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/pabrik')
                return false
                res.send(req.body)
            }
        })
    },
    
    pabrikdata: function(req, res){
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
            count: cb => Pabrikmodel.countdata(req.con, req.query,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Pabrikmodel.getfull(req.con, req.query,
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
            if(typeof req.query.select2 != 'undefined'){
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    response.data[numplus].id = EncryptionLib.encrypt(response.data[numplus].id.toString())
                    response.data[numplus].text = response.data[numplus].is1
                }
                data = {
                    results: response.data,
                    pagination: false
                }
            }else{
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    catchdata[numplus] = {
                        '0': response.data[numplus].is0,
                        '1': response.data[numplus].is1,
                        '2': response.data[numplus].is2,
                        '3': response.data[numplus].is3,
                        '4': response.data[numplus].is4,
                        '5': `
                            <button data-toggle="modal" data-target="#modalpabrik" onclick="editpabrik('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                            <button onclick="hapuspabrik('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
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

    pabrikupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_pabrik"
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Update
        Pabrikmodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/pabrik')
                return false
            }
        })
    },

    pabrikview: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Get ID
        Pabrikmodel.view(req.con, req.query.id, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                res.send(rows[0])
                return false
            }
        })
    },

    pabrikdelete: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_update = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Get ID
        Pabrikmodel.destroy(req.con, req.query, function(err) {
            res.redirect("/pabrik")
            return false;
        })
    },

    // Supplier
    suppliercreate: function(req, res) {
        // Attribute Insert
        req.body.result.k0 = "master_supplier"
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Insert
        Suppliermodel.insert(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/supplier')
                return false
                res.send(req.body)
            }
        })
    },
    
    supplierdata: function(req, res){
        async.parallel({
            count: cb => Suppliermodel.countdata(req.con, req.query,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Suppliermodel.getfull(req.con, req.query,
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
            for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                catchdata[numplus] = {
                    '0': response.data[numplus].is0,
                    '1': response.data[numplus].is1,
                    '2': response.data[numplus].is2,
                    '3': response.data[numplus].is3,
                    '4': response.data[numplus].is4,
                    '5': response.data[numplus].is5,
                    '6': `
                        <button data-toggle="modal" data-target="#modalsupplier" onclick="editsupplier('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                        <button onclick="hapussupplier('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
                }
            }
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

    supplierupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_supplier"
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Update
        Suppliermodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/supplier')
                return false
            }
        })
    },

    supplierview: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Get ID
        Suppliermodel.view(req.con, req.query.id, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                res.send(rows[0])
                return false
            }
        })
    },

    supplierdelete: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_update = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Get ID
        Suppliermodel.destroy(req.con, req.query, function(err) {
            res.redirect("/supplier")
            return false;
        })
    },

    // Interaksi
    interaksicreate: function(req, res) {
        // Attribute Insert
        req.body.result.k0 = "master_interaksi"
        req.body.result.k1 = EncryptionLib.decrypt(req.body.result.k1.toString())
        req.body.result.k2 = EncryptionLib.decrypt(req.body.result.k2.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Insert
        Interaksimodel.insert(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/interaksi')
                return false
                res.send(req.body)
            }
        })
    },
    
    interaksidata: function(req, res){
        async.parallel({
            count: cb => Interaksimodel.countdata(req.con, req.query,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Interaksimodel.getfull(req.con, req.query,
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
            for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                catchdata[numplus] = {
                    '0': response.data[numplus].is0,
                    '1': response.data[numplus].is1,
                    '2': response.data[numplus].is2,
                    '3': `
                        <button data-toggle="modal" data-target="#modalinteraksi" onclick="editinteraksi('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                        <button onclick="hapusinteraksi('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
                }
            }
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

    interaksiupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_interaksi"
        req.body.result.k1 = EncryptionLib.decrypt(req.body.result.k1.toString())
        req.body.result.k2 = EncryptionLib.decrypt(req.body.result.k2.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Update
        Interaksimodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/interaksi')
                return false
            }
        })
    },

    interaksiview: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Get ID
        Interaksimodel.view(req.con, req.query.id, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                rows[0].k1 = EncryptionLib.encrypt(rows[0].k1.toString())
                rows[0].k2 = EncryptionLib.encrypt(rows[0].k2.toString())
                res.send(rows[0])
                return false
            }
        })
    },

    interaksidelete: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_update = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Get ID
        Interaksimodel.destroy(req.con, req.query, function(err) {
            res.redirect("/interaksi")
            return false;
        })
    },

    // Detailbatch
    detailbatchcreate: function(req, res) {
        // Attribute Insert
        req.body.result.k0 = "master_detailbatch"
        req.body.result.k1 = EncryptionLib.decrypt(req.body.result.k1.toString())
        req.body.result.k2 = EncryptionLib.decrypt(req.body.result.k2.toString())
        req.body.result.k3 = EncryptionLib.decrypt(req.body.result.k3.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Insert
        Detailbatchmodel.insert(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/detailbatch')
                return false
                res.send(req.body)
            }
        })
    },
    
    detailbatchdata: function(req, res){
        if(typeof req.query.order =='undefined'){
            req.query.order =  {
                0 :{
                    column  : 1,
                    dir     : "DESC"
                }
            }
        }
        if(typeof req.query.jenisid !='undefined'){
            req.query.jenisid = EncryptionLib.decrypt(req.query.jenisid.toString())
        }
        if(typeof req.query.gudangid !='undefined'){
            req.query.gudangid = EncryptionLib.decrypt(req.query.gudangid.toString())
        }
        async.parallel({
            count: cb => Detailbatchmodel.countdata(req.con, req.query,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Detailbatchmodel.getfull(req.con, req.query,
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
            if(typeof req.query.stock!='undefined'){
                for(var numplus = 0, len = response.data.length; numplus < len; numplus++){
                    if(response.data[numplus].stock_val != null){
                        catchdata[numplus] = {
                            '0': response.data[numplus].is1,
                            '1': response.data[numplus].kode_batch,
                            '2': response.data[numplus].satuan_jual,
                            '3': response.data[numplus].stock_now,
                            '4': `<input type="text" onkeyup="this.value=this.value.replace(/[^\\d]/,'')" class="form-control" value=`+response.data[numplus].stock_val+` readonly>`
                        }
                    }else{
                        catchdata[numplus] = {
                            '0': response.data[numplus].is1,
                            '1': response.data[numplus].kode_batch,
                            '2': response.data[numplus].satuan_jual,
                            '3': response.data[numplus].stock_now,
                            '4': `<input type="text" onkeyup="this.value=this.value.replace(/[^\\d]/,'')" class="form-control resultstokawal" name="result[`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`, `+EncryptionLib.encrypt(req.query.gudangid.toString())+`]">`
                        }
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
                        '5': `
                            <button data-toggle="modal" data-target="#modaldetailbatch" onclick="editdetailbatch('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class="btn btn-primary btn-sm">Edit</button>
                            <button onclick="hapusdetailbatch('`+EncryptionLib.encrypt(response.data[numplus].id.toString())+`')" class=\"btn btn-primary btn-sm\">Delete</button>`
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

    detailbatchupdate: function(req, res) {
        req.body.isid = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute Insert
        req.body.result.k0 = "master_detailbatch"
        req.body.result.k1 = EncryptionLib.decrypt(req.body.result.k1.toString())
        req.body.result.k2 = EncryptionLib.decrypt(req.body.result.k2.toString())
        req.body.result.k3 = EncryptionLib.decrypt(req.body.result.k3.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Update
        Detailbatchmodel.update(req.con, req.body, function(err) {
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/detailbatch')
                return false
            }
        })
    },

    detailbatchview: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Get ID
        Detailbatchmodel.view(req.con, req.query.id, function(err, rows) {
            if(err){
                res.send(err)
                return false
            }else{
                rows[0].k1 = EncryptionLib.encrypt(rows[0].k1.toString())
                rows[0].k2 = EncryptionLib.encrypt(rows[0].k2.toString())
                rows[0].k3 = EncryptionLib.encrypt(rows[0].k3.toString())
                res.send(rows[0])
                return false
            }
        })
    },

    detailbatchdelete: function(req, res) {
        req.query.id = EncryptionLib.decrypt(req.query.id.toString())
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_update = EncryptionLib.decrypt(req.cookies['cookielogin'].id)
        // Get ID
        Detailbatchmodel.destroy(req.con, req.query, function(err) {
            res.redirect("/detailbatch")
            return false;
        })
    },
}