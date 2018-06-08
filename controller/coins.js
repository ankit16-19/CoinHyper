module.exports = function (con, callback) {
    // starting database connection
    // All coins info which are not updated on firebase
    let sql = `SELECT * FROM coins`;
    con.query(sql, function  (error, results, fields) {
        if(error) throw error;
        callback(results);
    })

};
