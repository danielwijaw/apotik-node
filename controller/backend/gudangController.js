const Encryption         = require("../../library/encryption")
const Gudangmodel        = require("../../model/Gudang")
const async             = require('async');

module.exports = {
    rencanakebutuhangetheader: function(req, res){
        req.query.gudang_id = Encryption.decrypt(req.query.gudang_id)
        async.parallel({
            count: cb => Gudangmodel.countdatakebutuhan(req.con, req.query,
                function(err, results) { 
                    if (err){
                        return cb(err);
                    }else{
                        var resultnya = JSON.parse(JSON.stringify(results))
                        cb(undefined, resultnya[0].recordsTotal);
                    }
                    
                }
            ),
            data: cb => Gudangmodel.getfullkebutuhan(req.con, req.query,
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
                switch(response.data[numplus].is4){
                    case '1':
                        response.data[numplus].is4 = 'Terverifikasi'
                        break;
                    case '0':
                        response.data[numplus].is4 = 'Belum Terverifikasi'
                        break;
                    case '2':
                        response.data[numplus].is4 = 'Ditolak'
                        break;
                }

                catchdata[numplus] = {
                    '0': response.data[numplus].is0,
                    '1': response.data[numplus].is1,
                    '2': response.data[numplus].is2,
                    '3': response.data[numplus].is3,
                    '4': response.data[numplus].is4,
                    '5': `<div>
                        <button type="button" onclick="modalchildshow({'k4':'`+response.data[numplus].is0+`'})" class="btn btn-sm btn-primary"><i class="fas fa-fw fa-folder-open"></i></button>
                        <button type="button" onclick="updateheader({'k4': '`+response.data[numplus].is0+`', 'k2': '`+response.data[numplus].is1+`', 'k3': '`+response.data[numplus].is2+`', 'notes': '`+response.data[numplus].is3+`'})" class="btn btn-sm btn-primary"><i class="fas fa-fw fa-edit"></i></button>
                        <button type="button" onclick="deleteheader('`+response.data[numplus].is0+`')" class="btn btn-sm btn-danger"><i class="fas fa-fw fa-trash"></i></button>
                        <!-- <button type="button" class="btn btn-sm btn-primary"><i class="fas fa-fw fa-print"></i></button> -->
                    </div>`
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

    rencanakebutuhanchild: function(req, res){
        Gudangmodel.getsingle(req.con, req.body.nomor_parent, function(err, result){
            if(err){
                res.send(err)
                return false
            }else{
                var data = []
                if(typeof result == 'undefined'){
                    res.send({'status': 200, message: "Header Not Found"})
                }else{
                    if(result.gudang_item == 'null' || result.gudang_item == '' || result.gudang_item == '[]'){
                        data.push({
                            supplier_name : req.body.supplier_name,
                            supplier_id : Encryption.decrypt(req.body.supplier),
                            barang_name : req.body.barang_name,
                            barang_id : Encryption.decrypt(req.body.nama_barang),
                            harga_beli : req.body.harga_beli,
                            kebutuhan : req.body.kebutuhan,
                            diskon : req.body.diskon,
                            ppn : req.body.ppn
                        })
                    }else{
                        data = JSON.parse(result.gudang_item)
                        data.push({
                            supplier_name : req.body.supplier_name,
                            supplier_id : Encryption.decrypt(req.body.supplier),
                            barang_name : req.body.barang_name,
                            barang_id : Encryption.decrypt(req.body.nama_barang),
                            harga_beli : req.body.harga_beli,
                            kebutuhan : req.body.kebutuhan,
                            diskon : req.body.diskon,
                            ppn : req.body.ppn
                        })
                    }
                    Gudangmodel.updatesingle(req.con, data, req.body.nomor_parent, function(err, result){
                        if(err){
                            res.send(err)
                            return false
                        }else{
                            res.send({"status": 200, message: "Inserting Data Success"})
                        }
                    })
                    
                }
            }
        })
    },

    rencanakebutuhanheader: function(req, res){
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.body.id = Encryption.decrypt(req.cookies['cookielogin'].id)
        var status_approve = 0
        if(req.cookies['cookielogin'].role == 'Administrator'){
            status_approve = 1
        }
        var today = new Date()

        if(req.body.nomor_rencana == 'Auto Generate'){
            Gudangmodel.getnumber(req.con, function(err, result){
                if(err){

                    res.send(err)
                    return false

                }else{
                    if(typeof result[0]=='undefined'){

                        datapush = {
                            gudang_detail   : {
                                k0 : Encryption.decrypt(req.body.gudang.id.toString()),
                                k1 : req.body.gudang.name,
                                k2 : req.body.plan_date,
                                k3 : req.body.required_date,
                                k4 : "1/"+today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear(),
                                k5 : status_approve
                            },
                            notes           : req.body.notes,
                            id              : req.body.id
                        }

                    }else{

                        var number = result[0].date
                        var number = number.split("/")
                        var number = number[0]
                        var number = parseInt(number)
                        datapush = {
                            gudang_detail   : {
                                k0 : Encryption.decrypt(req.body.gudang.id.toString()),
                                k1 : req.body.gudang.name,
                                k2 : req.body.plan_date,
                                k3 : req.body.required_date,
                                k4 : (number+1)+"/"+today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear(),
                                k5 : status_approve
                            },
                            notes           : req.body.notes,
                            id              : req.body.id
                        }

                    }
                    Gudangmodel.insertheaderkebutuhan(req.con, datapush, function(err, result){
                        if(err){
                            res.send(err)
                            return false
                        }else{
                            res.send({status: 200, message: "success", data: JSON.parse(gudang_detail)})
                            return false
                        }
                    })
                }
            })
        }else{
            datapush = {
                gudang_detail   : {
                    k0 : Encryption.decrypt(req.body.gudang.id.toString()),
                    k1 : req.body.gudang.name,
                    k2 : req.body.plan_date,
                    k3 : req.body.required_date,
                    k4 : req.body.nomor_rencana,
                    k5 : status_approve
                },
                notes           : req.body.notes,
                id              : req.body.id
            }
            Gudangmodel.updateheaderkebutuhan(req.con, datapush, req.body.nomor_rencana, function(err, result){
                if(err){
                    res.send(err)
                    return false
                }else{
                    res.send({status: 200, message: "success", data: JSON.parse(gudang_detail)})
                    return false
                }
            })
        }
    },

    getchildrenkebutuhan: function(req, res){
        Gudangmodel.getsingle(req.con, req.query.number, function(err, result){
            if(err){
                res.send(err)
                return false
            }else{
                catchdata = []
                if(result.gudang_item == 'null' || result.gudang_item == '' || result.gudang_item == '[]'){
                    catchdata[0] = {
                        '0': 'NULL',
                        '1': 'NULL',
                        '2': 'NULL',
                        '3': 'NULL',
                        '4': 'NULL',
                        '5': 'NULL',
                        '6': 'NULL',
                    }
                    data = {
                        draw: req.query.draw,
                        status: true,
                        recordsTotal: 0,
                        recordsFiltered: 0,
                        data: catchdata
                    }
                }else{
                    data = JSON.parse(result.gudang_item)
                    for(var numplus = 0, len = data.length; numplus < len; numplus++){
                        catchdata[numplus] = {
                            '0': data[numplus].supplier_name,
                            '1': data[numplus].barang_name,
                            '2': data[numplus].harga_beli,
                            '3': data[numplus].kebutuhan,
                            '4': data[numplus].diskon,
                            '5': data[numplus].ppn,
                            '6': `<button onclick='deletebarangdetail("`+req.query.number+`", "`+data[numplus].barang_name+`")' class="btn btn-sm btn-danger"><i class="fas fa-fw fa-trash"></i></button>`,
                        }
                    }

                    data = {
                        draw: req.query.draw,
                        status: true,
                        recordsTotal: data.length,
                        recordsFiltered: data.length,
                        data: catchdata
                    }
                }
                res.send(data)
            }
        })
    },

    rencanakebutuhangetdel: function(req, res){
        // Attribute ID
        req.cookies['cookielogin']  = JSON.parse(req.cookies['cookielogin'])
        req.query.id_deleted = Encryption.decrypt(req.cookies['cookielogin'].id)
        Gudangmodel.deleteheaderkebutuhan(req.con, req.query.number, req.query.id_deleted, function(err, result){
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/rencanakebutuhan/')
                return false
            }
        })
    },

    rencanakebutuhanchilddel: function(req, res){
        // Attribute ID
        Gudangmodel.deletechildkebutuhan(req.con, req.query.barang, req.query.number, function(err, result){
            if(err){
                res.send(err)
                return false
            }else{
                res.redirect('/rencanakebutuhan/')
                return false
            }
        })
    }
}