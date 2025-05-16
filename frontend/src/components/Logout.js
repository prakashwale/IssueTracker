import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Button 
      variant="outline-light" 
      onClick={handleLogout}
      className="logout-button"
      size="sm"
    >
      <FaSignOutAlt /> Logout
    </Button>
  );
};

export default Logout; 