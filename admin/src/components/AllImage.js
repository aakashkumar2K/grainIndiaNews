import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RemoveImage.css';

const AllImage = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/crousel');
                const blogsArray = Array.isArray(response.data.data.data) ? response.data.data.data: [response.data.dat.data];
                setImages(blogsArray); // Adjust according to your API structure
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    

    const handlePreviewImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="remove-image-container">
            <h3>Remove Image</h3>
            {images.length === 0 ? (
                <p>No images found.</p>
            ) : (
                <div className="image-grid">
                    {images.map(image => (
                        <div key={image._id} className="image-card">
                            <img src={image.cImage} alt={image.name} className="image-preview" />
                            <div className="card-content">
                                <h4>{image.name}</h4>
                                <button onClick={() => handlePreviewImage(image.cImage)}>Preview</button>
                                
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedImage && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <img src={selectedImage} alt="Preview" className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllImage;
