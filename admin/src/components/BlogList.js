import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogList.css';
import './blogCard.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/blog');
                const blogsArray = Array.isArray(response.data.data.data) ? response.data.data.data : [response.data.data.data];
                setBlogs(blogsArray);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const handleDeleteBlog = async (blogId) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/blog/deleteBlog?id=${blogId}`);
            setBlogs(blogs.filter(blog => blog._id !== blogId));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handlePreviewClick = (blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBlog(null);
    };

    return (
        <div className="blog-list">
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div key={blog._id} className={`blog-card ${isModalOpen ? 'modal-open' : ''}`}>
                        <img src={blog.blogImage} alt={blog.heading} className="blog-image" />
                        <div className="blog-card-content">
                            <h3>{blog.heading}</h3>
                            <p>{blog.detail.slice(0, 100)}...</p>
                        </div>
                        <div className="blog-card-actions">
                            <button onClick={() => handlePreviewClick(blog)} className="btn-preview">Preview Details</button>
                            <Link to={`/edit-blog/${blog._id}`} className="btn-edit">Edit</Link>
                            <button onClick={() => handleDeleteBlog(blog._id)} className="btn-delete">Remove</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No blogs available.</p>
            )}

            {/* Modal for full blog details */}
            {isModalOpen && selectedBlog && (
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={handleCloseModal}>&times;</span>
                        <img src={selectedBlog.blogImage} alt={selectedBlog.heading} className="modal-image" />
                        <h2>{selectedBlog.heading}</h2>
                        <h4>By: {selectedBlog.author || 'GrainIndia News@ Vinod Raghav  '}</h4>
                        <p>{selectedBlog.detail}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogList;
