import React from 'react';
import axios from 'axios';

import './CreateBlog.css';
const Logout = () => {
    const handleLogout = async() => {
        // Implement logout logic

        try {
            await axios.post('http://localhost:3000/api/v1/admin/logout');
            alert('Blog updated successfully!');
        } catch (error) {
            console.error('Error editing blog:', error);
        }
        alert('Logged out successfully!');
    };

    return (
        < div className='innerBox'> 
        <h3>Are you sure you want to log out?</h3>
        <button >cancel</button>
        <button onClick={handleLogout} className="btn-success">
            Logout
        </button>
        
        </div> 
    );
};

export default Logout;
