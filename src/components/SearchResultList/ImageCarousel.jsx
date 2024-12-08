import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia la imagen cada 5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative">
      {images.length > 0 ? (
        <img
          src={images[currentImageIndex].url_contenido}
          alt={`Imagen ${currentImageIndex}`}
          className="w-full h-48 object-cover"
        />
      ) : (
        <img
          src="default-image-url.jpg"
          alt="default"
          className="w-full h-48 object-cover"
        />
      )}
    </div>
  );
};

export default ImageCarousel;
