import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'styles/TechView.css';

const Accept = () => {
  const [issues, setIssues] = useState([]);
  const [expandedIssue, setExpandedIssue] = useState(null);

  // Fetch accepted issues on component mount
  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/acceptbytech`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
            withCredentials:true
          
        });
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching accepted issues:", error);
      }
    };

    fetchIssues();
  }, []);

  // Toggle issue expand/collapse
  const toggleExpand = (issueId) => {
    setExpandedIssue(expandedIssue === issueId ? null : issueId);
  };

  return (
    <div className="techcontainer">
      <h2 className="header">Accepted Issues</h2>

      {issues.length > 0 ? (
        issues.map((issue, index) => (
          <div key={issue._id} className="issueContainer">
            <button className="issueButton" onClick={() => toggleExpand(issue._id)}>
              {issue.issue || `Issue #${index + 1}`}
            </button>

            {expandedIssue === issue._id && (
              <div className="historyBox">
                <div className="section">
                  <span className="label">Description</span>
                  <textarea
                    value={issue.description || "No description"}
                    readOnly
                    className="textarea"
                  />
                </div>

                <div className="section">
                  <span className="label">Solved By</span>
                  <textarea
                    value={issue.solvedBy || "Not yet solved"}
                    readOnly
                    className="textarea"
                  />
                </div>

                <div className="section">
                  <span className="label">Date</span>
                  <input
                    type="date"
                    value={issue.createdAt ? issue.createdAt.substring(0, 10) : ""}
                    readOnly
                    className="input"
                  />
                </div>

                <div className="details">
                  <h3>Full Issue Details:</h3>
                  <ul>
                    <li><strong>Lab No:</strong> {issue.labNo || "N/A"}</li>
                    <li><strong>Status:</strong> {issue.status || "Pending"}</li>
                    <li><strong>Posted By:</strong> {issue.postedBy || "Incharge"}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No accepted issues found.</p>
      )}
    </div>
  );
};

export default Accept;
