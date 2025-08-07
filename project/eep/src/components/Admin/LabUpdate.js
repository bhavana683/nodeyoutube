
/*

import { useState, useEffect } from 'react';
import axios from 'axios';

function LabUpdate() {
  const [data, setData] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:7001/api/auth/getlabUpdate`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching lab updates:", error);
      }
    };
    fetchDetails();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No updates found.</p>
      ) : (
        data.map((record) => {
          const isExpanded = expandedIds.includes(record._id);
          return (
            <div
              key={record._id}
              className="border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div
                className="cursor-pointer p-4 font-semibold text-lg bg-gray-100 rounded-t-2xl"
                onClick={() => toggleExpand(record._id)}
              >
                {record.title}
              </div>

              {isExpanded && (
                <div className="p-4 bg-white space-y-2 rounded-b-2xl">
                  <p><span className="font-semibold">Info:</span> {record.info}</p>
                  <p><span className="font-semibold">Day:</span> {record.day}</p>
                  <p><span className="font-semibold">Updated By:</span> {record.updatedBy}</p>
                  {record.file && (
                    <img
                      src={`http://localhost:7001/uploads/${record.file}`}
                      alt="uploaded"
                      className="max-w-full h-auto rounded-md mt-2 border"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default LabUpdate;
*/
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'styles/AdLab.css';
function LabUpdate() {
  const [updates, setUpdates] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/getlabUpdate`);
        setUpdates(res.data);
      } catch (err) {
        console.error("Error fetching updates:", err);
        setError("Failed to load updates");
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Lab Updates</h2>
      
      {loading ? (
        <div className="text-center py-8">Loading updates...</div>
      ) : error ? (
        <div className="text-red-500 p-4 border border-red-200 rounded bg-red-50">{error}</div>
      ) : updates.length === 0 ? (
        <div className="text-gray-500 p-4 text-center">No updates available</div>
      ) : (
        <ul className="space-y-2">
          {updates.map((update) => (
            <li key={update._id} className="border rounded-md overflow-hidden">
              <button
                onClick={() => toggleExpand(update._id)}
                className={`w-full text-left p-3 font-medium ${expandedId === update._id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
              >
                {update.title || "Untitled Update"}
              </button>
              
              {expandedId === update._id && (
                <div className="p-4 bg-white border-t">
                  <div className="mb-3">
                    <p className="text-gray-700 whitespace-pre-line">{update.info}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Day:</span> {update.day}
                    </div>
                    <div>
                      <span className="text-gray-500">By:</span> {update.updatedBy}
                    </div>
                  </div>
                  
                  {update.file && (
                    <div className="mt-3">
                      <img 
                        src={`${process.env.REACT_APP_API_URL}/uploads/${update.file}`}
                        alt="Update attachment"
                        className="max-w-full h-auto rounded border"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LabUpdate;



