import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ISSUE } from '../graphql/queries';
import { FiArrowLeft, FiCalendar, FiUser, FiTag, FiFlag } from 'react-icons/fi';
import { motion } from 'framer-motion';

const IssueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ISSUE, {
    variables: { id },
  });

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading issue details...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Error Loading Issue</h2>
      <p>{error.message}</p>
      <button className="retry-button" onClick={() => navigate('/issues')}>
        Back to Issues
      </button>
    </div>
  );

  const issue = data.issue;

  return (
    <motion.div 
      className="issue-details-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="issue-details-card">
        <div className="issue-details-header">
          <button className="back-button" onClick={() => navigate('/issues')}>
            <FiArrowLeft /> Back
          </button>
          <div className="header-content">
            <h1>Issue Details</h1>
            <p className="subtitle">View and manage issue information</p>
          </div>
        </div>

        <div className="issue-content">
          <section className="issue-header">
            <h2>{issue.title}</h2>
            <p className="issue-description">{issue.description}</p>
          </section>

          <section className="issue-meta">
            <div className="meta-item">
              <div className="meta-icon">
                <FiFlag />
              </div>
              <div className="meta-content">
                <span className="meta-label">Status</span>
                <span className={`status-badge ${issue.status.toLowerCase()}`}>
                  {issue.status}
                </span>
              </div>
            </div>

            <div className="meta-item">
              <div className="meta-icon">
                <FiFlag />
              </div>
              <div className="meta-content">
                <span className="meta-label">Priority</span>
                <span className={`priority-badge ${issue.priority.toLowerCase()}`}>
                  {issue.priority}
                </span>
              </div>
            </div>

            <div className="meta-item">
              <div className="meta-icon">
                <FiUser />
              </div>
              <div className="meta-content">
                <span className="meta-label">Assigned Developer</span>
                <span className="meta-value">{issue.assignedDeveloper}</span>
              </div>
            </div>

            <div className="meta-item">
              <div className="meta-icon">
                <FiCalendar />
              </div>
              <div className="meta-content">
                <span className="meta-label">Due Date</span>
                <span className="meta-value">{new Date(issue.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </section>

          <section className="tags-section">
            <div className="meta-icon">
              <FiTag />
            </div>
            <div className="meta-content">
              <span className="meta-label">Tags</span>
              <div className="tags-container">
                {issue.tags.length > 0 ? (
                  issue.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))
                ) : (
                  <span className="no-tags">No tags assigned</span>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default IssueDetailsPage;
