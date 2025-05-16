import React from 'react';

const IssueTable = ({ issues, onEdit, onDelete, onView }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td>{issue.title}</td>
            <td>{issue.status}</td>
            <td>
              <button onClick={() => onView(issue.id)}>View</button>
              <button onClick={() => onEdit(issue.id)}>Edit</button>
              <button onClick={() => onDelete(issue.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IssueTable;