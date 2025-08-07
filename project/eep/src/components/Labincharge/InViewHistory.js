

/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import "styles/InView.css";

const InViewHistory = () => {
  const [issues, setIssues] = useState([]);
  const [expandedIssue, setExpandedIssue] = useState(null); // Stores the currently expanded issue ID

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
    setExpandedIssue(expandedIssue === issueId ? null : issueId); // Toggle expand/collapse
  };

  return (
    <div className="invcontainer">
      <h2 className="header">View History</h2>

      
      {issues.length > 0 ? (
        issues.map((issue, index) => (
          <div key={index} className="issueContainer">
            <button className="issueButton" onClick={() => toggleExpand(issue._id)}>
              {issue.issue || `Issue #${index + 1}`}
            </button>

           
            {expandedIssue === issue._id && (
              <div className="historyBox">
                <div className="section">
                  <span className="label">Description</span>
                  <textarea value={issue.description || "No description"} readOnly className="textarea" />
                </div>
               

                <div className="section">
                  <span className="label">Solved By</span>
                  <textarea value={issue.solvedBy || "Unknown"} readOnly className="textarea" />
                </div>
                <div className="section">
                  <span className="label">Date</span>
                  <input type="date" value={issue.createdAt?.substring(0, 10) || ""} readOnly className="input" />
                </div>
                <div className="details">
                  <h3>Full Issue Details:</h3>
                  <ul>
                    <li><strong>Lab:</strong> {issue.labNo || "N/A"}</li>
                    <li><strong>Status:</strong> {issue.status || "Pending"}</li><li><strong>Status:</strong> {issue.postedBy || "incharge"}</li>
                    <li><strong>Status:</strong> {issue.status || "Pending"}</li>

                  </ul>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No issues found.</p>
      )}
    </div>
  );
};

export default InViewHistory;
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import "styles/InView.css";

const InViewHistory = () => {
  const [issues, setIssues] = useState([]);
  const [expandedIssue, setExpandedIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7001/api/auth/inviewhistory",
          { withCredentials: true }
        );
        setIssues(response.data);
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Failed to fetch issues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const toggleExpand = (issueId) => {
    setExpandedIssue(expandedIssue === issueId ? null : issueId);
  };

  const bufferToBase64 = (bufferArray, contentType) => {
    if (!bufferArray || !bufferArray.data) return null;
    const bytes = new Uint8Array(bufferArray.data);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:${contentType};base64,${window.btoa(binary)}`;
  };

  if (loading) {
    return (
      <div className="invcontainer">
        <p>Loading issues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="invcontainer">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="invcontainer">
      <h2 className="header">View History</h2>

      <div className="history-content">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <div key={issue._id} className="issue-card">
              <div 
                className="issue-header"
                onClick={() => toggleExpand(issue._id)}
              >
                <div className="issue-title">
                  <span className="issue-name">{issue.issue || `Issue #${issue._id.substring(0, 5)}`}</span>
                  <span className={`status-badge ${issue.status?.toLowerCase().replace(' ', '-')}`}>
                    {issue.status || "Pending"}
                  </span>
                </div>
                <div className="issue-meta">
                  <span className="lab-number">Lab {issue.labNo || "N/A"}</span>
                  <span className="issue-date">
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {expandedIssue === issue._id && (
                <div className="issue-details">
                  <div className="description-section">
                    <h4>Description</h4>
                    <p>{issue.description || "No description provided"}</p>
                  </div>

                  <div className="media-section">
                    {issue.media?.image?.data && (
                      <div className="media-item">
                        <h4>Image Evidence</h4>
                        <img 
                          src={bufferToBase64(issue.media.image.data, issue.media.image.contentType)} 
                          alt="Issue evidence" 
                          className="media-preview"
                        />
                      </div>
                    )}

                    {issue.media?.video?.data && (
                      <div className="media-item">
                        <h4>Video Evidence</h4>
                        <video controls className="media-preview">
                          <source 
                            src={bufferToBase64(issue.media.video.data, issue.media.video.contentType)} 
                            type={issue.media.video.contentType} 
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>

                  <div className="meta-grid">
                    <div className="meta-item">
                      <span className="meta-label">Posted By:</span>
                      <span className="meta-value">{issue.postedBy || "Unknown"}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Solved By:</span>
                      <span className="meta-value">{issue.solvedBy || "Not solved yet"}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Reported At:</span>
                      <span className="meta-value">
                        {new Date(issue.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Issue Time:</span>
                      <span className="meta-value">{issue.issuetime || "N/A"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-issues">No issues found in history.</p>
        )}
      </div>
    </div>
  );
};

export default InViewHistory;