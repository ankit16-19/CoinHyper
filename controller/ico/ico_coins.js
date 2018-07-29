module.exports = function (con, callback) {
  let sql =   `SELECT * FROM ico_coins`;
  con.query(sql,function  (error, results, fields) {
      callback(results);
  })   
};
