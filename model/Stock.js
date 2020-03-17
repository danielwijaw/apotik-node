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
    }
}