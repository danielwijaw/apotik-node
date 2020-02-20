module.exports = {
  getLogin: function(con, data, callback) {
    con.getConnection(function(err, connection) {
        connection.query(`
            SELECT
                tm_data.child_id as id,
                JSON_UNQUOTE(
                    JSON_EXTRACT(tm_data.child_value, \"$.k1\")
                ) as username,
                JSON_UNQUOTE(
                    JSON_EXTRACT(tm_data.child_value, \"$.k2\")
                ) as name,
                JSON_UNQUOTE(
                    JSON_EXTRACT(tm_data.child_value, \"$.k4\")
                ) as user_access
            FROM
                tm_data
            WHERE
                JSON_EXTRACT(tm_data.child_value, \"$.k0\") = 'user_admin' and
                JSON_EXTRACT(tm_data.child_value, \"$.k1\") = `+con.escape(data.username)+` and
                JSON_EXTRACT(tm_data.child_value, \"$.k3\") = `+con.escape(data.password)+` and
                tm_data.deleted_by = '0'
            ORDER BY
                tm_data.child_id DESC
        `, function (error, results) {
            callback(error, results)
            connection.destroy()
        });
    });
  }
}
