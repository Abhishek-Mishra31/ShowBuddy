const Movie = require('../models/Movie');

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to fetch movies'
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Error fetching movie:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to fetch movie'
    });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, year, genre, ratings } = req.body;
    
    const existingMovie = await Movie.findOne({ title, year });
    if (existingMovie) {
      return res.status(400).json({
        success: false,
        message: 'Movie with this title and year already exists'
      });
    }
    
    const movie = await Movie.create({
      title,
      year,
      genre,
      ratings
    });
    
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: movie
    });
  } catch (error) {
    console.error('Error creating movie:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to create movie'
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { title, year, genre, ratings } = req.body;
    
    let movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    if (title && year) {
      const existingMovie = await Movie.findOne({ 
        title, 
        year, 
        _id: { $ne: req.params.id } 
      });
      if (existingMovie) {
        return res.status(400).json({
          success: false,
          message: 'Another movie with this title and year already exists'
        });
      }
    }
    
    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, year, genre, ratings },
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      data: movie
    });
  } catch (error) {
    console.error('Error updating movie:', error);
    

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to update movie'
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    await Movie.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully',
      data: movie
    });
  } catch (error) {
    console.error('Error deleting movie:', error);
    

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error - Unable to delete movie'
    });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};