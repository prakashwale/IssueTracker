import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ISSUES } from '../graphql/queries';
import { DELETE_ISSUE } from '../graphql/mutations';
import EditIssueModal from './EditIssueModal';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiEye, FiPlus, FiSearch, FiFilter, FiArrowLeft } from 'react-icons/fi';
import IssueFilter from './IssueFilter';
import { motion } from 'framer-motion';

const ViewIssuesPage = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_ISSUES, {
    fetchPolicy: 'cache-and-network',
  });

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIssueId, setEditingIssueId] = useState(null);

  const [deleteIssue] = useMutation(DELETE_ISSUE, {
    refetchQueries: [{ query: GET_ISSUES }],
  });

  const handleEdit = (issueId) => {
    setEditingIssueId(issueId);
  };

  const handleView = (issueId) => {
    navigate(`/issue/${issueId}`);
  };

  const handleDelete = async (issueId) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        await deleteIssue({ variables: { id: issueId } });
      } catch (err) {
        console.error('Error deleting issue:', err);
        alert('Error deleting issue: ' + err.message);
      }
    }
  };

  const handleUpdateComplete = async () => {
    try {
      await refetch();
    } catch (err) {
      console.error('Error refetching:', err);
    }
    setEditingIssueId(null);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading issues...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Error Loading Issues</h2>
      <p>{error.message}</p>
      <button className="retry-button" onClick={() => refetch()}>
        Try Again
      </button>
    </div>
  );

  const filteredIssues =
    data?.issues?.filter((issue) => {
      if (filter !== 'all' && issue.status.toLowerCase() !== filter) return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          issue.title.toLowerCase().includes(searchLower) ||
          issue.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    }) || [];

  return (
    <motion.div 
      className="view-issues-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {editingIssueId && (
        <EditIssueModal
          issueId={editingIssueId}
          onClose={() => setEditingIssueId(null)}
          onUpdate={handleUpdateComplete}
        />
      )}

      <div className="view-issues-card">
        <div className="view-issues-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <FiArrowLeft /> Back
          </button>
          <div className="header-content">
            <h1>Issue Tracker</h1>
            <p className="subtitle">Manage and track your project issues efficiently</p>
          </div>
          <button className="add-issue-button" onClick={() => navigate('/add-issue')}>
            <FiPlus /> Add New Issue
          </button>
        </div>

        <div className="filters-section">
          <IssueFilter
            filter={filter}
            setFilter={setFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <div className="table-wrapper">
          <div className="table-container">
            <table className="issues-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assigned To</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.length > 0 ? (
                  filteredIssues.map((issue) => (
                    <motion.tr 
                      key={issue.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="issue-row"
                    >
                      <td className="issue-title">{issue.title}</td>
                      <td>
                        <span className={`status-badge ${issue.status.toLowerCase()}`}>
                          {issue.status}
                        </span>
                      </td>
                      <td>
                        <span className={`priority-badge ${issue.priority.toLowerCase()}`}>
                          {issue.priority}
                        </span>
                      </td>
                      <td className="assigned-to">{issue.assignedDeveloper}</td>
                      <td className="due-date">{new Date(issue.dueDate).toLocaleDateString()}</td>
                      <td className="action-buttons">
                        <button 
                          className="action-button view-btn" 
                          onClick={() => handleView(issue.id)} 
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                        <button 
                          className="action-button edit-btn" 
                          onClick={() => handleEdit(issue.id)} 
                          title="Edit Issue"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className="action-button delete-btn" 
                          onClick={() => handleDelete(issue.id)} 
                          title="Delete Issue"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr className="no-issues">
                    <td colSpan="6">
                      <div className="no-issues-content">
                        <FiSearch className="no-issues-icon" />
                        <p>No issues found</p>
                        <button className="add-issue-button" onClick={() => navigate('/add-issue')}>
                          <FiPlus /> Create New Issue
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewIssuesPage;
