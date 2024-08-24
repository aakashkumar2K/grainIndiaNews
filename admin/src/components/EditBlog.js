import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './EditBlog.css';

const EditBlog = () => {
    const { id: blogId } = useParams();
    const [blogData, setBlogData] = useState({});
    const [prevImage, setPrevImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/blog/blogg?id=${blogId}`);
                setBlogData(response.data.data);
                setPrevImage(response.data.data.blogImage);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };
        fetchBlog();
    }, [blogId]);

    const handleEditBlog = async () => {
        const formData = new FormData();
        formData.append('heading', blogData.heading);
        formData.append('detail', blogData.detail);
        formData.append('prevString', prevImage);
        if (blogData.blogImage) {
            formData.append('blogImage', blogData.blogImage);
        }

        try {
            setIsUploading(true);
            await axios.put(`http://localhost:8000/api/v1/blog/updateBlog?id=${blogId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Blog updated successfully!');
            setFadeOut(true);
            setTimeout(() => {
                setSuccessMessage('');
                setFadeOut(false);
                setIsUploading(false);
            }, 3000);
        } catch (error) {
            setErrorMessage('Error editing blog!');
            setFadeOut(true);
            setTimeout(() => {
                setErrorMessage('');
                setFadeOut(false);
                setIsUploading(false);
            }, 3000);
        }
        triggerFadeOut();
        setIsUploading(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBlogData({ ...blogData, blogImage: file });
        setFilePreview(URL.createObjectURL(file));
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
    return (
        <div className="innerBox">
      
            <h3>Edit Blog</h3>
            <br />
            {filePreview ? (
                <img src={filePreview} alt="Preview" className="preview-image" />
            ) : (
                <img src={prevImage} alt="Current" className="preview-image" />
            )}
            <input type="file" onChange={handleImageChange} />
            <br />
            <input
                type="text"
                placeholder="Heading"
                value={blogData.heading || ''}
                onChange={(e) => setBlogData({ ...blogData, heading: e.target.value })}
            />
            <textarea
                placeholder="Detail"
                value={blogData.detail || ''}
                onChange={(e) => setBlogData({ ...blogData, detail: e.target.value })}
                rows="8"  
            />
            <br />
            {errorMessage && <p className={`error ${fadeOut ? 'fade-out' : ''}`}>{errorMessage}</p>}
            {successMessage && <p className={`success ${fadeOut ? 'fade-out' : ''}`}>{successMessage}</p>}
            <br/>
            <Link to={`/edit-blog`} className="btn-copy">Cancel</Link>
            <button
                onClick={handleEditBlog}
                className="btn-success"
                disabled={isUploading}
            >
                {isUploading ? 'Uploading...' : 'Edit Blog'}
            </button>
           
        </div>
    );
};

export default EditBlog;
