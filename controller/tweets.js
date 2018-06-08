module.exports = function (con, callback) {
    let data = {tweets:[]};
    let sql =   `SELECT DISTINCT ID, url, coin_name, coin_symbol, coin_handle, tweet, date, keyword  
    	        FROM unfiltered_tweets
    	        UNION 
        		SELECT DISTINCT ID, url, coin_name, coin_symbol,  coin_handle, tweet, date, keyword   
        		FROM filtered_tweets 
                ORDER BY date DESC LIMIT 450`; // All tweets
    con.query(sql,function  (error, results, fields) {
        results.forEach(function(row){
            let arr = row.url.split('/');
            let tweetid = arr[arr.length - 1].toString();  
            data.tweets.push({   
                id: row.ID,           
                coin_name  :row.coin_name,
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
