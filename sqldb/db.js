var mysql = require("mysql");

var pool = mysql.createPool({
        connectionLimit : 10,
        host     : 'localhost',
        port     :  3306,
        user     : 'root',
        password : '',
        database : 'cryptov1',
    });

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    console.log('connected')
    callback(err, conn);
  });
};