module.exports = {
    get: function(con, callback) {
        // k1 = Aktifkan Embalase
        // k2 = Pengaturan Embalase per
        // k3 = Embalase Satuan (Rp.)
        // k4 = Embalase Racikan (Rp.)
        // k5 = Aktifkan Harga Jual
        // k6 = Pengaturan PPN (%)
        // k7 = Persentase Penjualan (%)
        con.query(`
            SELECT
                JSON_UNQUOTE(
                    JSON_EXTRACT(tm_data.child_value, \"$.k1\")
                ) as k1, 
                JSON_UNQUOTE(
                    JSON_EXTRACT(tm_data.child_value, \"$.k2\")
                ) as k2,
                JSON_UNQUOTE(
                    JSON_EXTRACT(tm_data.child_value, \"$.k3\")
                ) as k3,
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
                ) as k7
            FROM
                tm_data
            WHERE
                JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'setting'
        `, callback)
    },

    update: function(con, data, callback) {
        //   Convert from string to JSON
        datainsert = JSON.stringify(data.result)
        //   Insert Process
        con.query(
            `UPDATE 
                tm_data SET 
                    child_value = '${datainsert}'
            WHERE
                JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'setting'`,
            callback
        )
    },
  }
  