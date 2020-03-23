module.exports = {
    stockinsert : function(con, data, callback) {
        var insert = ""
        var defaultnya = ""
        for(key in data){
            insert += "('" +data[key].batch_id+ "', '" +data[key].gudang_id+ "', '" +data[key].stock_type+ "', '" +data[key].value+ "', '" +data[key].id_create+ "', '" +data[key].increase_type+ "'),"
            defaultnya += "('" +data[key].batch_id+ "', '" +data[key].gudang_id+ "', '0', '" +data[key].value+ "', '" +data[key].id_create+ "', '3995'),"
        }
        insert += "STOP"
        defaultnya += "STOP"
        insert = insert.split(',STOP')
        defaultnya = defaultnya.split(',STOP')
        insert = insert[0]
        defaultnya = defaultnya[0]
        //   Insert Process
          con.getConnection(function(err, connection) {
              connection.query(`
                    INSERT INTO 
                        tm_stock (batch_id, gudang_id, stock_type, stock_val, created_by, increase_type) VALUES `+insert+`, `+defaultnya+`;
                    `, function (error, results) {
                        callback(error, results)
                        connection.destroy()
              });
          })
    },

    stockopname : function(con, data, callback) {
        var insert = ""
        for(key in data){
            insert += "('" +data[key].batch_id+ "', '" +data[key].gudang_id+ "', '" +data[key].stock_type+ "', '" +data[key].value+ "', '" +data[key].id_create+ "', '" +data[key].increase_type+ "', '" +data[key].approval+ "'),"
        }
        insert += "STOP"
        insert = insert.split(',STOP')
        insert = insert[0]
        //   Insert Process
            con.getConnection(function(err, connection) {
                connection.query(`
                        INSERT INTO 
                            tm_stock (batch_id, gudang_id, stock_type, stock_val, created_by, increase_type, approval) VALUES `+insert+`;
                        `, function (error, results) {
                            callback(error, results)
                            connection.destroy()
                });
            })
    },

    stockapproval : function(con, data, callback) {
        var insert = ""
        var batch_id = ""
        var gudang_id = ""
        for(key in data){
            batch_id += data[key].batch_id+", "
            gudang_id += data[key].gudang_id+", "
            insert += "WHEN (batch_id =" +data[key].batch_id+ " AND gudang_id =" +data[key].gudang_id+ " AND stock_type =0 ) THEN stock_val" +data[key].value+ " "
        }
        insert += "STOP"
        insert = insert.split('STOP')
        insert = insert[0]
        batch_id += "STOP"
        batch_id = batch_id.split(', STOP')
        batch_id = batch_id[0]
        gudang_id += "STOP"
        gudang_id = gudang_id.split(', STOP')
        gudang_id = gudang_id[0]
        //   Insert Process
            con.getConnection(function(err, connection) {
                connection.query(`
                        UPDATE tm_stock
                            SET stock_val = CASE
                                `+insert+`
                            END
                        WHERE
                            stock_type = 0 AND
                            batch_id IN (`+batch_id+`) AND
                            gudang_id IN (`+gudang_id+`)
                        `, function (error, results) {
                            callback(error, results)
                            connection.destroy()
                });
            })
    }
}