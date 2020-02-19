module.exports = {
    insert: function(con, data, callback) {
      //   Convert from string to JSON
        datainsert = JSON.stringify(data.result)
      //   Insert Process
        con.query(
          `INSERT INTO tm_data SET 
          child_value = '${datainsert}', 
          created_by = '${data.id}'`,
          callback
        )
    },
  
    countdata: function(con, data, callback) {
        if(typeof data.search.value=='undefined'){
            var search = ""
        }else{
            var search = "and JSON_SEARCH(UPPER(tm_data.child_value), 'all', UPPER('%"+data.search.value+"%')) IS NOT NULL"
        }
        con.query(`
        SELECT 
            count(tm_data.child_id) as recordsTotal 
        FROM 
            tm_data 
        WHERE 
            deleted_by = '0' and
            JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'master_jenisbarang'
            `+search+`
        `, callback)
    },

    getfull: function(con, data, callback){
        if(typeof data.search.value=='undefined'){
            var search = ""
        }else{
            var search = "and JSON_SEARCH(UPPER(tm_data.child_value), 'all', UPPER('%"+data.search.value+"%')) IS NOT NULL"
        }
        con.query(`
        SELECT
            tm_data.child_id as id,
            JSON_UNQUOTE(
                JSON_EXTRACT(tm_data.child_value, \"$.k2\")
            ) as text
        FROM
            tm_data
        WHERE
            deleted_by = '0' and
            JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'master_jenisbarang'
            `+search+`
        ORDER BY text
        LIMIT `+data.length+`
        OFFSET `+data.start+`
        `, callback)
    },

    view: function(con, data, callback){
        con.query(`
        SELECT
            JSON_UNQUOTE(
                JSON_EXTRACT(tm_data.child_value, \"$.k2\")
            ) as text
        FROM
            tm_data
        WHERE
            deleted_by = '0' and
            child_id = `+data+`
        `, callback)
    },

    update: function(con, data, callback) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        var time = today.getHours()+':'+today.getMinutes()+'-'+today.getSeconds()
        //   Convert from string to JSON
        datainsert = JSON.stringify(data.result)
        //   Insert Process
        con.query(
            `UPDATE 
                tm_data SET 
                    child_value = '${datainsert}', 
                    updated_at = '`+date+' '+time+`',
                    updated_by = '${data.id}'
            WHERE
                child_id = '`+data.isid+`'`,
          callback
        )
    },

    destroy: function(con, data, callback) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        var time = today.getHours()+':'+today.getMinutes()+'-'+today.getSeconds()
        console.log(date+' '+time)
        //   Convert from string to JSON
        datainsert = JSON.stringify(data.result)
        //   Insert Process
        con.query(
            `UPDATE 
                tm_data SET 
                    deleted_at = '`+date+' '+time+`',
                    deleted_by = '${data.id_update}'
            WHERE
                child_id = '`+data.id+`'`,
          callback
        )
    }
  }
  