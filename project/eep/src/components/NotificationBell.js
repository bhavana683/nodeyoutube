'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'styles/Notification.css';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:7001/api/auth/notifications", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Poll every minute
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:7001/api/auth/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true
      });
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="notification-container">
      <button onClick={() => setIsOpen(!isOpen)} className="notification-bell">
        🔔 {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      </button>
      {isOpen && (
        <div className="notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div 
                key={notification._id} 
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => handleMarkAsRead(notification._id)}
              >
                <p>{notification.message}</p>
                <small>{new Date(notification.createdAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;