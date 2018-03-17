module.exports = function (sqldb, callback) {
    let db = sqldb(); // starting database connection
    let sql = `SELECT * FROM latest_tweets`; // All tweets
    db.serialize(function() {
        db.all(sql , (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return row
                ? callback(row)
                : console.log(`No Data found`);
        })
    })
    db.close() // closing database connection
};