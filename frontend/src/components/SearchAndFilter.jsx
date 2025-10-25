import React, { useMemo } from 'react';
import { useMovies } from '../context/MovieContext';
import { MOVIE_GENRES, SORT_OPTIONS } from '../utils/constants';
import { debounce } from '../utils/helpers';

const SearchAndFilter = () => {
  const {
    movies,
    searchTerm,
    filterGenre,
    sortOptions,
    setSearchTerm,
    setFilterGenre,
    setSortOptions,
    getFilteredMovies,
  } = useMovies();

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((term) => setSearchTerm(term), 300),
    [setSearchTerm]
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleGenreFilter = (genre) => {
    setFilterGenre(genre === filterGenre ? '' : genre);
  };

  const handleSortChange = (field) => {
    const newOrder = sortOptions.field === field && sortOptions.order === 'asc' ? 'desc' : 'asc';
    setSortOptions({ field, order: newOrder });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterGenre('');
    setSortOptions({ field: 'title', order: 'asc' });
  };

  const filteredMovies = getFilteredMovies();
  const hasActiveFilters = searchTerm || filterGenre || sortOptions.field !== 'title' || sortOptions.order !== 'asc';

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search movies by title..."
              defaultValue={searchTerm}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleGenreFilter('')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                !filterGenre
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Genres
            </button>
            {MOVIE_GENRES.slice(0, 6).map(genre => (
              <button
                key={genre}
                onClick={() => handleGenreFilter(genre)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filterGenre === genre
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {genre}
              </button>
            ))}
            
            {/* More Genres Dropdown */}
            {MOVIE_GENRES.length > 6 && (
              <div className="relative group">
                <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 flex items-center gap-1">
                  More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 hidden group-hover:block z-50">
                  <div className="grid grid-cols-2 gap-1 min-w-48 max-h-48 overflow-y-auto">
                    {MOVIE_GENRES.slice(6).map(genre => (
                      <button
                        key={genre}
                        onClick={() => handleGenreFilter(genre)}
                        className={`px-2 py-1 rounded text-sm text-left transition-colors duration-200 ${
                          filterGenre === genre
                            ? 'bg-blue-100 text-blue-800'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sort Options and Clear Filters */}
          <div className="flex items-center gap-4">
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
              <div className="flex gap-1">
                {SORT_OPTIONS.map(option => (
                  <button
                    key={option.field}
                    onClick={() => handleSortChange(option.field)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                      sortOptions.field === option.field
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {option.label}
                    {sortOptions.field === option.field && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          sortOptions.order === 'desc' ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors duration-200"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredMovies.length}</span> of{' '}
              <span className="font-medium">{movies.length}</span> movies
            </p>
            
            {/* Active Filters Display */}
            {(searchTerm || filterGenre) && (
              <div className="flex items-center gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {filterGenre && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Genre: {filterGenre}
                    <button
                      onClick={() => setFilterGenre('')}
                      className="hover:bg-green-200 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;