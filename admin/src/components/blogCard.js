import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './blogCard.css'; // Import the CSS

const BlogCard = ({ blog, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/blog/deleteBlog?id=${blog._id}`);
            onDelete(blog._id);
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handlePreviewClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`blog-card ${isModalOpen ? 'modal-open' : ''}`}>
            <img src={blog.blogImage} alt={blog.heading} className="blog-image" />
            <div className="blog-card-content">
                <h3>{blog.heading}</h3>
                <p>{blog.detail.slice(0, 100)}...</p> {/* Show only the first 100 characters */}
            </div>
            <div className="blog-card-actions">
                <button onClick={handlePreviewClick} className="btn-preview">Preview Details</button>
                <Link to={`/edit-blog/${blog._id}`} className="btn-edit">Edit</Link>
                <button onClick={handleDeleteClick} className="btn-delete">Remove</button>
            </div>

            {/* Modal for full blog details */}
            {isModalOpen && (
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={handleCloseModal}>&times;</span>
                        <img src={blog.blogImage} alt={blog.heading} className="modal-image" />
                        <h2>{blog.heading}</h2>
                        <h4>By: {blog.author || 'GrainIndia News@ Vinod Raghav  '}</h4> {/* Add author if available */}
                        <p>{blog.detail}</p> {/* Show full details */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogCard;
