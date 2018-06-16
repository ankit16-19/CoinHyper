module.exports = function (con, callback) {
  let sql =   `SELECT * FROM ico_icons`; // All tweets
  con.query(sql,function  (error, results, fields) {
      callback(results);
  })   
};
