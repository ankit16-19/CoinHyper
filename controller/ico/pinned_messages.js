module.exports = function (con, callback) {
  let sql =   `SELECT * FROM lastest_messages`; // All tweets
  con.query(sql,function  (error, results, fields) {
      callback(results);
  })   
};
