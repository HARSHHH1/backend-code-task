'use strict';
const Movie = require('../models/movie.model');

exports.findAll = function(req, res) {
Movie.findAll(function(err, movie) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', movie);
  res.send(movie);
});
};

exports.create = function(req, res) {
const new_movie = new Movie(req.body);  
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Movie.create(new_movie, function(err, movie) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Movie added successfully!",data:movie});
  console.log(movie);
});
}
};
exports.findById = function(req, res) {
Movie.findById(req.params.id, function(err, movie) {
  if (err)
  res.send(err);
  res.json(movie);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Movie.update(req.params.id, new Movie(req.body), function(err, movie) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'Movie successfully updated' });
});
}
};
exports.delete = function(req, res) {
Movie.delete( req.params.id, function(err, movie) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'Movie successfully deleted' });
});
};