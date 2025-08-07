/*'use client';
import React, { useState } from 'react';
import 'styles/AdLab.css'; // Import the CSS file

const IssueUpdate = () => {

  const [numberOfDays, setNumberOfDays] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [solvedBy, setSolvedBy] = useState('');
  const [acceptedBy, setAcceptedBy] = useState('');

  const handleNumberOfDaysChange = (e) => {
    setNumberOfDays(e.target.value);
  };

  const handleIssueDescriptionChange = (e) => {
    setIssueDescription(e.target.value);
  };

  const handleSolvedByChange = (e) => {
    setSolvedBy(e.target.value);
  };

  const handleAcceptedByChange = (e) => {
    setAcceptedBy(e.target.value);
  };

  return (
    <div className="Adcontainer">
      <h2 className="header">Issue Update</h2>
      <div className="historyBox">
        <div className="section">
          <textarea
            value={issueDescription}
            onChange={handleIssueDescriptionChange}
            className="textarea"
            placeholder="Issue description"
          />
        </div>
        <div className="section">
          <textarea
            value={solvedBy}
            onChange={handleSolvedByChange}
            className="textarea"
            placeholder="Solved by - lab number"
          />
        </div>
        <div className="section">
          <span className="label">Number of Days of Issue</span>
          <input
            type="number"
            value={numberOfDays}
            onChange={handleNumberOfDaysChange}
            className="input"
            placeholder="Enter number of days"
            min="1"
          />
        </div>
        <div className="section">
          <textarea
            value={acceptedBy}
            onChange={handleAcceptedByChange}
            className="textarea"
            placeholder="Accepted by"
          />
        </div>
      </div>
    </div>
  );
};




export default IssueUpdate;*/


'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'styles/AdLab.css';

const IssueUpdatesList = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUpdates = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:7001/api/auth/issue-updates", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setUpdates(response.data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUpdates();
  }, []);

  if (loading) return <div>Loading updates...</div>;

  return (
    <div className="Adcontainer">
      <h2 className="header">Issue Updates</h2>
      
      {updates.length > 0 ? (
        <div className="updates-list">
          {updates.map(update => (
            <div key={update._id} className="update-item">
              <h3>Issue: {update.issueId.issue} (Lab {update.issueId.labNo})</h3>
              <p><strong>Technician:</strong> {update.technicianEmail}</p>
              <p><strong>Update:</strong> {update.updateText}</p>
              <p><strong>Days Taken:</strong> {update.daysTaken}</p>
              <p><strong>Status:</strong> {update.status}</p>
              <p><small>{new Date(update.createdAt).toLocaleString()}</small></p>
            </div>
          ))}
        </div>
      ) : (
        <p>No updates available</p>
      )}
    </div>
  );
};

export default IssueUpdatesList;
/*
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'styles/AdLab.css';

const IssueUpdatesList = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUpdates = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:7001/api/auth/issueupdates", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setUpdates(response.data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUpdates();
  }, []);

  if (loading) return <div className="Adcontainer">Loading updates...</div>;

  return (
    <div className="Adcontainer">
      <h2 className="header">Issue Updates</h2>
      
      {updates.length > 0 ? (
        <div className="updates-list">
          {updates.map(update => (
            <div key={update._id} className="update-card">
              <h3>{update.issueId?.issue || 'Issue'} (Lab {update.issueId?.labNo || 'N/A'})</h3>
              <p><strong>Posted By:</strong> {update.issueId?.postedBy || 'Unknown'}</p>
              <p><strong>Description:</strong> {update.issueDescription}</p>
              <p><strong>Solved By:</strong> {update.solvedBy}</p>
              <p><strong>Days Taken:</strong> {update.daysTaken}</p>
              <p><strong>Progress:</strong> {update.progress}</p>
              <p><strong>Status:</strong> 
                <span className={`status-${update.status}`}>
                  {update.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </p>
              <p><strong>Updated By:</strong> {update.technicianEmail}</p>
              <p><small>{new Date(update.createdAt).toLocaleString()}</small></p>
            </div>
          ))}
        </div>
      ) : (
        <p>No updates available</p>
      )}
    </div>
  );
};

export default IssueUpdatesList;*/
