 /*  
'use client';
 import React, { useState } from 'react';
 import 'styles/TechView.css';  // Import the CSS file

const TechLabUpdate = () => {
 

 
 
   const [updateInfo, setUpdateInfo] = useState('');
   const [selectedDay, setSelectedDay] = useState('');
 
   const handleUpdate = (e) => {
     const fieldName = e.target.name;
     const value = e.target.value;
 
     if (fieldName === 'updateInfo') {
       setUpdateInfo(value);
     } else if (fieldName === 'selectedDay') {
       setSelectedDay(value);
     }
 
     if (updateInfo && selectedDay) {
       console.log(`Update Info: ${updateInfo}, Day: ${selectedDay}`);
     }
   };
 
   return (
     <div className="techcontainer">
       <h2 className="header">Lab Update</h2>
 
       <div className="fieldsContainer">
         <textarea
           name="updateInfo"
           placeholder="Update Info"
           value={updateInfo}
           onChange={handleUpdate}
           className="textarea"
         />
 
         <select
           name="selectedDay"
           value={selectedDay}
           onChange={handleUpdate}
           className="select"
         >
           <option value="" disabled>
             Select Day
           </option>
           <option value="Monday">Monday</option>
           <option value="Tuesday">Tuesday</option>
           <option value="Wednesday">Wednesday</option>
           <option value="Thursday">Thursday</option>
           <option value="Friday">Friday</option>
           <option value="Saturday">Saturday</option>
           <option value="Sunday">Sunday</option>
         </select>
       </div>
     </div>
   );
 };
 
 
 
 

export default TechLabUpdate;
*/
/*
import { useState, useEffect } from 'react';
import axios from 'axios';

function TechLabUpdate() {
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

export default TechLabUpdate;*/

'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'styles/TechView.css';  // Import the CSS file

function TechLabUpdate() {
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
    <div className="techcontainer">
      <h2 className="header">Lab Updates</h2>
      
      <div className="updates-scroll-container">
        {data.length === 0 ? (
          <p className="no-updates">No updates found.</p>
        ) : (
          <div className="updates-list">
            {data.map((record) => {
              const isExpanded = expandedIds.includes(record._id);
              return (
                <div
                  key={record._id}
                  className={`update-card ${isExpanded ? 'expanded' : ''}`}
                >
                  <div
                    className="update-header"
                    onClick={() => toggleExpand(record._id)}
                  >
                    <h3>{record.title}</h3>
                    <span className="update-day">{record.day}</span>
                  </div>

                  {isExpanded && (
                    <div className="update-content">
                      <p className="update-info">{record.info}</p>
                      <div className="update-meta">
                        <span className="update-author">Posted by: {record.updatedBy}</span>
                      </div>
                      {record.file && (
                        <div className="update-media">
                          <img
                            src={`http://localhost:7001/uploads/${record.file}`}
                            alt="Update attachment"
                            className="update-image"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TechLabUpdate;