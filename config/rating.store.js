
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

  dbConn.query("DROP TABLE ratings",
    (err, drop) => {

      // Query to create table "ratings"
      var createStatament =
        "CREATE TABLE ratings(tconst char(50), " +
        "averageRating int, numVotes int)"

      // Creating table "ratings"
      dbConn.query(createStatament, (err, drop) => {
        if (err)
          console.log("ERROR: ", err);
      });
    });
});

// CSV file name
const fileName = "../ratings.csv";

csvtojson().fromFile(fileName).then(source => {

  // Fetching the data from each row
  // and inserting to the table "ratings"
  for (var i = 0; i < source.length; i++) {
    var tconst = source[i]["tconst"],
      averageRating = source[i]["averageRating"],
      numVotes = source[i]["numVotes"]

    var insertStatement =
      `INSERT INTO ratings values(?, ?, ?)`;
    var items = [tconst, averageRating, numVotes];

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
    "All RATINGS stored into database successfully");

});




module.exports = dbConn;