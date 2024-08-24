import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import AddImage from './components/AddImage';
import RemoveImage from './components/RemoveImage';
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog';
import RemoveBlog from './components/RemoveBlog';
import Logout from './components/Logout';
import BlogEditList from './components/showAllEditBlog';
import BlogList from './components/showAllBlog';
import AllImage from './components/AllImage';
import './App.css';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    return null;
};

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <div className="app-container">
                <header className="header">
                    <h1>Admin Panel</h1>
                </header>

                <div className="main-container">
                    <nav className="sidebar">
                        <ul className="sidebar-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/add-image">Add Crosel Image</Link></li>
                            <li><Link to="/remove-image">Remove Crosel Image</Link></li>
                            <li><Link to="/all-image">All Crosel Image</Link></li>
                            <li><Link to="/create-blog">Create Blog</Link></li>
                            <li><Link to="/all-blog">All Blog</Link></li>
                            <li><Link to="/edit-blog">Edit Blog</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </ul>
                    </nav>

                    <div className="content">
                        { <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/add-image" element={<AddImage />} />
                            <Route path="/remove-image" element={<RemoveImage />} />
                            <Route path="/all-image" element={<AllImage />} />
                            <Route path="/create-blog" element={<CreateBlog />} />
                            <Route path="/edit-blog" element={<BlogEditList/>} >
                            </Route>
                            <Route path='/edit-blog/:id' element={<EditBlog/>}></Route>
                            <Route path="/remove-blog" element={<RemoveBlog />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path='/all-blog' element={<BlogList/>}></Route>
                        </Routes> }
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
