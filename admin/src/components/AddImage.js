import React, { useState } from 'react';
import axios from 'axios';
import './CreateBlog.css';

const AddImage = () => {
    const [imageData, setImageData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [fadeOut, setFadeOut] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleAddImage = async () => {
        if (!imageData) {
            setErrorMessage('Image is required');
            setSuccessMessage('');
            triggerFadeOut();
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg','image/webp'];
        if (!allowedTypes.includes(imageData.type)) {
            setErrorMessage('Only .jpg, .jpeg, .webp and .png files are allowed');
            setSuccessMessage('');
            triggerFadeOut();
            return;
        }
        const formData = new FormData();
        formData.append('cImage', imageData); // Correctly append image file to FormData
        setIsUploading(true);
        try {
            await axios.post('http://localhost:8000/api/v1/crousel/addCrousel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Image added successfully!');
            setErrorMessage('');
            clearForm();
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.message || 'Error uploading image');
            console.error('Error adding image:', error);
            setIsUploading(false);
        }

        triggerFadeOut();
        setIsUploading(false);
    };

    const clearForm = () => {
        setImageData(null);
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
        <div className='innerBox'>
            {errorMessage && <p className={`error ${fadeOut ? 'fade-out' : ''}`}>{errorMessage}</p>}
            {successMessage && <p className={`success ${fadeOut ? 'fade-out' : ''}`}>{successMessage}</p>}
            <h2>Add Image</h2>
            <br/>
            <input type="file" onChange={(e) => setImageData(e.target.files[0])} />
            <br/>
            <button onClick={handleAddImage} disabled={isUploading} className='btn-success'>
                {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
        </div>
    );
};

export default AddImage;
