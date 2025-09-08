Lab Requirement Management System

The Lab Requirement Management System is a MERN stack web application designed to streamline how laboratories handle issues, requirements, and updates. It provides an organized workflow where Lab Incharges, Technicians, and Admins each play specific roles in managing and tracking lab activities.
This system ensures accountability, transparency, and faster resolution of lab-related problems by combining role-based dashboards, cloud database storage, and secure authentication.

Live Application

🌐 Frontend: https://labrfrontend.onrender.com
⚙️ Backend API: https://labrequirement.onrender.com

Roles & Responsibilities

Lab Incharge
Creates and updates lab issues, shares announcements (timetables, exams, practicals), and views past and ongoing updates.

Technician
Views issues and lab updates, accepts tasks, posts updates on progress, and tracks the complete history of issues.

Admin
Oversees all activity, monitors issues and updates, but does not directly modify data.

Core Features

Authentication & authorization with JWT tokens.
Role-based dashboards tailored to Incharge, Technician, and Admin.
MongoDB Atlas integration for secure cloud data storage.
User-friendly React + TailwindCSS frontend.
Deployed on Render for real-time access.
Tracks full history of lab issues and their status.

Tech Stack

Frontend: React.js, TailwindCSS
Backend: Node.js, Express.js
Database: MongoDB Atlas
Authentication: JWT
Hosting: Render

Running locally
1.clone the repository
2.install backend dependencies -->npm install
3.configure .env -->conncetionString,JWT_SECRET,PORT
4.install front end dependencies


