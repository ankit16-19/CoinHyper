exports.sendNotification = functions.firestore
  .document('Tweets/{id}')
  .onCreate(event => {
   // id of the tweet created
    let id = event.params.id;
    console.log('created ' , id);
    // details of the tweet
    let data = event.data.data();
    // name and tweet of the new tweet
    let coin_symbol = data.coin_symbol;
    let name = data.coin_name;
    let tweet = data.tweet;
    let keyword = data.keyword;

        const payLoad = {
            notification:{
            title: name + " " + "News",
            body: tweet,
            sound: "default",
            }
        };

    var topicsRef = db.collection('topics');
    var query = topicsRef.where('coin_symbol', '==', coin_symbol.toUpperCase()).get()
        .then(snapshot => {
            console.log(snapshot)
             snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                admin.messaging().sendToTopic(doc.id, payLoad);
            });
             return "test";
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
});


module.exprots = function  (argument) {
    // body...
    let coin_symbol = data.coin_symbol;
    let name = data.coin_name;
    let tweet = data.tweet;
    let keyword = data.keyword;    
    const payLoad = {
        notification:{
        title: name + " " + "News",
        body: tweet,
        sound: "default",
        }
    };
}