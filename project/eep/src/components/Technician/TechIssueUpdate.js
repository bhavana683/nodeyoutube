
/*
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'styles/TechView.css';

const TechIssueUpdate = () => {
  const [acceptedIssues, setAcceptedIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [updateText, setUpdateText] = useState('');
  const [daysTaken, setDaysTaken] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:7001/api/auth/acceptbytech", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setAcceptedIssues(response.data);
      } catch (error) {
        console.error("Error fetching accepted issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedIssues();
  }, []);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:7001/api/auth/issues/${selectedIssue}/updates`,
        { updateText, daysTaken:Number(daysTaken), status },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      alert('Update submitted successfully!');
      setUpdateText('');
      setDaysTaken('');
      setStatus('in-progress');
    } catch (error) {
      console.error("Error submitting update:", error);
      alert('Failed to submit update. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="techcontainer">
      <h2 className="header">Issue Update</h2>
      
      <div className="issue-selection">
        <h3>Select an Issue to Update</h3>
        <select 
          onChange={(e) => setSelectedIssue(e.target.value)}
          value={selectedIssue || ''}
        >
          <option value="">-- Select Issue --</option>
          {acceptedIssues.map(issue => (
            <option key={issue._id} value={issue._id}>
              {issue.issue} (Lab {issue.labNo})
            </option>
          ))}
        </select>
      </div>

      {selectedIssue && (
        <form onSubmit={handleSubmitUpdate} className="update-form">
          <div className="section">
            <label>Update Details</label>
            <textarea
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              className="textarea"
              placeholder="Describe your progress..."
              required
            />
          </div>

          <div className="section">
            <label>Days Taken</label>
            <input
              type="number"
              value={daysTaken}
              onChange={(e) => setDaysTaken(e.target.value)}
              className="input"
              min="1"
              required
            />
          </div>

          <div className="section">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input"
            >
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button type="submit" className="button">
            Post Update
          </button>
        </form>
      )}
    </div>
  );
};

export default TechIssueUpdate;
*/



/*
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'styles/TechView.css';

const TechIssueUpdate = () => {
  const [acceptedIssues, setAcceptedIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [solvedBy, setSolvedBy] = useState('');
  const [daysTaken, setDaysTaken] = useState('');
  const [progress, setProgress] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:7001/api/auth/acceptbytech", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setAcceptedIssues(response.data);
      } catch (error) {
        console.error("Error fetching accepted issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedIssues();
  }, []);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:7001/api/auth/issues/${selectedIssue}/updates`,
        { 
          issueDescription,
          solvedBy,
          daysTaken: Number(daysTaken), 
          progress 
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      alert('Update submitted successfully!');
      setIssueDescription('');
      setSolvedBy('');
      setDaysTaken('');
      setProgress('');
    } catch (error) {
      console.error("Error submitting update:", error);
      alert('Failed to submit update. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="techcontainer">
      <h2 className="header">Issue Update</h2>
      
      <div className="issue-selection">
        <h3>Select an Issue to Update</h3>
        <select 
          onChange={(e) => setSelectedIssue(e.target.value)}
          value={selectedIssue || ''}
        >
          <option value="">-- Select Issue --</option>
          {acceptedIssues.map(issue => (
            <option key={issue._id} value={issue._id}>
              {issue.issue} (Lab {issue.labNo})
            </option>
          ))}
        </select>
      </div>

      {selectedIssue && (
        <form onSubmit={handleSubmitUpdate} className="update-form">
          <div className="section">
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className="textarea"
              placeholder="Issue description"
              required
            />
          </div>

          <div className="section">
            <textarea
              value={solvedBy}
              onChange={(e) => setSolvedBy(e.target.value)}
              className="textarea"
              placeholder="Solved by - lab number"
              required
            />
          </div>

          <div className="section">
            <span className="label">Number of Days of Issue</span>
            <input
              type="number"
              value={daysTaken}
              onChange={(e) => setDaysTaken(e.target.value)}
              className="input"
              placeholder="Enter number of days"
              min="1"
              required
            />
          </div>

          <div className="section">
            <textarea
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="textarea"
              placeholder="Progress of issue"
              required
            />
          </div>

          <button type="submit" className="button">
            Post Issue Update
          </button>
        </form>
      )}
    </div>
  );
};

export default TechIssueUpdate;

*/



'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'styles/TechView.css';

const TechIssueUpdate = () => {
  const [acceptedIssues, setAcceptedIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [solvedBy, setSolvedBy] = useState('');
  const [daysTaken, setDaysTaken] = useState('');
  const [progress, setProgress] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/acceptbytech`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setAcceptedIssues(response.data);
      } catch (error) {
        console.error("Error fetching accepted issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedIssues();
  }, []);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:7001/api/auth/issues/${selectedIssue}/updates`,
        { 
          issueDescription,
          solvedBy,
          daysTaken: Number(daysTaken), 
          progress,
          status: isCompleted ? 'completed' : 'in-progress'
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      alert('Update submitted successfully!');
      setIssueDescription('');
      setSolvedBy('');
      setDaysTaken('');
      setProgress('');
      setIsCompleted(false);
      
      // Refresh accepted issues list
      const response = await axios.get("http://localhost:7001/api/auth/acceptbytech", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setAcceptedIssues(response.data);
    } catch (error) {
      console.error("Error submitting update:", error);
      alert('Failed to submit update. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="techcontainer">
      <h2 className="header">Issue Update</h2>
      
      <div className="issue-selection">
        <h3>Select an Issue to Update</h3>
        <select 
          onChange={(e) => setSelectedIssue(e.target.value)}
          value={selectedIssue || ''}
        >
          <option value="">-- Select Issue --</option>
          {acceptedIssues.map(issue => (
            <option key={issue._id} value={issue._id}>
              {issue.issue} (Lab {issue.labNo})
            </option>
          ))}
        </select>
      </div>

      {selectedIssue && (
        <form onSubmit={handleSubmitUpdate} className="update-form">
          <div className="section">
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className="textarea"
              placeholder="Issue description"
              required
            />
          </div>

          <div className="section">
            <textarea
              value={solvedBy}
              onChange={(e) => setSolvedBy(e.target.value)}
              className="textarea"
              placeholder="Solved by - lab number"
              required
            />
          </div>

          <div className="section">
            <span className="label">Number of Days of Issue</span>
            <input
              type="number"
              value={daysTaken}
              onChange={(e) => setDaysTaken(e.target.value)}
              className="input"
              placeholder="Enter number of days"
              min="1"
              required
            />
          </div>

          <div className="section">
            <textarea
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="textarea"
              placeholder="Progress of issue"
              required
            />
          </div>
          
          <div className="section">
            <label>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
              Mark as completed
            </label>
          </div>

          <button type="submit" className="button">
            Post Issue Update
          </button>
        </form>
      )}
    </div>
  );
};

export default TechIssueUpdate;
