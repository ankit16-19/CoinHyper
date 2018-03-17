let db = require('./firebase.js').db();
let uniquecoins = require('./uniquecoins');
let tweet = require('../tweet');

module.exports = function (sqldb) {
    // All unique coins
    uniquecoins(function(coins) {
        coins.forEach(coin => {
            // Tweets of unique coin
            tweet(sqldb, coin, function (tweets) {
                if(tweets){
                    tweets.forEach(tweet => {
                        if(tweet){
                            // split by '/'
                            let arr = tweet.url.split('/');
                            // get last element of the arr => tweet id
                            let id = arr[arr.length - 1].toString();
                            console.log('Updating Coin', '=>', tweet.coin_symbol, '::', 'Coin ID', '=>', id);
                            // updating tweet to firebase
                            db.collection('Tweets').doc(id).set(
                                {
                                    coin_symbol: tweet.coin_symbol,
                                    coin_name:tweet.coin_name,
                                    coin_page: tweet.coin_handle,
                                    tweet: tweet.tweet,
                                    url: tweet.url,
                                    date: new Date(tweet.date),
                                    dates: tweet.date,
                                    keyword:tweet.keyword
                                },
                                {
                                    merge: true
                                }
                            )
                        }else{
                            console.log('tweet empty for ',coin)
                        }
                    })
                }else{
                    console.log('tweet for coin', coin, 'not found');
                }
            })
        })
    });
};