module.exports = function (db,callback) {
    console.log("Moving updated tweets to all_tweets table");
    // Moved tweets that are updated on firebae to all_tweets table
    let sql = `INSERT INTO all_tweets SELECT * FROM latest_tweets WHERE status='True'` ;
    let sqldel = `DELETE FROM latest_tweets  WHERE status='True'`;
    db.serialize(function() {
        db.run(sql);
        db.run(sqldel, function () {
            console.info('Moving updated coins to all_tweets complete');
            callback();
        })
    });

};