'use client';
import React, { useState, useEffect } from 'react';
import 'styles/AdLab.css';
import axios from "axios";

const ViewHistory = () => {
  const [issues, setIssues] = useState([]);
  const [expandedIssue, setExpandedIssue] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("http://localhost:7001/api/auth/inviewhistory");
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  const toggleExpand = (issueId) => {
    setExpandedIssue(expandedIssue === issueId ? null : issueId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="history-container">
      <h2 className="history-header">View History</h2>

      <div className="history-content">
        {issues.length > 0 ? (
          <div className="history-grid">
            {issues.map((issue, index) => (
              <div key={index} className="history-card">
                <div className="card-header" onClick={() => toggleExpand(issue._id)}>
                  <h3>{issue.issue || `Issue #${index + 1}`}</h3>
                  <span className={`status-${issue.status === 'completed' ? 'completed' : 'in-progress'}`}>
                    {issue.status || 'Pending'}
                  </span>
                </div>

                <p><strong>Lab:</strong> {issue.labNo || "N/A"}</p>
                <p><strong>Posted By:</strong> {issue.postedBy || "Incharge"}</p>
                <p><strong>Date:</strong> {formatDate(issue.createdAt)}</p>

                {expandedIssue === issue._id && (
                  <div className="card-details">
                    <p><strong>Description:</strong></p>
                    <p className="description-text">{issue.description || "No description provided"}</p>
                    
                    <p><strong>Solved By:</strong> {issue.solvedBy || "Not solved yet"}</p>
                    
                    <div className="meta-info">
                      <small>Last updated: {formatDate(issue.updatedAt)}</small>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-issues">No issues found in history.</p>
        )}
      </div>
    </div>
  );
};

export default ViewHistory;
/*
'use client';
import React, { useState, useEffect } from 'react';
import 'styles/AdLab.css';
import axios from "axios";

const ViewHistory = () => {
  const [issues, setIssues] = useState([]);
  const [expandedIssue, setExpandedIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("http://localhost:7001/api/auth/inviewhistory");
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const toggleExpand = (issueId) => {
    setExpandedIssue(expandedIssue === issueId ? null : issueId);
  };

  const filteredIssues = issues.filter(issue => 
    issue.issue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.labNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Adcontainer">
      <h2 className="header">View History</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : filteredIssues.length > 0 ? (
        <div className="issues-scroll-container">
          {filteredIssues.map((issue, index) => (
            <div key={index} className="issue-card">
              <div 
                className="issue-header"
                onClick={() => toggleExpand(issue._id)}
              >
                <h3>{issue.issue || `Issue #${index + 1}`}</h3>
                <span className={`status-badge ${issue.status?.toLowerCase()}`}>
                  {issue.status || "Pending"}
                </span>
                <span className="toggle-icon">
                  {expandedIssue === issue._id ? '▼' : '►'}
                </span>
              </div>

              {expandedIssue === issue._id && (
                <div className="issue-details">
                  <div className="detail-row">
                    <span className="detail-label">Description:</span>
                    <p className="detail-value">{issue.description || "No description"}</p>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Solved By:</span>
                    <p className="detail-value">{issue.solvedBy || "Unknown"}</p>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <p className="detail-value">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Lab:</span>
                    <p className="detail-value">{issue.labNo || "N/A"}</p>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Posted By:</span>
                    <p className="detail-value">{issue.postedBy || "Incharge"}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          {searchTerm ? "No matching issues found" : "No issues found"}
        </div>
      )}
    </div>
  );
};

export default ViewHistory;*/