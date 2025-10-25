const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

router.get('/', getAllMovies);

router.post('/', createMovie);

router.get('/:id', getMovieById);

router.put('/:id', updateMovie);

router.delete('/:id', deleteMovie);

module.exports = router;