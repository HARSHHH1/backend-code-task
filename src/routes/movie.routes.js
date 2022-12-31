const express = require('express')
const router = express.Router()
const movieController =   require('../controller/movie.controller');
// Retrieve all movie
router.get('/', movieController.findAll);
// Create a new movie
router.post('/', movieController.create);
// Retrieve a single movie with id
router.get('/:id', movieController.findById);
// Update a movie with id
router.put('/:id', movieController.update);
// Delete a movie with id
router.delete('/:id', movieController.delete);
module.exports = router