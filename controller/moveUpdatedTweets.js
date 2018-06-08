module.exports = function (con,callback) {

    console.log("Moving updated tweets to all_tweets table");
    // Moved tweets that are updated on firebae to all_tweets table
    let sql = `INSERT INTO filtered_tweets SELECT * FROM unfiltered_tweets WHERE status='True'` ;
    let sqldel = `DELETE FROM unfiltered_tweets  WHERE status='True'`;

    con.query(sql, function  (error, results, fields) {
        con.query(sqldel, function  (error, reuslts, fields) {
            callback()
        })
    })
};
