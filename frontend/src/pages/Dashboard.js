import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${currentUser.id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        logout();
        navigate('/register');
      } else {
        alert('Failed to delete account');
      }
    } catch (error) {
      alert('Error deleting account');
    }
  };
  
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {currentUser.email}!</p>
      
      <div>
        <p>This is your protected dashboard.</p>
        <p>User ID: {currentUser.id}</p>
      </div>
      
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default Dashboard;