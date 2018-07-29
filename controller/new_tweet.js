
module.exports = function (con, coin,callback) {
    let sql = `SELECT *  FROM unfiltered_tweets WHERE coin_symbol LIKE '${coin}' AND status='False' AND date>CURDATE() - INTERVAL 1 DAY;`       ; // tweets of a coin
    con.query(sql, function  (error, results, fields) {
        if(error) throw error;
        callback(results)
    })

};
