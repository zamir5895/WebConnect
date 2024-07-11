import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../../services/api';

const ScrollablePosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await getAllPosts(page, 10);
        setPosts((prevPosts) => [...prevPosts, ...data.content]);
        setHasMore(!data.last);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="w-full lg:w-3/4 overflow-auto" onScroll={(e) => {
      if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && hasMore && !loading) {
        loadMore();
      }
    }}>
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-5 mb-5">
          <h3 className="text-xl font-bold">{post.contenido}</h3>
          <p>{post.username}</p>
          <p>{new Date(post.fechaPublicacion).toLocaleString()}</p>
          {/* Renderiza otros detalles del post aquí */}
        </div>
      ))}
      {loading && <p>Cargando más publicaciones...</p>}
    </div>
  );
};

export default ScrollablePosts;
 