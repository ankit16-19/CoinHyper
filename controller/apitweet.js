
module.exports = function (con, coin,callback) {
    let data = {tweets:[]};
    let coinupper = coin.toUpperCase();
//    let sql = `SELECT *  FROM latest_tweets WHERE coin_symbol LIKE '${coin}' AND status='False'`       ; // tweets of a coin
    let sql = `SELECT * FROM unfiltered_tweets WHERE coin_symbol LIKE '${coinupper}' UNION SELECT * from filtered_tweets WHERE coin_symbol LIKE '${coinupper}'`; 
    con.query(sql,function  (error, results, fields) {
        results.forEach(function(row){
            let arr = row.url.split('/');
            let tweetid = arr[arr.length - 1].toString();  
            data.tweets.push({ 
                id: row.ID,
                coin_name       :row.coin_name,
                coin_symbol:    row.coin_symbol,
                coin_handle: row.coin_handle,
                tweet:row.tweet,
                url:row.url,
                date:row.date,
                keyword:row.keyword,
                tweetid:tweetid
            })
        })
        callback(data);
    }) 
};



