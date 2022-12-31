
const csvtojson = require('csvtojson');
var mysql = require('mysql');
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "db"
});




dbConn.connect((err) => {
  if (err) return console.error(
    'error: ' + err.message);
  console.log("Connection sucessfull....");

 
});

dbConn.query("DROP TABLE movies",
  (err, drop) => {

    // Query to create table "movies"
    var createStatament =
      "CREATE TABLE movies(tconst char(50), " +
      "titleType char(50), primaryTitle char(99), runtimeMinutes int, genres char(50))"

    // Creating table "movies"
    dbConn.query(createStatament, (err, drop) => {
      if (err)
        console.log("ERROR: ", err);
    });
  });



// CSV file name
const fileName2 = "../movies.csv";

csvtojson().fromFile(fileName2).then(source => {

  // Fetching the data from each row
  // and inserting to the table "movies"
  for (var i = 0; i < source.length; i++) {
    var tconst = source[i]["tconst"],
    titleType = source[i]["titleType"],
    primaryTitle = source[i]["primaryTitle"]
    runtimeMinutes = source[i]["runtimeMinutes"]
    genres = source[i]["genres"]

    var insertStatement =
      `INSERT INTO movies values(?, ?, ?, ?, ?)`;
    var items = [tconst, titleType, primaryTitle, runtimeMinutes, genres];

    // Inserting data of current row
    // into database
    dbConn.query(insertStatement, items,
      (err, results, fields) => {
        if (err) {
          console.log(
            "Unable to insert item at row ");
          return console.log(err);
        }
      });
  }
  console.log(
    "All MOVIES stored into database successfully");


});




module.exports = dbConn;