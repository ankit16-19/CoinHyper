const sqlite3 = require('sqlite3').verbose();

module.exports = () =>  {
    //Connection to database
    return  new sqlite3.Database('../Cryptohyper-script/crypto_hyper/crypto_tweet_db.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
};
