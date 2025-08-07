/*import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin ,useGoogleLogin} from "@react-oauth/google";
import SignIn from "SignIn";
import { googleAuth } from "./api";
import { useNavigate } from "react-router-dom";
const GoogleLoginButton = () => {
 const [role, setRole] = useState("");
 const navigate=useNavigate();
  const navigateBasedOnRole = (role) => {
    if (role === "admin") navigate("/admin");
    else if (role === "incharge") navigate("/incharge");
    else if (role === "technician") navigate("/technician");
  };
  const responseGoogle=async (authResult)=>{
    
try{
   
  console.log(authResult)
  if(authResult['code']){
    const  result=await googleAuth(authResult['code'],)
    const{email,name,image,role}=result.data.user;
    console.log(result.data.user)
    navigateBasedOnRole(result.data.user.role);
    
  }
  }
catch(err){
console.log(err)
}
  }
   const googleLogin=useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:'auth-code'
  })
  
  return (
    <div>
      <p>select your role</p>
      <button onClick={()=>{setRole('admin')}}>admin</button>
      <br></br>
      <button onClick={()=>{setRole('incharge')}}>incharge</button>
      <br></br>
      <button onClick={()=>{setRole('technician')}}>technician</button>
      <br></br>
    <button onClick={googleLogin}>signin with google </button>
    </div>
  );

};

 
export default GoogleLoginButton;
*/
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const [showDialog, setShowDialog] = useState(true);
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        const role  = result.data.user.role;
        
        // Navigate based on role
        if (role === "admin") navigate("/admin");
        else if (role === "incharge") navigate("/incharge");
        else if (role === "technician") navigate("/technician");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      setShowDialog(true); // Reopen dialog on error
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Google login error:", error);
      setShowDialog(true);
    },
    flow: "auth-code"
  });

  const handleContinue = () => {
    setShowDialog(false);
    googleLogin();
  };

  const handleClose = () => {
    navigate(-1); // Go back
  };

  // Dialog styles
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    dialog: {
      backgroundColor: 'white',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '400px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    title: {
      fontSize: '1.2rem',
      marginBottom: '15px',
      color: '#333'
    },
    content: {
      marginBottom: '20px',
      color: '#666'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px'
    },
    button: {
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.9rem'
    },
    cancelButton: {
      backgroundColor: '#f0f0f0',
      color: '#333'
    },
    continueButton: {
      backgroundColor: '#4285f4',
      color: 'white'
    }
  };

  if (!showDialog) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h3 style={styles.title}>Continue with Google</h3>
        <p style={styles.content}>
          You'll be redirected to Google to sign in to your account.
        </p>
        <div style={styles.buttonContainer}>
          <button 
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button 
            style={{ ...styles.button, ...styles.continueButton }}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginButton;