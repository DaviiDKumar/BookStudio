'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/SearchPage.css'; // Global styles for the search page
import BookCard, { BookSkeletonCard } from '../../components/BookCard'; // Import BookCard and BookSkeletonCard

const GoogleBooksSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const RESULTS_PER_PAGE = 15; // Number of results to fetch per API call
  const [hasSearched, setHasSearched] = useState(false); // New state to track if a search has been performed

  // Access the API key from environment variables
  const GOOGLE_BOOKS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

  /**
   * Fetches books from the Google Books API.
   * @param {boolean} newSearch - True if this is a new search, false for loading more results.
   */
  const fetchBooks = async (newSearch = false) => {
    setError(null); // Clear any previous errors
    // Set loading state if not already loading or if it's a new search
    if (!loading || newSearch) setLoading(true);
    if (newSearch) setHasSearched(true); // Mark that a search has started

    const trimmedQuery = searchQuery.trim();

    // Validate search query
    if (!trimmedQuery) {
      setError('Please enter a book title or author to search.');
      setLoading(false);
      return;
    }

    // Validate API key configuration
    if (!GOOGLE_BOOKS_API_KEY) {
      setError('Google Books API Key is not configured. Please check your .env.local file and restart the server.');
      setLoading(false);
      return;
    }

    // Determine the starting index for the API request
    const currentStartIndex = newSearch ? 0 : startIndex;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      trimmedQuery
    )}&startIndex=${currentStartIndex}&maxResults=${RESULTS_PER_PAGE}&key=${GOOGLE_BOOKS_API_KEY}`;

    // --- Caching Logic ---
    // Create a unique cache key that includes the query, results per page, and start index
    const cacheKey = `books_search_${trimmedQuery.toLowerCase()}_${RESULTS_PER_PAGE}_${currentStartIndex}`;

    // On a new search, attempt to load results from cache
    if (newSearch) {
      const cachedResults = localStorage.getItem(cacheKey);
      if (cachedResults) {
        try {
          const parsedData = JSON.parse(cachedResults);
          setBooks(parsedData.items || []);
          // Set the next startIndex based on the number of items loaded from cache
          setStartIndex(parsedData.items?.length || 0);
          // Ensure totalItems is from cache, falling back to 0 if not present
          setTotalItems(parsedData.totalItems || 0);
          setLoading(false);
          return; // Exit if data was successfully loaded from cache
        } catch (parseError) {
          console.error('Error parsing cached results:', parseError);
          localStorage.removeItem(cacheKey); // Clear corrupted cache
        }
      }
    }
    // --- End Caching Logic ---

    try {
      const response = await axios.get(apiUrl);
      const newFetchedItems = response.data.items || [];
      const newTotalItems = response.data.totalItems || 0;

      if (newSearch) {
        // For a new search, replace existing books and reset startIndex
        setBooks(newFetchedItems);
        setStartIndex(newFetchedItems.length); // Set startIndex for the next "Load More"
        // Cache the first page of results
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ items: newFetchedItems, totalItems: newTotalItems })
        );
      } else {
        // For "Load More", append new items to the existing list
        setBooks((prevBooks) => [...prevBooks, ...newFetchedItems]);
        setStartIndex((prevIndex) => prevIndex + newFetchedItems.length);
      }

      setTotalItems(newTotalItems);

      // Handle cases where no items are returned despite the API indicating more
      if (newFetchedItems.length === 0 && newTotalItems > 0 && currentStartIndex < newTotalItems) {
        setError(
          'No more results found for this specific page, but the API indicates more exist. Try refining your search or loading more.'
        );
      } else if (newFetchedItems.length === 0 && newSearch) {
        // Clear previous error if any, this handles the "No books found" case for a new search
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      // Provide user-friendly error messages based on the type of error
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with a status other than 2xx
          setError(`Error from Google Books API: ${err.response.status} - ${err.response.data?.error?.message || err.message}`);
        } else if (err.request) {
          // Request was made but no response was received
          setError('Network Error: Could not connect to Google Books API. Please check your internet connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Request setup error: ${err.message}`);
        }
      } else {
        setError(`An unexpected error occurred: ${err.message || 'Unknown error.'}`);
      }
    } finally {
      setLoading(false); // Always stop loading, whether successful or not
    }
  };

  // Handles the initial search button click or Enter key press
  const handleInitialSearch = () => {
    // Reset all states for a fresh search
    setBooks([]);
    setStartIndex(0);
    setTotalItems(0);
    setError(null);
    setHasSearched(false); // Reset hasSearched at the very beginning of a new search
    fetchBooks(true); // Indicate this is a new search
  };

  // Handles the "Load More" button click
  const handleLoadMore = () => {
    // Only load more if not currently loading and there are more results available
    if (!loading && books.length < totalItems) {
      fetchBooks(false); // Indicate this is not a new search
    }
  };

  // Determine visibility of UI elements
  const showLoadMoreButton = !loading && !error && books.length > 0 && books.length < totalItems;
  const showEndOfResultsMessage = !loading && !error && books.length > 0 && books.length >= totalItems;
  const showNoResultsMessage = !loading && !error && books.length === 0 && hasSearched && searchQuery.trim() !== '';


  return (
    <div className="search-page-container">
      <div className="search-content-wrapper">
        <div className="search-hero-section">
          <div className="search-hero-top">
            <div className="search-hero-content">
              <h2 className="main-heading">Let&apos;s find your next favorite E-book!</h2>
              <h6 className="sub-heading">Discover millions of titles from the world&apos;s largest library.</h6>
            </div>
          </div>
          <div className="search-bar-section">
            <input
              type="text"
              className="search-input"
              placeholder="Search for books by title or author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleInitialSearch()}
              disabled={loading} // Disable input while loading
            />
            <button
              className="search-button"
              onClick={handleInitialSearch}
              disabled={loading || searchQuery.trim() === ''} // Disable button if loading or query is empty
            >
              {loading && startIndex === 0 ? 'Searching...' : 'Search Books'}
            </button>
          </div>
        </div>

        {/* New Search Results Header Section */}
        <div className="search-results-header-section">
          {hasSearched && !loading && !error && ( // Only show if a search was performed, not loading, and no error
            books.length > 0 ? (
              <h5 className="results-heading">Books Found for your search </h5>
            ) : (
              // This case is handled by showNoResultsMessage, but if you want a default 'Search Results'
              // even if no books are found after a search, you can uncomment/adjust this.
              // <h2 className="results-heading">Search Results</h2>
              null
            )
          )}
          {!hasSearched && ( // Show "Search Results Here" before any search
            <h5 className="results-heading">your Search Results will be shown Here</h5>
          )}
        </div>


        {/* Display error messages */}
        {error && <div className="error-message">{error}</div>}
        {/* Display no results message only if a search was performed and yielded nothing */}
        {showNoResultsMessage && (
            <p className="message-text message-text-no-results">
                No books found for &quot;{searchQuery}&quot;. Please try a different search.
            </p>
        )}

        {/* Grid to display book results */}
        <div className="book-results-grid">
          {books.map((bookData, index) => (
            <BookCard
              key={`${bookData.id || `no-id-${bookData.volumeInfo?.title || 'untitled'}`}-${startIndex + index}`}
              book={bookData}
            />
          ))}

          {/* Render skeleton cards while loading */}
          {loading &&
            Array.from({ length: books.length > 0 ? 3 : RESULTS_PER_PAGE }).map(
              (_, i) => <BookSkeletonCard key={`skeleton-${i}`} />
            )}
        </div>

        {/* Show Load More button if there are more results to fetch */}
        {showLoadMoreButton && (
          <div className="show-more-section">
            <button onClick={handleLoadMore} className="show-more-button" disabled={loading}>
              {loading ? 'Loading More...' : 'Load More Books ...'}
            </button>
          </div>
        )}

        {/* Show end of results message when all results have been loaded */}
        {showEndOfResultsMessage && (
          <p className="message-text message-text-no-more-results">
            You&apos;ve reached the end of the results for &quot;{searchQuery}&quot;.
          </p>
        )}
      </div>
    </div>
  );
};

export default GoogleBooksSearchPage;