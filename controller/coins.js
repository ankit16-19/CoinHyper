module.exports = function (sqldb, callback) {
    // starting database connection
    let db = sqldb();
    // All coins info which are not updated on firebase
    let sql = `SELECT * FROM tweets_timestamp WHERE status IS NULL`;
    db.serialize(function() {
        db.all(sql, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return row ?
                callback(row) :
                console.log(`No Data found`);
        });
        // closing database connection
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });

    });

};