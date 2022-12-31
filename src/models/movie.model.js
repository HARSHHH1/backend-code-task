'use strict';

var dbConn = require('./../../config/db.config');

//Movie object create
var Movie = function (movie) {
  this.tconst = movie.tconst;
  this.titleType = movie.titleType;
  this.primaryTitle = movie.primaryTitle;
  this.runtimeMinutes = movie.runtimeMinutes;
  this.genres = movie.genres;

};


Movie.create = function (newMov, result) {
  dbConn.query("INSERT INTO movies set ?", newMov, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Movie.findById = function (id, result) {
  dbConn.query("Select * from movies where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};
Movie.findAll = function (result) {
  dbConn.query("Select * from movies", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      if(res){
        var top10 = res.sort(function(a, b) { return a.runtimeMinutes < b.runtimeMinutes ? 1 : -1; })
                .slice(0, 10);
      }
      console.log('movie : ', top10);
      result(null, top10);
    }
  });
};
Movie.update = function (id, movie, result) {
  dbConn.query("UPDATE movies SET tconst=?,titleType=?,primaryTitle=?,runtimeMinutes=?,genres=?,WHERE id = ?", [movie.tconst, movie.titleType, movie.primaryTitle, movie.runtimeMinutes, movie.genres, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
Movie.delete = function (id, result) {
  dbConn.query("DELETE FROM movies WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};

module.exports = Movie;
