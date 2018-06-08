
module.exports = function (con, coin,callback) {
    let sql = `SELECT *  FROM unfiltered_tweets WHERE coin_symbol LIKE '${coin}' AND status='False'`       ; // tweets of a coin
    con.query(sql, function  (error, results, fields) {
        if(error) throw error;
        callback(results)
    })

};