let db = require('./firebase.js').db();
let uniquecoins = require('./uniquecoins');
let newtweet = require('../new_tweet');

module.exports = function (con,callback) {
    // All unique coins
    console.log('Requesting Unique Coins');
    uniquecoins(function(coins) {
        let lastCoin = coins[coins.length - 1];
        console.log('Unique Coins Request complete');
        coins.forEach(coin => {
            // Tweets of unique coin
            newtweet(con, coin, function (tweets) {
                let lastTweet = tweets[tweets.length - 1];
                console.log('getting tweets for the ',coin);
                if(!(tweets.length === 0)){
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
                            );
                            // updating sqldb
                            con.query(`UPDATE unfiltered_tweets SET status='True'  WHERE url = '${tweet.url}'`,function  (error, results, fields) {
                                if(coin ===lastCoin && tweet.url === lastTweet.url){
                                    console.info('firebase update complete');
                                    callback()
                                 }
                            })

                        }else{
                            console.log('tweet empty for ',coin);
                        }
                    })
                }else{
                    console.log('tweet for coin', coin, 'not found');
                    if(coin === lastCoin){
                        console.info('firebase update complete');
                        callback()
                    }
                }
            })
        });
    });
};