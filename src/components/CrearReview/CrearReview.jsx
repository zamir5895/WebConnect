import React, { useState, useEffect } from 'react';
import { createReview, getCurrentUser } from '../../services/api';

const CrearReview = ({ publicacionId }) => {
  const [reviewData, setReviewData] = useState({
    autorId: null,
    content: '',
    publicacionId: publicacionId,
    rating: 1,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setReviewData((prevData) => ({ ...prevData, autorId: user.id }));
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const adjustTextareaHeight = (event) => {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach((textarea) => {
      textarea.addEventListener('input', adjustTextareaHeight);
      adjustTextareaHeight({ target: textarea });
    });

    return () => {
      textareas.forEach((textarea) => {
        textarea.removeEventListener('input', adjustTextareaHeight);
      });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewData.content.length < 10 || reviewData.content.length > 250) {
      setError('El contenido debe tener entre 10 y 250 caracteres.');
      return;
    }
    try {
      await createReview(reviewData);
      setSuccess('Review creada exitosamente.');
      setError('');
      setReviewData((prevData) => ({ ...prevData, content: '', rating: 1 }));
    } catch (error) {
      setError('Error creando la review: ' + error.message);
      setSuccess('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setReviewData((prevData) => ({ ...prevData, rating: newRating }));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto mt-8 border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Crear Review</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Contenido
          </label>
          <textarea
            id="content"
            name="content"
            value={reviewData.content}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
            required
            minLength={10}
            maxLength={250}
            placeholder="Escribe tu review aquí..."
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Calificación</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`h-10 w-10 cursor-pointer transition-colors duration-200 ${
                  reviewData.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200">
          Enviar Review
        </button>
      </form>
    </div>
  );
};

export default CrearReview;
