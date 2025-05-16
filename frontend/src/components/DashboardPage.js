import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ISSUES } from '../graphql/queries';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const { loading, error, data } = useQuery(GET_ISSUES);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;

  const issues = data.issues;
  const openCount = issues.filter(issue => issue.status === 'Open').length;
  const closedCount = issues.filter(issue => issue.status === 'Closed').length;


  const statusData = {
    labels: ['Open', 'Closed'],
    datasets: [{
      data: [openCount, closedCount],
      backgroundColor: ['#FF6384', '#36A2EB'],
      borderColor: ['#fff', '#fff'],
      borderWidth: 1
    }]
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      data: [
        issues.filter(i => i.priority === 'High').length,
        issues.filter(i => i.priority === 'Medium').length,
        issues.filter(i => i.priority === 'Low').length
      ],
      backgroundColor: ['#FF6384', '#FFCE56', '#4BC0C0'],
      borderColor: ['#fff', '#fff', '#fff'],
      borderWidth: 1
    }]
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Issue Tracker Dashboard</h1>
        <div className="summary-card">
          <span className="summary-title">Total Issues</span>
          <span className="summary-value">{issues.length}</span>
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <h3>Open Issues</h3>
              <p className="stat-value">{openCount}</p>
              <p className="stat-percentage">{Math.round((openCount/issues.length)*100)}% of total</p>
            </div>
            <div className="stat-icon open-icon">📌</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-content">
              <h3>Closed Issues</h3>
              <p className="stat-value">{closedCount}</p>
              <p className="stat-percentage">{Math.round((closedCount/issues.length)*100)}% of total</p>
            </div>
            <div className="stat-icon closed-icon">✅</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-content">
              <h3>High Priority</h3>
              <p className="stat-value">{priorityData.datasets[0].data[0]}</p>
              <p className="stat-percentage">{Math.round((priorityData.datasets[0].data[0]/issues.length)*100)}% of total</p>
            </div>
            <div className="stat-icon priority-icon">⚠️</div>
          </div>
        </div>

        
        <div className="charts-row">
          <div className="chart-card">
            <h3>Issue Status</h3>
            <div className="chart-wrapper">
              <Pie 
                data={statusData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw || 0;
                          const percentage = Math.round((value / issues.length) * 100);
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <h3>Priority Distribution</h3>
            <div className="chart-wrapper">
              <Pie 
                data={priorityData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw || 0;
                          const percentage = Math.round((value / issues.length) * 100);
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;