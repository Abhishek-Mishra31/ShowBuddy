import { APP_CONFIG, API_ENDPOINTS } from './constants';

// Format date to readable string
// Build full URL for poster image if backend returns relative path
export const getPosterUrl = (posterImage) => {
  if (!posterImage) return '';
  // If already absolute (http/https or data URI) just return as-is
  if (/^(https?:)?\/\//i.test(posterImage) || posterImage.startsWith('data:')) {
    return posterImage;
  }
  // Build absolute URL using backend host (strip trailing /api from BASE_URL)
  const base = API_ENDPOINTS.BASE_URL.replace(/\/api$/, '');
  const cleaned = posterImage.startsWith('/') ? posterImage.substring(1) : posterImage;
  return `${base}/${cleaned}`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format rating to display with stars
export const formatRating = (rating) => {
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(10 - Math.floor(rating));
  return `${rating}/10 ${stars}`;
};

// Safe star rating function that prevents negative repeat counts
export const getStarRating = (rating, maxStars = 5) => {
  // Ensure rating is a valid number
  const numRating = Number(rating) || 0;
  
  // Normalize rating to the max stars scale (e.g., if rating is out of 10, convert to out of 5)
  const normalizedRating = Math.min(Math.max(numRating, 0), 10) * (maxStars / 10);
  
  const filledStars = Math.floor(normalizedRating);
  const emptyStars = Math.max(0, maxStars - filledStars);
  
  return {
    filled: '★'.repeat(filledStars),
    empty: '☆'.repeat(emptyStars),
    rating: numRating,
    normalizedRating: normalizedRating.toFixed(1)
  };
};

// Get rating color based on value
export const getRatingColor = (rating) => {
  if (rating >= 8) return 'text-green-600';
  if (rating >= 6) return 'text-yellow-600';
  if (rating >= 4) return 'text-orange-600';
  return 'text-red-600';
};

// Validate movie data
export const validateMovieData = (movieData) => {
  const errors = {};

  // Title validation
  if (!movieData.title || movieData.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (movieData.title.length > APP_CONFIG.MAX_TITLE_LENGTH) {
    errors.title = `Title cannot exceed ${APP_CONFIG.MAX_TITLE_LENGTH} characters`;
  }

  // Year validation
  if (!movieData.year) {
    errors.year = 'Year is required';
  } else {
    const year = parseInt(movieData.year);
    if (isNaN(year) || year < APP_CONFIG.MIN_YEAR || year > APP_CONFIG.MAX_YEAR) {
      errors.year = `Year must be between ${APP_CONFIG.MIN_YEAR} and ${APP_CONFIG.MAX_YEAR}`;
    }
  }

  // Genre validation
  if (!movieData.genre || movieData.genre.trim().length === 0) {
    errors.genre = 'Genre is required';
  }

  // Rating validation
  if (movieData.ratings === undefined || movieData.ratings === null || movieData.ratings === '') {
    errors.ratings = 'Rating is required';
  } else {
    const rating = parseFloat(movieData.ratings);
    if (isNaN(rating) || rating < APP_CONFIG.MIN_RATING || rating > APP_CONFIG.MAX_RATING) {
      errors.ratings = `Rating must be between ${APP_CONFIG.MIN_RATING} and ${APP_CONFIG.MAX_RATING}`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random ID (for temporary use)
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Format number with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Get genre badge color
export const getGenreBadgeColor = (genre) => {
  const colors = {
    Action: 'bg-red-100 text-red-800 border-red-200',
    Comedy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Drama: 'bg-purple-100 text-purple-800 border-purple-200',
    Horror: 'bg-gray-100 text-gray-800 border-gray-200',
    Romance: 'bg-pink-100 text-pink-800 border-pink-200',
    Thriller: 'bg-orange-100 text-orange-800 border-orange-200',
    'Sci-Fi': 'bg-blue-100 text-blue-800 border-blue-200',
    Fantasy: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Adventure: 'bg-green-100 text-green-800 border-green-200',
    Animation: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    Documentary: 'bg-teal-100 text-teal-800 border-teal-200',
    Crime: 'bg-red-100 text-red-800 border-red-200',
    Mystery: 'bg-purple-100 text-purple-800 border-purple-200',
    War: 'bg-gray-100 text-gray-800 border-gray-200',
    Western: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Musical: 'bg-pink-100 text-pink-800 border-pink-200',
    Biography: 'bg-blue-100 text-blue-800 border-blue-200',
    History: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Sport: 'bg-green-100 text-green-800 border-green-200',
    Family: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  };
  
  return colors[genre] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// Sort array of objects by key
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    let aValue = a[key];
    let bValue = b[key];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

// Filter array by search term
export const filterBySearch = (array, searchTerm, searchKeys) => {
  if (!searchTerm) return array;
  
  const term = searchTerm.toLowerCase();
  return array.filter(item =>
    searchKeys.some(key =>
      item[key] && item[key].toString().toLowerCase().includes(term)
    )
  );
};