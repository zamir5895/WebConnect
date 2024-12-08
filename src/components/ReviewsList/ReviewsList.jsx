import React, { useEffect, useState, useRef } from 'react';
import { getReviewsByPublicacionId, getCurrentUser, deleteReview } from '../../services/api';

const ReviewsList = ({ publicacionId }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const observer = useRef();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await getReviewsByPublicacionId(publicacionId, page, 10);
        setReviews((prevReviews) => {
          const newReviews = data.content.filter((review) =>
            !prevReviews.some((prevReview) => prevReview.reviewId === review.reviewId)
          );
          return [...prevReviews, ...newReviews];
        });
        setHasMore(!data.last);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [publicacionId, page]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const lastReviewElementRef = useRef();

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastReviewElementRef.current) {
      observer.current.observe(lastReviewElementRef.current);
    }
  }, [loading, hasMore]);

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews((prevReviews) => prevReviews.filter((review) => review.reviewId !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (error) return <p className="text-center text-2xl text-red-500">Error cargando las reviews: {error.message}</p>;

  return (
    <div className="mt-6">
      <h2 className="text-3xl font-bold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => {
          const isLastReview = reviews.length === index + 1;
          const isAuthor = currentUser && currentUser.id === review.autorId;

          return (
            <div
              ref={isLastReview ? lastReviewElementRef : null}
              key={review.reviewId}
              className="bg-gray-100 p-4 rounded-lg mb-4 shadow relative"
            >
              <div className="flex items-center mb-2">
                {review.autorFotoUrl ? (
                  <img src={review.autorFotoUrl} alt="Author" className="w-10 h-10 rounded-full mr-4" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                )}
                <div>
                  <h4 className="text-xl font-bold">{review.autorFullname}</h4>
                  <p className="text-sm text-gray-600">{new Date(review.dateTime).toLocaleDateString()}</p>
                </div>
                {isAuthor && (
                  <button
                    onClick={() => handleDelete(review.reviewId)}
                    className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Eliminar
                  </button>
                )}
              </div>
              <p className="text-lg text-gray-800 mb-2">{review.contenido}</p>
              <p className="text-lg text-yellow-500">
                {'★'.repeat(review.calificacion)}{' '}
                <span className="text-gray-600">({review.calificacion} estrellas)</span>
              </p>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No hay reviews disponibles.</p>
      )}
      {loading && <p className="text-center text-gray-500">Cargando más reviews...</p>}
    </div>
  );
};

export default ReviewsList;
