/*
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'styles/UserProfile.css';

const UserProfile = ({ theme = 'light' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const sessionResponse = await axios.get('http://localhost:7001/api/auth/session', {
          withCredentials: true
        });
        
        const userEmail = sessionResponse.data.userEmail;
        
        if (!userEmail) {
          navigate('/SignIn');
          return;
        }

        const userResponse = await axios.get(`http://localhost:7001/api/auth/user?email=${userEmail}`, {
          withCredentials: true
        });
        
        if (userResponse.data.success) {
          const userData = userResponse.data.user;
          setUser({
            ...userData,
            // Fallback to email username if name is missing
            displayName: userData.name || userData.email.split('@')[0],
            // Fallback to 'User' if designation is missing
            displayDesignation: userData.designation || 'User',
            // Fallback to 'Member' if role is missing
            displayRole: userData.role || 'Member'
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          navigate('/SignIn');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:7001/api/auth/logout', {}, {
        withCredentials: true
      });
      navigate('/SignIn');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = () => {
    if (!user) return 'U';
    
    // For users with no name, use first letter of email
    if (!user.name && user.email) {
      return user.email[0].toUpperCase();
    }
    
    // Regular users with name
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return <div className={`profile-icon ${theme}`}>...</div>;
  }

  if (!user) {
    return <div className={`profile-icon ${theme}`}>U</div>;
  }

  return (
    <>
      <div 
        className={`profile-icon ${theme}`} 
        onClick={() => setIsModalOpen(true)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="Profile" className="profile-image" />
        ) : (
          <span className={`profile-initials ${theme}`}>
            {getInitials()}
          </span>
        )}
      </div>

      {isModalOpen && (
        <div className={`profile-modal-overlay ${theme}`} onClick={() => setIsModalOpen(false)}>
          <div className={`profile-modal-content ${theme}`} onClick={e => e.stopPropagation()}>
            <div className={`profile-modal-header ${theme}`}>
              <h3>User Profile</h3>
              <button onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            
            <div className={`profile-modal-body ${theme}`}>
              <div className={`profile-avatar-section ${theme}`}>
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="profile-large-avatar" />
                ) : (
                  <div className={`profile-avatar-placeholder ${theme}`}>
                    {getInitials()}
                  </div>
                )}
                <h4>{user.displayName}</h4>
                <p className={`profile-role-badge ${theme}`}>{user.displayRole}</p>
              </div>

              <div className={`profile-details-section ${theme}`}>
                <div className="profile-detail-row">
                  <span className={`profile-detail-label ${theme}`}>Designation:</span>
                  <span className={`profile-detail-value ${theme}`}>{user.displayDesignation}</span>
                </div>
                <div className="profile-detail-row">
                  <span className={`profile-detail-label ${theme}`}>Email:</span>
                  <span className={`profile-detail-value ${theme}`}>{user.email}</span>
                </div>
                {user.contact && (
                  <div className="profile-detail-row">
                    <span className={`profile-detail-label ${theme}`}>Contact:</span>
                    <span className={`profile-detail-value ${theme}`}>{user.contact}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={`profile-modal-footer ${theme}`}>
              <button className={`profile-logout-button ${theme}`} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'styles/UserProfile.css';

const UserProfile = ({ theme = 'light' }) => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Data fetching effect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const sessionResponse = await axios.get('http://localhost:7001/api/auth/session', {
          withCredentials: true
        });
        
        const userEmail = sessionResponse.data.userEmail;
        
        if (!userEmail) {
          navigate('/SignIn');
          return;
        }

        const userResponse = await axios.get(`http://localhost:7001/api/auth/user?email=${userEmail}`, {
          withCredentials: true
        });
        
        if (userResponse.data.success) {
          const userData = userResponse.data.user;
          setUser({
            ...userData,
            displayName: userData.name || userData.email.split('@')[0],
            displayDesignation: userData.designation || 'User',
            displayRole: userData.role || 'Member',
            // Ensure avatar URL is properly formatted
            avatar: userData.avatar?.startsWith('http') ? userData.avatar : null
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          navigate('/SignIn');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Helper function to generate initials
  const getInitials = () => {
    if (!user) return 'U';
    
    if (!user.name && user.email) {
      return user.email[0].toUpperCase();
    }
    
    return user.name.split(' ')
      .filter(name => name.length > 0)
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2); // Limit to 2 characters
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:7001/api/auth/logout', {}, {
        withCredentials: true
      });
      navigate('/SignIn');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Loading and error states
  if (loading) {
    return (
      <div className={`profile-icon ${theme}`} aria-busy="true">
        ...
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`profile-icon ${theme}`}>
        U
      </div>
    );
  }

  // Main component render
  return (
    <>
      {/* Profile icon/avatar */}
      <div 
        className={`profile-icon ${theme}`} 
        onClick={() => setIsModalOpen(true)}
        aria-label="User profile"
        role="button"
        tabIndex={0}
      >
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="profile-image" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : (
          <span className={`profile-initials ${theme}`}>
            {getInitials()}
          </span>
        )}
      </div>

      {/* Profile modal */}
      {isModalOpen && (
        <div 
          className={`profile-modal-overlay ${theme}`} 
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className={`profile-modal-content ${theme}`} 
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className={`profile-modal-header ${theme}`}>
              <h3>User Profile</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close profile"
              >
                &times;
              </button>
            </div>
            
            {/* Modal body */}
            <div className={`profile-modal-body ${theme}`}>
              <div className={`profile-avatar-section ${theme}`}>
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="User" 
                    className="profile-large-avatar"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div className={`profile-avatar-placeholder ${theme}`}>
                    {getInitials()}
                  </div>
                )}
                <h4>{user.displayName}</h4>
                <p className={`profile-role-badge ${theme}`}>
                  {user.displayRole}
                </p>
              </div>

              {/* User details */}
              <div className={`profile-details-section ${theme}`}>
                <div className="profile-detail-row">
                  <span className={`profile-detail-label ${theme}`}>
                    Designation:
                  </span>
                  <span className={`profile-detail-value ${theme}`}>
                    {user.displayDesignation}
                  </span>
                </div>
                <div className="profile-detail-row">
                  <span className={`profile-detail-label ${theme}`}>
                    Email:
                  </span>
                  <span className={`profile-detail-value ${theme}`}>
                    {user.email}
                  </span>
                </div>
                {user.contact && (
                  <div className="profile-detail-row">
                    <span className={`profile-detail-label ${theme}`}>
                      Contact:
                    </span>
                    <span className={`profile-detail-value ${theme}`}>
                      {user.contact}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal footer */}
            <div className={`profile-modal-footer ${theme}`}>
              <button 
                className={`profile-logout-button ${theme}`} 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;