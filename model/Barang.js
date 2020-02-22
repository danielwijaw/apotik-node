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
  
    countdata: function(con, data, slug, callback) {
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
                JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'barang_`+slug+`'
                `+search+`
            `, function (error, results) {
                callback(error, results)
                connection.destroy()
            });
        });
    },

    getfull: function(con, data, slug, callback){
        if(typeof data.search.value=='undefined'){
            var search = ""
        }else{
            var search = "and JSON_SEARCH(UPPER(tm_data.child_value), 'all', UPPER('%"+data.search.value+"%')) IS NOT NULL"
        }
        con.getConnection(function(err, connection) {
            connection.query(`
                SELECT
                    tm_data.child_id as id,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k2_text\")
                    ) as "is0",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k5\")
                    ) as "is1",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k6\")
                    ) as "is2",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k9_text\")
                    ) as "is3",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k10_text\")
                    ) as "is4",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k11\")
                    ) as "is5",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k4\")
                    ) as "is6",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k3_text\")
                    ) as "is7",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k1\")
                    ) as "is8",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k17\")
                    ) as "is9",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k12\")
                    ) as "is10",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k16\")
                    ) as "is11",
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k8\")
                    ) as "is12"
                FROM
                    tm_data
                WHERE
                    deleted_by = '0' and
                    JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'barang_`+slug+`'
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
                        JSON_EXTRACT(tm_data.child_value, \"$.k0\")
                    ) as k0,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k1\")
                    ) as k1,
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
                    ) as k6,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k7\")
                    ) as k7,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k8\")
                    ) as k8,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k9\")
                    ) as k9,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k9_text\")
                    ) as k9_text,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k10\")
                    ) as k10,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k10_text\")
                    ) as k10_text,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k11\")
                    ) as k11,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k12\")
                    ) as k12,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k13\")
                    ) as k13,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k14\")
                    ) as k14,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k15\")
                    ) as k15,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k16\")
                    ) as k16,
                    JSON_UNQUOTE(
                        JSON_EXTRACT(tm_data.child_value, \"$.k17\")
                    ) as k17
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
  
    countdata: function(con, data, slug, callback) {
        var search = ""
        con.getConnection(function(err, connection) {
            connection.query(`
            SELECT 
                count(tm_data.child_id) as recordsTotal 
            FROM 
                tm_data 
            WHERE 
                JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'barang_`+slug+`'
                `+search+`
            `, function (error, results) {
                callback(error, results)
                connection.destroy()
            });
        });
    }
  }
  