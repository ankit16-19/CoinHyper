let db = require('./firebase.js').db();
 let coins = db.collection('UniqueCoins')

module.exports = function(callback) {
    coins.get()
        .then(snapshot => {
            let data = [];
            snapshot.forEach(doc => {
                data.push(doc.data().coin_symbol)
            });
            callback(data)
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}