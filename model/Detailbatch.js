module.exports = {
    insert: function(con, data, callback) {
      //   Convert from string to JSON
        datainsert = JSON.stringify(data.result)
      //   Insert Process
        con.getConnection(function(err, connection) {
            connection.query(`
                INSERT INTO 
                    tm_data 
                SET 
                    child_value = '${datainsert}', 
                    created_by = '${data.id}'
                `, function (error, results) {
                    callback(error, results)
                    connection.destroy()
            });
        })
    },
  
    countdata: function(con, data, callback) {
        if(typeof data.search.value=='undefined'){
            var search = ""
        }else{
            var search = "and JSON_SEARCH(UPPER(tm_data.child_value), 'all', UPPER('%"+data.search.value+"%')) IS NOT NULL"
        }
        con.getConnection(function(err, connection) {
            connection.query(`
            SELECT 
                count(tm_data.child_id) as recordsTotal 
            FROM 
                tm_data 
            WHERE 
                deleted_by = '0' and
                JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'master_detailbatch'
                `+search+`
            `, function (error, results) {
                callback(error, results)
                connection.destroy()
            });
        });
    },

    getfull: function(con, data, callback){
        if(typeof data.search.value=='undefined'){
            var search = ""
        }else{
            var search = "and JSON_SEARCH(UPPER(tm_data.child_value), 'all', UPPER('%"+data.search.value+"%')) IS NOT NULL"
        }
        if(data.length == -1){
            data.length = 1000
        }
        if(typeof data.stock!='undefined'){
            var select = `JSON_UNQUOTE(
                JSON_EXTRACT(tm_barang.child_value, \"$.k10_text\")
            ) as satuan_jual,
            JSON_UNQUOTE(
                JSON_EXTRACT(tm_data.child_value, \"$.k6\")
            ) as kode_batch,`
            var join = `INNER JOIN tm_barang on JSON_UNQUOTE(JSON_EXTRACT(tm_data.child_value, \"$.k2\")) = tm_barang.child_id`
        }else{
            var select = ""
            var join = ""
        }
        if(typeof data.jenisid != 'undefined'){
            var where = "JSON_EXTRACT(tm_data.child_value, \"$.k1\") = '"+data.jenisid+"' and"
        }else{
            var where = ""
        }
        if(typeof data.gudangid != 'undefined'){
            var selectgudangid = `,tm_stock.stock_val, tm_stock.gudang_id, tm_stock_gudang.stock_val as stock_now`
            var joingudangid = `LEFT JOIN tm_stock on tm_data.child_id = tm_stock.batch_id and tm_stock.gudang_id = `+data.gudangid+` and tm_stock.stock_type = '1'
            LEFT JOIN tm_stock as tm_stock_gudang on tm_data.child_id = tm_stock_gudang.batch_id and tm_stock_gudang.gudang_id = `+data.gudangid+` and tm_stock_gudang.stock_type = '0'`
        }else{
            var selectgudangid = ""
            var joingudangid = ""
        }
        con.getConnection(function(err, connection) {
            connection.query(`
                SELECT
                    tm_data.child_id as id,
                    `+select+`
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k1_text\")
                    ) as is0,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k2_text\")
                    ) as is1,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k3_text\")
                    ) as is2,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k4\")
                    ) as is3,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k5\")
                    ) as is4
                    `+selectgudangid+`
                FROM
                    tm_data
                `+join+`
                `+joingudangid+`
                WHERE
                    tm_data.deleted_by = '0' and
                    `+where+`
                    JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'master_detailbatch'
                    `+search+`
                ORDER BY is`+data.order[0].column+` `+data.order[0].dir+`
                LIMIT `+data.length+`
                OFFSET `+data.start+`
            `, function (error, results) {
                callback(error, results)
                connection.destroy()
            });
        });
    },

    view: function(con, data, callback){
        con.getConnection(function(err, connection) {
            connection.query(`
                SELECT
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k1\")
                    ) as k1,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k1_text\")
                    ) as k1_text,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k2\")
                    ) as k2,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k2_text\")
                    ) as k2_text,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k3\")
                    ) as k3,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k3_text\")
                    ) as k3_text,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k4\")
                    ) as k4,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k5\")
                    ) as k5,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k6\")
                    ) as k6
                FROM
                    tm_data
                WHERE
                    deleted_by = '0' and
                    child_id = `+data+`
            `, function (error, results) {
                callback(error, results)
                connection.destroy()
            });
        });
    },

    update: function(con, data, callback) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        var time = today.getHours()+':'+today.getMinutes()+'-'+today.getSeconds()
        //   Convert from string to JSON
        datainsert = JSON.stringify(data.result)
        //   Insert Process
        con.getConnection(function(err, connection) {
            connection.query(`
            UPDATE 
                tm_data 
            SET 
                child_value = '${datainsert}', 
                updated_at = '`+date+' '+time+`',
                updated_by = '${data.id}'
            WHERE
                child_id = '`+data.isid+`'
            `, function (error, results) {
                callback(error, results)
                connection.destroy()
            });
        });
    },

    destroy: function(con, data, callback) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        var time = today.getHours()+':'+today.getMinutes()+'-'+today.getSeconds()
        //   Convert from string to JSON
        datainsert = JSON.stringify(data.result)
        //   Insert Process
        con.getConnection(function(err, connection) {
            connection.query(`
            UPDATE 
                tm_data 
            SET 
                deleted_at = '`+date+' '+time+`',
                deleted_by = '${data.id_update}'
            WHERE
                child_id = '`+data.id+`'
            `, function (error, results) {
                callback(error, results)
                connection.destroy()
            });
        });
    }
  }
  