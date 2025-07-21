'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { books } from '../utils/data.js'; // Using your provided 'books' data
import ShopProductCard from './ShopProductsCard';
import ShopProductCardSkeleton from './ShopProductCardSkeleton'; // Import the new skeleton component
import '../stylesShopComponent/ShopProducts.css';
import '../stylesShopComponent/ShopProductCardSkeleton.css'; // Import skeleton CSS

// Import MUI Icons
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList'; // Icon for 'show filters'
import CloseIcon from '@mui/icons-material/Close'; // Icon for 'hide filters'


// --- Filter Data Definitions (BASED ON YOUR 'books' DATA) ---

// Dynamically get unique categories from the books data
const uniqueCategories = [...new Set(books.map(book => book.category))];

const predefinedPrices = [
    { label: 'Under $5', min: 0, max: 5 },
    { label: '$5 to $10', min: 5, max: 10 },
    { label: '$10 to $20', min: 10, max: 20 },
    { label: 'Above $20', min: 20, max: Infinity },
];

// Reusable FilterGroup component to handle collapsibility
const FilterGroup = ({ title, options, selectedOptions, onToggle, isCollapsible = true }) => {
    const [isOpen, setIsOpen] = useState(true); // State to manage collapsible section

    return (
        <div className="filter-group">
            <strong onClick={() => isCollapsible && setIsOpen(!isOpen)} className={isCollapsible ? 'collapsible-header' : ''}>
                {title}
                {isCollapsible && (
                    <span className="arrow">
                        {isOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                    </span>
                )}
            </strong>
            {isOpen && (
                <div className="filter-options">
                    {options.map(option => (
                        <label key={option} className="checkbox-option">
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={() => onToggle(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function ShopProducts() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);

    // Pagination states
    const INITIAL_DISPLAY_COUNT = 12;
    const LOAD_MORE_COUNT = 4;
    const [visibleBooksCount, setVisibleBooksCount] = useState(INITIAL_DISPLAY_COUNT);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Mobile filter visibility states
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset visible books count whenever filters change
    useEffect(() => {
        setVisibleBooksCount(INITIAL_DISPLAY_COUNT);
    }, [selectedCategories, selectedPrices]);


    const toggleFilter = (filterType, option, setter) => {
        setter(prev =>
            prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option]
        );
    };

    // Use useMemo to re-calculate filteredBooks only when dependencies change
    // 'books' is not included as a dependency because it's an outer scope constant
    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const inCategory =
                selectedCategories.length === 0 || selectedCategories.includes(book.category);

            const inPrice =
                selectedPrices.length === 0 ||
                selectedPrices.some(label => {
                    const range = predefinedPrices.find(p => p.label === label);
                    return book.price >= range.min && book.price <= range.max;
                });

            return inCategory && inPrice;
        });
    }, [selectedCategories, selectedPrices]); // 'books' removed from dependencies

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleBooksCount(prevCount => prevCount + LOAD_MORE_COUNT);
            setIsLoadingMore(false);
        }, 500); // Simulate network delay
    };

    const activeFiltersCount = selectedCategories.length + selectedPrices.length;

    // Books to display on the current screen
    const booksToDisplay = filteredBooks.slice(0, visibleBooksCount);
    const hasMoreBooks = visibleBooksCount < filteredBooks.length;

    return (
        <section className="shop-container">
            <h2 className='shop-HEADING'>All Books</h2>
            <div className="shop-layout">

                <aside className={`filter-sidebar ${isMobileFilterOpen ? 'filter-sidebar--open' : ''}`}>
                    <h4 className="filter-sidebar-header">
                        Filter ({activeFiltersCount})
                        {isMobileView && (
                            <button
                                className="mobile-filter-toggle"
                                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                                aria-label={isMobileFilterOpen ? "Hide filters" : "Show filters"}
                            >
                                {isMobileFilterOpen ? <CloseIcon /> : <FilterListIcon />}
                            </button>
                        )}
                    </h4>

                    {!isMobileView || isMobileFilterOpen ? (
                        <div className="filter-groups-wrapper">
                            <FilterGroup
                                title="Category"
                                options={uniqueCategories}
                                selectedOptions={selectedCategories}
                                onToggle={(option) => toggleFilter('category', option, setSelectedCategories)}
                            />

                            <FilterGroup
                                title="Price"
                                options={predefinedPrices.map(p => p.label)}
                                selectedOptions={selectedPrices}
                                onToggle={(option) => toggleFilter('price', option, setSelectedPrices)}
                            />
                        </div>
                    ) : null}
                </aside>

                <div className="product-grid">


                    {booksToDisplay.length > 0 ? (
                        booksToDisplay.map(book => (
                            <ShopProductCard key={book.id} book={book} />
                        ))
                    ) : (
                        <p className="no-products-found">No products found matching your filters.</p>
                    )}

                    {isLoadingMore && ( // Show skeletons when loading more
                        Array.from({ length: LOAD_MORE_COUNT }).map((_, index) => (
                            <ShopProductCardSkeleton key={`skeleton-${index}`} />
                        ))
                    )}
                </div>


            </div>
            <div className="load-more-container"> {/* Keep this wrapper for consistent centering */}
                {hasMoreBooks && (
                    <button
                        className="load-more-button"
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                    >
                        {isLoadingMore ? 'Loading...' : 'Load More...'}
                    </button>
                )}

                {!hasMoreBooks && filteredBooks.length > 0 && (
                    <h4 className="end-of-results">You have reached the end !<br />
                        Explore some other Category. Thanks</h4>

                )}
            </div>
        </section >
    );
}