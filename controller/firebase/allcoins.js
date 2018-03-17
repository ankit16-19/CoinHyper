let db = require('./firebase.js').db();
let coins = require('../coins');

module.exports = function(sqldb) {
    // All coins
    coins(sqldb, function(coins) {
        // Update each coin in firebase
        coins.forEach(coin => {
            console.log('coin',  ' => ',  coin.coin_name);
            db.collection('AllCoins').doc(coin.coin_symbol).set({
                coin_symbol: coin.coin_symbol,
                coinPage: coin.coin_handle,
                lastUpdate: new Date(coin.date),
                lastupdates: coin.date
                 }, {
                    merge: true
                });
        });
    })
};