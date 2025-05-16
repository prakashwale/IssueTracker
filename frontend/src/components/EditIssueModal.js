import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ISSUE } from '../graphql/queries';
import { UPDATE_ISSUE } from '../graphql/mutations';
import { FiX, FiSave, FiFlag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const EditIssueModal = ({ issueId, onClose, onUpdate }) => {
  const [status, setStatus] = useState('Open');

  const { loading, error, data } = useQuery(GET_ISSUE, {
    variables: { id: issueId },
  });

  const [updateIssue] = useMutation(UPDATE_ISSUE);

  useEffect(() => {
    if (data?.issue) {
      setStatus(data.issue.status);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateIssue({ 
        variables: { 
          id: issueId,
          status: status
        } 
      });
      onUpdate(data.updateIssue);
      onClose();
    } catch (err) {
      console.error('Error updating issue:', err);
      alert('Error updating issue: ' + err.message);
    }
  };

  if (loading) return (
    <div className="modal-loading">
      <div className="spinner"></div>
      <p>Loading issue details...</p>
    </div>
  );

  if (error) return (
    <div className="modal-error">
      <div className="error-icon">⚠️</div>
      <p>Error: {error.message}</p>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="modal-container"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="modal-header">
            <h2>Update Issue Status</h2>
            <button onClick={onClose} className="modal-close">
              <FiX />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label>
                <FiFlag /> Current Status: <span className="current-status">{data?.issue?.status}</span>
              </label>
            </div>
            
            <div className="form-group">
              <label>New Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="status-select"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                <FiSave /> Update Status
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditIssueModal;