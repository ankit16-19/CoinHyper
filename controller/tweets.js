module.exports = function (sqldb, callback) {
    let db = sqldb(); // starting database connection
    let data = {tweets:[]};
    let sql = `SELECT DISTINCT url, coin_name, coin_symbol, coin_handle, tweet, date, keyword  
			FROM latest_tweets 
			UNION 
		SELECT DISTINCT url, coin_name, coin_symbol,  coin_handle, tweet, date, keyword   
		FROM all_tweets ORDER BY date DESC LIMIT 450`; // All tweets
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
    db.close() // closing database connection
};
