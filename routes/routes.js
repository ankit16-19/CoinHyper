// Modules
let sqldb = require('../sqlitedb/db');
let tweets = require('../controller/tweets');
let tweet = require('../controller/tweet');
let coins = require('../controller/coins');
let coin = require('../controller/coin');
let uniqueCoins = require('../controller/firebase/uniquecoins');
let firebaseAllCoins  = require('../controller/firebase/allcoins');
let firebaseTweets = require('../controller/firebase/tweets');


// API Endpoints
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send("Hello")
    });
    // ALL Tweets
    app.get('/tweets', function (req, res) {
        tweets(sqldb,function (tweets) {
            tweets.tweets.reverse();
            res.json(tweets)
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
        firebaseAllCoins(sqldb);
        firebaseTweets(sqldb);
        res.send("updated");
    })
};