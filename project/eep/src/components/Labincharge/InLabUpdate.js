'use client';
import React, { useState } from 'react';
import 'styles/InUpload.css';
import axios from 'axios'  // Import the CSS file
const InLabUpdate = () => {
  const[title,setTitle]=useState('')
  const [updatedBy,setUpdatedBy]=useState('')
  const [info, setUpdateInfo] = useState('');
  const [day, setSelectedDay] = useState('');
  const[file,setFile]=useState('');
  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      
      console.log(title,info,day,updatedBy,file)
      const formdata=new FormData()
      formdata.append('title',title)
      formdata.append('info',info)
      formdata.append('day',day)
      formdata.append('updatedBy',updatedBy)
      formdata.append('file',file)
     for (let [key, value] of formdata.entries()) {
  console.log(key, value);
}
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/upload`,formdata
       // {title,updatedBy,info,day,file }

        
      );

      
      
  
     /* const data = await response.json();
      alert("Issue posted successfully!");
      console.log(data);
      if (!response.ok) {
          throw new Error(data.message || `Error: ${response.statusText}`);
      }*/

  
      // Reset form fields
     
  } catch (error) {
      console.log("Error posting issue:", error);
    
  }
  
  };

const handleUpload=(e)=>{
  console.log(file)
}

  return (
    <div className="invcontainer">
    <form>
      <h2 className="header">Lab Update</h2>

      <div>
        <label>Title</label>
        <input 
          type="text" 
          placeholder="title of update" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>

      <div>
        <p>Updated by</p>
        <input 
          type="text" 
          placeholder="name or designation" 
          value={updatedBy} 
          onChange={(e) => setUpdatedBy(e.target.value)} 
        />
      </div>

      <br />

      <div className="fieldsContainer">
        <textarea
          name="updateInfo"
          placeholder="Update Info"
          value={info}
          onChange={(e)=>{setUpdateInfo(e.target.value)}}
          className="textarea"
        />

        <select
          name="selectedDay"
          value={day}
          onChange={(e)=>{setSelectedDay(e.target.value)}}
          className="select"
        >
          <option value=" " disabled>Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <input  type="file" onChange={e=>setFile(e.target.files[0])}></input>
      <button onClick={handleUpload}>Attach file</button>

      <button type="submit" className="button" onClick={handleUpdate}>
        Upload
      </button>
    </form>
  </div>
  );
};



export default InLabUpdate;
