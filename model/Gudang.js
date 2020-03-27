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
                JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'master_gudang'
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
        con.getConnection(function(err, connection) {
            connection.query(`
                SELECT
                    tm_data.child_id as id,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k2\")
                    ) as text
                FROM
                    tm_data
                WHERE
                    deleted_by = '0' and
                    JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'master_gudang'
                    `+search+`
                ORDER BY text
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
                        JSON_EXTRACT(tm_data.child_value, \"$.k2\")
                    ) as text
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
    },

    getnumber: function(con, callback){
        var today = new Date();
        console.log(today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear())
        con.getConnection(function(err, connection) {
            connection.query(`
                SELECT
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k4\")
                    ) as date
                FROM
                    tm_gudang
                WHERE
                    deleted_by = '0' and
                    JSON_UNQUOTE(JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k4\")) like '%`+today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+`%'
                ORDER BY date DESC
                    `, function (error, results) {
                callback(error, results)
                connection.destroy()
            });
        });
    },

    insertheaderkebutuhan: function(con, data, callback){
        gudang_detail = JSON.stringify(data.gudang_detail)
      //   Insert Process
        con.getConnection(function(err, connection) {
            connection.query(`
                INSERT INTO 
                    tm_gudang 
                SET 
                    gudang_detail = '${gudang_detail}', 
                    created_by = '${data.id}', 
                    notes = '${data.notes}'
                `, function (error, results) {
                    callback(error, results)
                    connection.destroy()
            });
        })
    },

    countdatakebutuhan: function(con, data, callback) {
        if(typeof data.search.value=='undefined'){
            var search = ""
        }else{
            var search = "and (JSON_SEARCH(UPPER(tm_gudang.gudang_detail), 'all', UPPER('%"+data.search.value+"%')) IS NOT NULL OR tm_gudang.notes like '%"+data.search.value+"%') "
        }
        con.getConnection(function(err, connection) {
            connection.query(`
            SELECT 
                count(tm_gudang.gudang_id) as recordsTotal 
            FROM 
                tm_gudang 
            WHERE 
                deleted_by = '0' and
                JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k0\") = '`+data.gudang_id+`'
                `+search+`
            `, function (error, results) {
                callback(error, results)
                connection.destroy()
            });
        });
    },

    getfullkebutuhan: function(con, data, callback){
        if(typeof data.search.value=='undefined'){
            var search = ""
        }else{
            var search = "and (JSON_SEARCH(UPPER(tm_gudang.gudang_detail), 'all', UPPER('%"+data.search.value+"%')) IS NOT NULL OR tm_gudang.notes like '%"+data.search.value+"%') "
        }
        if(data.length == -1){
            data.length = 1000
        }
        con.getConnection(function(err, connection) {
            connection.query(`
                SELECT
                    tm_gudang.gudang_id as id,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k4\")
                    ) as is0,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k2\")
                    ) as is1,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k3\")
                    ) as is2,
                    notes as is3,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k5\")
                    ) as is4
                FROM
                    tm_gudang
                WHERE
                    deleted_by = '0' and
                    JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k0\") = '`+data.gudang_id+`'
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

    getsingle: function(con, data, callback){
        con.getConnection(function(err, connection) {
            connection.query(`
                SELECT
                    tm_gudang.gudang_item, tm_gudang.gudang_id
                FROM
                    tm_gudang
                WHERE
                    deleted_by = '0' and
                    JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k4\") = '`+data+`'
            `, function (error, results) {
                var resultnya = JSON.parse(JSON.stringify(results))
                callback(error, resultnya[0])
                connection.destroy()
            });
        });
    },

    updatesingle: function(con, data, where, callback) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        var time = today.getHours()+':'+today.getMinutes()+'-'+today.getSeconds()
        //   Convert from string to JSON
        datainsert = JSON.stringify(data)
        //   Insert Process
        con.getConnection(function(err, connection) {
            connection.query(`
            UPDATE 
                tm_gudang 
            SET 
                gudang_item = '${datainsert}'
            WHERE
                JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k4\") = '`+where+`'
            `, function (error, results) {
                callback(error, results)
                connection.destroy()
            });
        });
    },

    updateheaderkebutuhan: function(con, data, nomor, callback){
        gudang_detail = JSON.stringify(data.gudang_detail)
        con.getConnection(function(err, connection) {
            connection.query(`
                UPDATE 
                    tm_gudang 
                SET 
                    gudang_detail = '${gudang_detail}', 
                    updated_by = '${data.id}', 
                    notes = '${data.notes}'
                WHERE
                    JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k4\") = '`+nomor+`'
                `, function (error, results) {
                    callback(error, results)
                    connection.destroy()
            });
        })
    },

    deleteheaderkebutuhan: function(con, data, id_deleted, callback){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        var time = today.getHours()+':'+today.getMinutes()+'-'+today.getSeconds()

        con.getConnection(function(err, connection) {
            connection.query(`
                UPDATE 
                    tm_gudang 
                SET 
                    deleted_at = '`+date+' '+time+`', 
                    deleted_by = '`+id_deleted+`'
                WHERE
                    JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k4\") = '`+data+`'
                `, function (error, results) {
                    callback(error, results)
                    connection.destroy()
            });
        })
    },

    deletechildkebutuhan: function(con, data, number, callback){
        con.getConnection(function(err, connection) {
            connection.query(`
                UPDATE 
                    tm_gudang 
                SET 
                    tm_gudang.gudang_item = JSON_REMOVE(tm_gudang.gudang_item, REPLACE(JSON_UNQUOTE(JSON_SEARCH(tm_gudang.gudang_item, 'one', REPLACE('`+data+`', '%20', ' '))), '.barang_name', ''))
                WHERE
                    JSON_EXTRACT(tm_gudang.gudang_detail, \"$.k4\") = '`+number+`'
                `, function (error, results) {
                    callback(error, results)
                    connection.destroy()
            });
        })
    },
  }
  