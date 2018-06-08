module.exports = function (con, coin, callback) {
    let sql = `SELECT * FROM coins WHERE coin_symbol LIKE '${coin}'`; // coin info
    con.query(sql, function  (error, results, fields) {
        if(error) throw error;
        callback(results);
    })
};