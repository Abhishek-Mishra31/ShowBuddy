// Movie genres (matching backend validation)
export const MOVIE_GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Romance',
  'Thriller',
  'Sci-Fi',
  'Fantasy',
  'Adventure',
  'Animation',
  'Documentary',
  'Crime',
  'Mystery',
  'War',
  'Western',
  'Musical',
  'Biography',
  'History',
  'Sport',
  'Family'
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'title', label: 'Title' },
  { value: 'year', label: 'Year' },
  { value: 'genre', label: 'Genre' },
  { value: 'ratings', label: 'Rating' },
  { value: 'createdAt', label: 'Date Added' },
];

// Rating options
export const RATING_OPTIONS = [
  { value: 1, label: '1 - Poor' },
  { value: 2, label: '2 - Fair' },
  { value: 3, label: '3 - Good' },
  { value: 4, label: '4 - Very Good' },
  { value: 5, label: '5 - Excellent' },
  { value: 6, label: '6 - Outstanding' },
  { value: 7, label: '7 - Superb' },
  { value: 8, label: '8 - Fantastic' },
  { value: 9, label: '9 - Masterpiece' },
  { value: 10, label: '10 - Perfect' },
];

// API endpoints
export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:1000/api',
  MOVIES: '/movies',
  HEALTH: '/health',
};

// App constants
export const APP_CONFIG = {
  APP_NAME: 'Movie Manager',
  VERSION: '1.0.0',
  ITEMS_PER_PAGE: 12,
  MAX_TITLE_LENGTH: 100,
  MIN_YEAR: 1900,
  MAX_YEAR: new Date().getFullYear() + 5,
  MIN_RATING: 0,
  MAX_RATING: 10,
};

// Theme colors
export const THEME_COLORS = {
  primary: '#3b82f6',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
};

// Genre colors for visual representation
export const GENRE_COLORS = {
  Action: 'bg-red-100 text-red-800',
  Comedy: 'bg-yellow-100 text-yellow-800',
  Drama: 'bg-purple-100 text-purple-800',
  Horror: 'bg-gray-100 text-gray-800',
  Romance: 'bg-pink-100 text-pink-800',
  Thriller: 'bg-orange-100 text-orange-800',
  'Sci-Fi': 'bg-blue-100 text-blue-800',
  Fantasy: 'bg-indigo-100 text-indigo-800',
  Adventure: 'bg-green-100 text-green-800',
  Animation: 'bg-cyan-100 text-cyan-800',
  Documentary: 'bg-teal-100 text-teal-800',
  Crime: 'bg-red-100 text-red-800',
  Mystery: 'bg-purple-100 text-purple-800',
  War: 'bg-gray-100 text-gray-800',
  Western: 'bg-yellow-100 text-yellow-800',
  Musical: 'bg-pink-100 text-pink-800',
  Biography: 'bg-blue-100 text-blue-800',
  History: 'bg-indigo-100 text-indigo-800',
  Sport: 'bg-green-100 text-green-800',
  Family: 'bg-cyan-100 text-cyan-800',
};