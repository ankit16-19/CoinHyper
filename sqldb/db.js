var mysql = require("mysql");

var pool = mysql.createPool({
        connectionLimit : 10,
        host     : 'localhost',
        port     :  3306,
        user     : 'root',
        password : 'admin@123',
        database : 'cryptov1',
        charset : 'utf8mb4'
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