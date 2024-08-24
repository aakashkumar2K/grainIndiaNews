import React, { useState } from 'react';
import axios from 'axios';

const RemoveBlog = () => {
    const[blogs,setBlogs]=useState([]);
    //useEffect()
    const handleRemoveBlog = async (blogId) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/blog/${blogId}`);
            alert('Blog removed successfully!');
        } catch (error) {
            console.error('Error removing blog:', error);
        }
    };

    return (
        <div>
            <h3>Remove Blog</h3>
            <input type="text" placeholder="Blog ID" onChange={(e) => handleRemoveBlog(e.target.value)} />
        </div>
    );
};

export default RemoveBlog;
