module.exports = function (con,callback) {
    console.log("Moving updated tweets to all_tweets table");
    // Moved tweets that are updated on firebae to filtered_tweets table
    let sql = `INSERT INTO filtered_tweets SELECT * FROM unfiltered_tweets WHERE status='True'` ;
    let sqldel = `DELETE FROM unfiltered_tweets  WHERE status='True'`;

    con.query(sql, function  (error, results, fields) {
        con.query(sqldel, function  (erro2, results2, fields2) {
            callback({results, results2})
        })
    })
};
