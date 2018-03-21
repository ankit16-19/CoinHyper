const sqlite3 = require('sqlite3').verbose();

module.exports = () =>  {
    //Connection to database
    let  production = '../Cryptohyper-script/crypto_hyper/crypto_tweet_db.db';
    let  develpment='./sqlitedb/crypto_tweet_db.db';
    return  new sqlite3.Database(production, (err) => {
        console.log('Database connection open');
        if (err) {
            return console.error(err.message);
        }
    });
};
