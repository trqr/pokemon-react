import React, { useState } from 'react';
import '../styles/pagination.css';

function Pagination({ currentPage, setCurrentPage, lastPage }){

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleLast = () => {
        setCurrentPage(lastPage);
    };

    const handleFirst = () => {
        setCurrentPage(1);
    };

    return (
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            {currentPage < 2 ? 
            (<a href="#" class="pagination-previous" onClick={handlePrevious} disabled>Previous</a>)
            : 
            (<a href="#" class="pagination-previous" onClick={handlePrevious} >Previous</a>)
            }
            <a href="#" class="pagination-next" onClick={handleNext}>Next page</a>
            <ul class="pagination-list">
                <li><a href="#" class="pagination-link" aria-label="Goto page 1" onClick={handleFirst}>1</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                {currentPage > 1 &&
                <li><a href="#" class="pagination-link" aria-label="Goto page 45" onClick={handlePrevious} >{currentPage - 1}</a></li>}
                <li>
                <a
                    class="pagination-link is-current"
                    aria-label="Page 46"
                    aria-current="page"
                    >{currentPage}</a>
                </li>
                {currentPage < lastPage &&
                <li><a href="#" class="pagination-link" aria-label="Goto page 47" onClick={handleNext}>{currentPage + 1}</a></li>}
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a href="#" class="pagination-link" aria-label="Goto page 86" onClick={handleLast}>{lastPage}</a></li>
            </ul>
        </nav>
    )
}

export default Pagination;