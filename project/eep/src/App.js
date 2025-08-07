
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LabRequirementManagement from './LabRequirementManagement'; // Assuming this path is correct
import SignIn from './SignIn';
import SignUp from './SignUp';
import AdminDashboard from './components/Admin/AdminDashboard';  // Correct path
import ViewHistory from './components/Admin/ViewHistory';  // Correct path
import LabUpdate from './components/Admin/LabUpdate';  // Correct path
import IssueUpdate from './components/Admin/IssueUpdate';  // Correct path
import DashboardHome from './components/Admin/DashboardHome';  // Correct path

import ResetPassword from './ResetPassword.js';
import GoogleLoginButton from './GoogleLoginButton';
import Labincharge from 'components/Labincharge/Labincharge';
import Dashboard from './components/Labincharge/Dashboard';
import IssUpdate from './components/Labincharge/IssUpdate';
import UploadIssue from 'components/Labincharge/UploadIssue';
import InViewHistory from 'components/Labincharge/InViewHistory';
import InLabUpdate from 'components/Labincharge/InLabUpdate';

import Technician from 'components/Technician/Technician';
import Accept from 'components/Technician/Accept';
import TechDashboard from 'components/Technician/TechDashboard';
import TechIssueUpdate from 'components/Technician/TechIssueUpdate';
import  TechViewHistory from 'components/Technician/TechViewHistory';
import TechLabUpdate from 'components/Technician/TechLabUpdate'
import { GoogleOAuthProvider, GoogleLogin ,useGoogleLogin} from "@react-oauth/google";
const App = () => {

  

  
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<LabRequirementManagement />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        
        <Route path="/SignUp" element={<SignUp />} />
        
        
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<DashboardHome />} /> 
          <Route path="view-history" element={<ViewHistory />} />
          <Route path="lab-update" element={<LabUpdate />} />
          <Route path="issue-update" element={<IssueUpdate />} />
        </Route>

        <Route path="/incharge" element={<Labincharge />}>
          <Route index element={<Dashboard/>} /> 
          <Route path="inview_history" element={<InViewHistory />} />
          <Route path="inlab-update" element={<InLabUpdate />} />
          <Route path="inissue-update" element={<IssUpdate />} />
          <Route path="inupload-issue" element={<UploadIssue />} />
        </Route>

        <Route path="/technician" element={<Technician />}>
          <Route index element={<TechDashboard/>} /> 
          <Route path="accept" element={<Accept/>} />
          <Route path="techviewhi" element={<TechViewHistory />} />
          <Route path="techlab-update" element={< TechLabUpdate/>} />
          <Route path="techissue-update" element={<TechIssueUpdate />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
/*
import React from "react";
import "./App.css";

import Cropper from "react-easy-crop";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';


import { generateDownload } from "./utils/cropImage";

export default function App() {
	const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

	const onDownload = () => {
		generateDownload(image, croppedArea);
	};

	return (
		<div className='container'>
			<div className='container-cropper'>
				{image ? (
					<>
						<div className='cropper'>
							<Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>

						<div className='slider'>
							<Slider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={(e, zoom) => setZoom(zoom)}
							/>
						</div>
					</>
				) : null}
			</div>

			<div className='container-buttons'>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={triggerFileSelectPopup}
					style={{ marginRight: "10px" }}
				>
					Choose
				</Button>
				<Button variant='contained' color='secondary' onClick={onDownload}>
					Download
				</Button>
			</div>
		</div>
	);
}*/