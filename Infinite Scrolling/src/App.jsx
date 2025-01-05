import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos?client_id=lghAGHGXG1JixJFfimhB43gDbvrv__e7C4388gyDoMs&page=${page}&per_page=10`
      );
      
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (windowHeight + scrollTop >= documentHeight - 10 && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <>
    <h1>Infinite Scrolling  Image Gallery</h1>
    <div className="image-gallery">
      {images.map((image) => (
        <div key={image.id} className="image-container">
          <a href={image.links.html} target="_blank" rel="noopener noreferrer">
            <img src={image.urls.small} alt={image.alt_description} />
          </a>
          <div className="image-overlay">
            <p>{image.alt_description || 'No description available'}</p>
            <p>By: {image.user.name}</p>
          </div>
        </div>
      ))}
      {loading && <p>Loading more images...</p>}
      {!hasMore && <p>No more images to load.</p>}
    </div></>
  );
};

export default ImageGallery;
