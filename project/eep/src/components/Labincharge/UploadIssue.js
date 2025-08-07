/*'use client';
import React, { useEffect, useState } from 'react';
 // Import the CSS file
 import 'styles/InUpload.css'; 
 import axios from 'axios';

const UploadIssue = () => {

  const [issue, setIssue] = useState('');
  const [requirement, setRequirement] = useState('');
  const [labNo, setLabNo] = useState('');
  const [media, setMedia] = useState(null);
  const [issueTime, setIssueTime] = useState('');
  const [issueIdentifiedBy, setIssueIdentifiedBy] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  // Handle file selection (Choose from files)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaType(file.type.startsWith('image') ? 'image' : 'video');
    }
  };

  // Handle camera capture (Take photo/video)
  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaType(file.type.startsWith('image') ? 'image' : 'video');
    }
  };
   // Remove selected file
   const handleRemoveFile = () => {
    setMedia(null);
    setMediaType('');
    setShowPreview(false);
  };

  // Close preview on click
  
  const  handlePreviewClick = () => {
    setShowPreview(false);
  }
  

  const handlePost = async () => {
    if (!issue || !requirement || !labNo || !issueTime || !issueIdentifiedBy) {
      alert('Please fill all fields before posting.');
    } else {
      const formData = new FormData();
      formData.append('issue', issue);
      formData.append('description', requirement);
      formData.append('labNo', labNo);
      formData.append('issueTime', issueTime);
      formData.append('postedBy', issueIdentifiedBy);
  
      if (media) {
        formData.append(mediaType, media);
      }
         
      try {
        const response = await axios.post(
          'http://localhost:7001/api/auth/inupload-issue',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('Issue posted successfully!');
        console.log(response.data);
        
        // Reset fields after posting
        setIssue('');
        setRequirement('');
        setLabNo('');
        setIssueTime('');
        setIssueIdentifiedBy('');
        setMedia(null);
        setMediaType('');
      } catch (error) {
        console.error('Error posting issue:', error);
        alert('Failed to post issue.');
      }
    };
    }
  

  return (
    <form  action="POST" onSubmit={handlePost}>
    <div className="incontainer">
      <input
        type="text"
        placeholder="Issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Requirement"
        value={requirement}
        onChange={(e) => setRequirement(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Lab No"
        value={labNo}
        onChange={(e) => setLabNo(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Issue Time"
        value={issueTime}
        onChange={(e) => setIssueTime(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Issue Identified By"
        value={issueIdentifiedBy}
        onChange={(e) => setIssueIdentifiedBy(e.target.value)}
        className="input"
      />
      <br />
       /* File upload section 
       <div className="mediaUpload">
          <p>Upload Image or Video:</p>
          <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
        </div>

        {/* Camera capture options (Opens camera directly) 
        <div className="mediaCapture">
          <p>Capture Image:</p>
          <input type="file" accept="image/*" capture="environment" onChange={handleCapture} />
          
          <p>Capture Video:</p>
          <input type="file" accept="video/*" capture="environment" onChange={handleCapture} />
        </div>


        {/* Show preview if media is selected 
        {media && (
          <div className="previewContainer">
            {/* X button to remove file 
            <button className="removeButton" onClick={handleRemoveFile}>X</button>
            
            {/* Click on preview to hide (but not remove file) 
            
            {mediaType === 'image' ? (
              <img
                src={URL.createObjectURL(media)}
                alt="Preview"
                className={`previewImage ${showPreview ? 'visible' : 'hidden'}`}
                onClick={handlePreviewClick}
              />
            ) : (
              <video controls className={`previewVideo ${showPreview ? 'visible' : 'hidden'}`}>
                <source src={URL.createObjectURL(media)} type={media.type} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

      <button onClick={handlePost} className="button">
        Post
      </button>
    </div>
    </form>
  );
};




export default UploadIssue;*/
import React, { useState } from "react";
import axios from "axios";
import '../../styles/InUpload.css'

const UploadIssue = () => {
    const [issue, setIssue] = useState("");
    const [description, setDescription] = useState("");
    const [labNo, setLabNo] = useState("");
    const [issuetime, setIssueTime] = useState(""); // Corrected here
    const [postedBy, setPostedBy] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState("");
    const [preview, setPreview] = useState(null);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setMedia(file);
        setMediaType(e.target.name);
        setPreview(URL.createObjectURL(file));
    };

    const handlePost = async (e) => {
        e.preventDefault();
        console.log(issue);

        if (!issue || !description || !labNo || !issuetime || !postedBy) {
            alert("Please fill all fields before posting.");
            return;
        }
       // const form =document.querySelector('form')
        /*const formData = new FormData();
        formData.append("issue", issue);
        formData.append("description", description);
        formData.append("labNo", labNo);
        formData.append("issuetime", issuetime); // Corrected here
        formData.append("postedBy", postedBy);

        if (media) {
            formData.append(mediaType, media);
        }
        console.log(`Form Data: ${formData.get(issue)}`); 
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
      }*/
      

        try {
          const response = await axios.post(
            "http://localhost:7001/api/auth/inupload-issue",{
              issue,
              description,
              labNo,
              issuetime,
              postedBy,
              
            },{headers:{
              "Content-Type":"application/json"
            },withCredentials:true}
          );
  
          
          
      
         /* const data = await response.json();
          alert("Issue posted successfully!");
          console.log(data);
          if (!response.ok) {
              throw new Error(data.message || `Error: ${response.statusText}`);
          }*/

      
          // Reset form fields
          setIssue("");
          setDescription("");
          setLabNo("");
          setIssueTime("");
          setPostedBy("");
          setMedia(null);
          setMediaType("");
          setPreview(null);
      } catch (error) {
          console.log("Error posting issue:", error);
          alert("Failed to post issue.");
      }
      
    };

    return (
        <div className="container">
            <h2>Post an Issue</h2>
            <form  name="form"onSubmit={handlePost}>
                <label>Issue:</label>
                <input type="text" name="issue" value={issue} onChange={(e) => setIssue(e.target.value)} required />

                <label>Description:</label>
                <textarea  name="description"value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label>Lab No:</label>
                <input type="text" name="labNo"value={labNo} onChange={(e) => setLabNo(e.target.value)} required />

                <label>Issue Time:</label>
                <input type="datetime-local" name="issuetime"value={issuetime} onChange={(e) => setIssueTime(e.target.value)} required />

                <label>Posted By:</label>
                <input type="text"name="postedBy" value={postedBy} onChange={(e) => setPostedBy(e.target.value)} required />

                <label>Upload Image:</label>
                <input type="file" name="image" accept="image/*" onChange={handleMediaChange} />

                
                

                {preview && (
                    <div>
                        <p>Preview:</p>
                        {mediaType === "image" ? (
                            <img src={preview} alt="Preview" style={{ width: "200px" }} />
                        ) : (
                            <video src={preview} controls style={{ width: "200px" }} />
                        )}
                    </div>
                )}

                <button type="submit">Submit Issue</button>
            </form>
        </div>
    );
};

export default  UploadIssue;
