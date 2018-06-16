module.exports = function (con,callback) {
    console.log("Moving updated tweets to all_tweets table");
    // Moved tweets that are updated on firebae to filtered_tweets table
    let sql = `INSERT INTO filtered_tweets (coin_name,coin_handle,coin_symbol,tweet,url,date,keyword,status) SELECT coin_name,coin_handle,coin_symbol, tweet, url, date, keyword, status from unfiltered_tweets where status='True';`
    let sqldel = `DELETE FROM unfiltered_tweets  WHERE status='True'`;

    con.query(sql, function(err1, result1, field1) {
        con.query(sqldel, function  (err2, results2, fields2) {
            callback({err1, err2, result1, results2})
        })
    })
};
