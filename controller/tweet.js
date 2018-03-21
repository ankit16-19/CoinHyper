module.exports = function (sqldb, coin,callback) {
     let db = sqldb;
    let sql = `SELECT *                 
	       FROM latest_tweets WHERE coin_symbol LIKE '${coin}' AND status='False'`       ; // tweets of a coin
    db.serialize(function() {
        db.all(sql , (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return row
                ? callback(row)
                : console.log(`No Data found`);
        });
    });

};