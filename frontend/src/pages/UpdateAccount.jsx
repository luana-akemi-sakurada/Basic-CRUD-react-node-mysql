import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UpdateAccount() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Only include password in update if it was provided
      const updateData = { email };
      if (password) {
        updateData.password = password;
      }
      
      const response = await fetch(`http://localhost:8000/users/${currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      if (response.ok) {
        alert('Account updated successfully');
        // If the email changed, we should log out the user
        if (email !== currentUser.email) {
          logout();
          navigate('/login');
        } else {
          navigate('/dashboard');
        }
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update account');
      }
    } catch (error) {
      setError('Error updating account');
    }
  };
  
  const handleCancel = () => {
    navigate('/dashboard');
  };
  
  return (
    <div>
      <h2>Update Account</h2>
      
      {error && <p>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password">New Password (leave blank to keep current):</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div>
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit">Update Account</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateAccount;