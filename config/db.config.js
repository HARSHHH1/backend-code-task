
// const csvtojson = require('csvtojson');
var mysql = require('mysql');
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "db"
});

dbConn.connect(function(err){
    if(err)
    throw err;
    console.log("Connection sucessfull...."); 

})


module.exports = dbConn;