module.exports = {
    stockinsert : function(con, data, callback) {
        var insert = ""
        for(key in data){
            insert += "('" +data[key].batch_id+ "', '" +data[key].gudang_id+ "', '" +data[key].stock_type+ "', '" +data[key].value+ "', '" +data[key].id_create+ "'),"
        }
        insert += "STOP"
        insert = insert.split(',STOP')
        insert = insert[0]
        //   Insert Process
          con.getConnection(function(err, connection) {
              connection.query(`
                    INSERT INTO 
                        tm_stock (batch_id, gudang_id, stock_type, stock_val, created_by) VALUES `+insert+` ON DUPLICATE KEY UPDATE batch_id = VALUES(batch_id);
                    `, function (error, results) {
                        callback(error, results)
                        connection.destroy()
              });
          })
    }
}