const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  year: {
    type: Number,
    required: [true, 'Release year is required'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true,
    enum: {
      values: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi', 'Fantasy', 'Adventure', 'Animation', 'Documentary', 'Crime', 'Mystery', 'War', 'Western', 'Musical', 'Biography', 'History', 'Sport', 'Family'],
      message: 'Please select a valid genre'
    }
  },
  ratings: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating must be at least 0'],
    max: [10, 'Rating cannot be more than 10'],
    validate: {
      validator: function(v) {
        return Number.isFinite(v) && v >= 0 && v <= 10;
      },
      message: 'Rating must be a number between 0 and 10'
    }
  },
  posterImage: {
    type: String,
    required: [true, 'Movie poster image is required'],
    trim: true
  }
}, {
  timestamps: true
});

movieSchema.index({ title: 1 });
movieSchema.index({ genre: 1 });
movieSchema.index({ year: 1 });
movieSchema.index({ ratings: -1 });

module.exports = mongoose.model('Movie', movieSchema);