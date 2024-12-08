import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../../services/api';
import Post from './Post';

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

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && hasMore && !loading) {
      loadMore();
    }
  };

  return (
    <div className="flex flex-col items-center w-full lg:w-3/4 h-full p-4 overflow-y-auto" onScroll={handleScroll}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {loading && <p className="text-center text-gray-500">Cargando más publicaciones...</p>}
    </div>
  );
};

export default ScrollablePosts;
