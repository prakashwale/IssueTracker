import React from 'react'

function FilterIssues() {
    return( 
        <div className='filter-issues'>
        <h2>Filter Issues</h2>

        <form>
        <label htmlFor="filter">Filter by status</label>
        <select id="filter" name="filter">
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
        </select>
        </form>
        </div>
    )
}
export default FilterIssues;