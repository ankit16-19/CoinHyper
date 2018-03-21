// Modules
let sqldb = require('../sqlitedb/db');
let tweets = require('../controller/tweets');
let tweet = require('../controller/tweet');
let coins = require('../controller/coins');
let coin = require('../controller/coin');
let uniqueCoins = require('../controller/firebase/uniquecoins');
let firebaseAllCoins  = require('../controller/firebase/allcoins');
let firebaseTweets = require('../controller/firebase/tweets');
let moveTweets =  require('../controller/moveUpdatedTweets');


// API Endpoints
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send("Hello")
    });
    // ALL Tweets
    app.get('/tweets', function (req, res) {
        tweets(sqldb,function (t) {
            t.tweets.reverse();
            res.json(t)
        })
    });
    // Tweet data
    app.get('/tweets/:coin_symbol', function (req,res) {
        tweet(sqldb, req.params.coin_symbol, function (tweet) {
            res.json(tweet);
        })
    });
    //All Coins
    app.get('/coins',  function (req, res) {
        coins(sqldb, function (coins) {
            res.json(coins)
        })
    });
    // Coin data
    app.get('/coins/:coin_symbol', function (req,res) {
        coin(sqldb, req.params.coin_symbol, function (coin) {
            res.json(coin);
        })
    });
    // Unique Coins from firebase
    app.get('/uniquecoins', function (req, res) {
        uniqueCoins(function (uniquecoins) {
            res.json(uniquecoins);
        })
    });
    // update all coins and uniquecoins tweet to firebase
    app.get('/update' , function (req, res) {
        let db = sqldb();
        // All coins update to firebase
        // firebaseAllCoins(sqldb);
        // update uniquecoins tweets to firebase;
        firebaseTweets(db, function () {
            moveTweets(db,function () {
                // closing database connection
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Close the database connection:tweets.');
                    res.send("updated");
                });
            })
        });
    })
};
