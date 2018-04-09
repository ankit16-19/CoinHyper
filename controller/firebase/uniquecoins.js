let realdb = require('./firebase').realdb();
 let coins = realdb.ref("UniqueCoins");

module.exports = function(callback) {
    coins.once('value')
        .then(snapshot => {
            let data = [];
            snapshot.forEach(doc => {
                data.push(doc.key)
            });
            callback(data)
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
};

