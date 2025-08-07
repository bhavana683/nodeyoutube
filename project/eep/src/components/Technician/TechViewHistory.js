import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'styles/TechView.css';

const TechViewHistory = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const token = localStorage.getItem('token');

  const handleAccept = async (issueId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/acceptissue/${issueId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
      });
      navigate('/technician/accept');
    } catch (error) {
      console.error('Error accepting issue:', error);
    }
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_API_URL}/api/auth/pending', {
          withCredentials: true
        });
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };
    fetchIssues();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
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
    <div className="tech-history-container">
      <h2 className="tech-history-header">Pending Issues</h2>

      <div className="tech-history-content">
        {issues.length === 0 ? (
          <p className="no-issues">No pending issues found.</p>
        ) : (
          issues.map((issue) => {
            const isExpanded = expandedIds.includes(issue._id);
            return (
              <div
                key={issue._id}
                className="tech-history-card"
              >
                <div
                  className="tech-card-header"
                  onClick={() => toggleExpand(issue._id)}
                >
                  <h3>{issue.issue || `Issue #${issue._id.substring(0, 5)}`}</h3>
                  <span className={`status-${issue.status === 'completed' ? 'completed' : 'pending'}`}>
                    {issue.status || 'Pending'}
                  </span>
                </div>

                {isExpanded && (
                  <div className="tech-card-details">
                    <p><strong>Lab:</strong> {issue.labNo || "N/A"}</p>
                    <p><strong>Posted By:</strong> {issue.postedBy || "Incharge"}</p>
                    <p><strong>Date:</strong> {formatDate(issue.createdAt)}</p>
                    
                    <div className="description-box">
                      <p><strong>Description:</strong></p>
                      <p>{issue.description || "No description provided"}</p>
                    </div>

                    <div className="action-buttons">
                      <button 
                        className="accept-button"
                        onClick={() => handleAccept(issue._id)}
                      >
                        Accept Issue
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TechViewHistory;
/*
import React, { useState, useEffect } from 'react';
import 'styles/TechView.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const TechViewHistory = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [expandedIssue, setExpandedIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:7001/api/auth/pending', {
          withCredentials: true
        });
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const handleAccept = async (issueId) => {
    try {
      await axios.post(`http://localhost:7001/api/auth/acceptissue/${issueId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
      });
      navigate('/technician/accept');
    } catch (error) {
      console.error('Error accepting issue:', error);
    }
  };

  const toggleExpand = (issueId) => {
    setExpandedIssue(expandedIssue === issueId ? null : issueId);
  };

  const filteredIssues = issues.filter(issue => {
    if (filter === 'all') return true;
    return issue.status?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="techcontainer">
      <div className="header-container">
        <h2 className="header">Pending Issues</h2>
        <div className="filter-controls">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading issues...</div>
      ) : filteredIssues.length > 0 ? (
        <div className="issues-list">
          {filteredIssues.map((issue, index) => (
            <div key={index} className="issue-item">
              <div 
                className="issue-summary"
                onClick={() => toggleExpand(issue._id)}
              >
                <div className="issue-title">
                  <h3>{issue.issue || `Issue #${index + 1}`}</h3>
                  <span className={`status-tag ${issue.status?.toLowerCase()}`}>
                    {issue.status || "Pending"}
                  </span>
                </div>
                <div className="issue-meta">
                  <span>Lab: {issue.labNo || "N/A"}</span>
                  <span>Posted: {new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="expand-icon">
                  {expandedIssue === issue._id ? '▼' : '►'}
                </div>
              </div>

              {expandedIssue === issue._id && (
                <div className="issue-details">
                  <div className="detail-section">
                    <h4>Description</h4>
                    <p>{issue.description || "No description provided"}</p>
                  </div>
                  
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Posted By:</span>
                      <span>{issue.postedBy || "Incharge"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Reported At:</span>
                      <span>{new Date(issue.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Issue Time:</span>
                      <span>{issue.issuetime || "N/A"}</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button 
                      className="accept-button"
                      onClick={() => handleAccept(issue._id)}
                    >
                      Accept Issue
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-issues">
          {filter === 'all' ? 'No issues found' : `No ${filter} issues found`}
        </div>
      )}
    </div>
  );
};

export default TechViewHistory;*/

