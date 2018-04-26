
module.exports = function (sqldb, coin,callback) {
     let db = sqldb;
let data = {tweets:[]};
let coinupper = coin.toUpperCase();
//    let sql = `SELECT *  FROM latest_tweets WHERE coin_symbol LIKE '${coin}' AND status='False'`       ; // tweets of a coin
    let sql = `SELECT * FROM latest_tweets WHERE coin_symbol LIKE '${coinupper}' UNION SELECT * from all_tweets WHERE coin_symbol LIKE '${coinupper}'`; 
    db.serialize(function() {
        db.each(sql , (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            else{
                let arr = row.url.split('/');
                let id = arr[arr.length - 1].toString();
                data.tweets.push({
                    coin_name       :row.coin_name,
                    coin_symbol:    row.coin_symbol,
                    coin_handle: row.coin_handle,
                    tweet:row.tweet,
                    url:row.url,
                    date:row.date,
                    keyword:row.keyword,
                    id:id
                })
            }
        });
        db.all(sql, (err, row) => {callback(data)})
    });

};


