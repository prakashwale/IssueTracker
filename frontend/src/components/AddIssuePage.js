import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ISSUE } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaSpinner, FaArrowLeft } from 'react-icons/fa';

const AddIssuePage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    priority: 'Medium', 
    assignedDeveloper: '',
    tags: [],
    dueDate: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [addIssue] = useMutation(ADD_ISSUE, {
    onCompleted: () => navigate('/issues'),
    onError: (err) => {
      setErrors({ form: err.message });
      setIsSubmitting(false);
    }
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formState.title.trim()) newErrors.title = 'Title is required';
    if (!formState.description.trim()) newErrors.description = 'Description is required';
    if (!formState.assignedDeveloper.trim()) newErrors.assignedDeveloper = 'Developer is required';
    if (formState.dueDate && new Date(formState.dueDate) < new Date()) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await addIssue({ 
        variables: { 
          title: formState.title,
          description: formState.description,
          priority: formState.priority,
          assignedDeveloper: formState.assignedDeveloper,
          tags: formState.tags.filter(tag => tag.trim() !== ''),
          dueDate: formState.dueDate
        } 
      });
    } catch (err) {
      console.error('Error adding issue:', err);
      setErrors({ form: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
    }));
  };

  return (
    <motion.div 
      className="add-issue-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="add-issue-card">
        <div className="add-issue-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <FaArrowLeft /> <span>Back</span>
        </button>
          <h1>Create New Issue</h1>
          <p className="subtitle">Fill in the details below to create a new issue</p>
        </div>
        
        {errors.form && (
          <div className="error-message">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-issue-form">
          <div className={`form-group ${errors.title ? 'error' : ''}`}>
            <label>Title *</label>
            <input
              name="title"
              type="text"
              placeholder="Enter issue title"
              value={formState.title}
              onChange={handleChange}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>
          
          <div className={`form-group ${errors.description ? 'error' : ''}`}>
            <label>Description *</label>
            <textarea
              name="description"
              placeholder="Provide detailed description of the issue"
              value={formState.description}
              onChange={handleChange}
              rows={4}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formState.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div className={`form-group ${errors.dueDate ? 'error' : ''}`}>
              <label>Due Date</label>
              <input
                name="dueDate"
                type="date"
                value={formState.dueDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
            </div>
          </div>
          
          <div className={`form-group ${errors.assignedDeveloper ? 'error' : ''}`}>
            <label>Assigned Developer *</label>
            <input
              name="assignedDeveloper"
              type="text"
              placeholder="Enter developer name"
              value={formState.assignedDeveloper}
              onChange={handleChange}
            />
            {errors.assignedDeveloper && <span className="error-text">{errors.assignedDeveloper}</span>}
          </div>
          
          <div className="form-group">
            <label>Tags</label>
            <input
              name="tags"
              type="text"
              placeholder="bug,ui,backend (comma separated)"
              value={formState.tags.join(', ')}
              onChange={handleChange}
            />
            <div className="tag-hint">Separate tags with commas</div>
          </div>
          
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'disabled' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spinner" />
                Creating Issue...
              </>
            ) : (
              <>
                <FaPlus />
                Create Issue
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddIssuePage;