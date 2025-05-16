import React from 'react';

const IssueFilter = ({ filter, setFilter, searchTerm, setSearchTerm }) => {
  return (
    <div className="issue-filter">
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Issues</option>
        <option value="open">Open</option>
        <option value="in progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <input
        type="text"
        placeholder="Search issues..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default IssueFilter;
