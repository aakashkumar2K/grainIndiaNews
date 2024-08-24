import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h2>Admin Panel</h2>
            <ul className="menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add-image">Add Crosel Image</Link></li>
                <li><Link to="/remove-image">Remove Crosel Image</Link></li>
                <li><Link to="/remove-image">All Crosel Image</Link></li>
                <li><Link to="/create-blog">Create Blog</Link></li>
                <li><Link to="/create-blog">All Blog</Link></li>
                <li><Link to="/edit-blog">Edit Blog</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </div>
    );
};

export default Home;
