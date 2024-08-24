 import React, { useState } from 'react';
import axios from 'axios';
import './CreateBlog.css';

const CreateBlog = () => {
    const [blogData, setBlogData] = useState({ heading: '', detail: '', blogImage: null });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [fadeOut, setFadeOut] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    

    const handleCreateBlog = async () => {
        if (!blogData.heading) {
            setErrorMessage('Heading is required');
            triggerFadeOut()
            return;
        }
        
        const formData = new FormData();
        formData.append('heading', blogData.heading);
        formData.append('detail', blogData.detail);
        if (blogData.blogImage) {
            formData.append('blogImage', blogData.blogImage);
        }
        setIsUploading(true);

        try {
            await axios.post('http://localhost:8000/api/v1/blog/addBlog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Blog created successfully!');
            setErrorMessage('');
            setSuccessMessage('Blog created successfully!');
            clearForm();
            setIsUploading(false);

        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response.message || 'Error creating blog');
            setIsUploading(false);
        }
        triggerFadeOut();
        setIsUploading(false);
    };
    const clearForm = () => {
        setBlogData({ heading: '', detail: '', blogImage: null });
    };
    const triggerFadeOut = () => {
        setTimeout(() => {
            setFadeOut(true);
        }, 2000); // Start fading out after 2 seconds
        setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
            setFadeOut(false); // Reset fade-out class for next use
        }, 4000); // Completely remove messages after 4 seconds
    };
    const handleImageChange = (e) => {
        setBlogData({ ...blogData, blogImage: e.target.files[0] });
    };

    return (
        <div className='innerBox'>
            <h2>Create Blog</h2>
            {errorMessage && <p className={`error ${fadeOut ? 'fade-out' : ''}`}>{errorMessage}</p>}
            {successMessage && <p className={`success ${fadeOut ? 'fade-out' : ''}`}>{successMessage}</p>}
            <br/>

            <label>Heading for the Image</label>
            <input
                type="text"
                placeholder="Title"
                value={blogData.heading}
                onChange={(e) => setBlogData({ ...blogData, heading: e.target.value })}
                required
            />
            <br/>

            <label>Content for the Blog</label>
            <br/>
            <textarea
                placeholder="Content" 
                rows="15"
                value={blogData.detail}
                onChange={(e) => setBlogData({ ...blogData, detail: e.target.value })}
            />
            <br/>

            <label>Upload Image for the Blog</label>
            <input type='file' onChange={handleImageChange}/>
            <br/>

            <button onClick={handleCreateBlog} className='btn-success'> {isUploading ? 'Uploading...' : 'Upload Blog'}</button>
            <button className="reset" onClick={clearForm}>Reset</button>
        </div>
    );
};

export default CreateBlog;
