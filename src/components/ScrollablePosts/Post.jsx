import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-5 w-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex items-center mb-4">
        {post.fotPerfilUrl ? (
          <img src={post.fotPerfilUrl} alt="Profile" className="w-12 h-12 rounded-full mr-4 border-2 border-gray-200" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-800">{post.username}</h3>
          <p className="text-sm text-gray-500">{new Date(post.fechaPublicacion).toLocaleString()}</p>
        </div>
      </div>
      <p className="mb-4 text-gray-700">{post.contenido}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-500">
          <svg className="w-6 h-6 mr-1 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>{post.cantidadLikes}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <svg className="w-6 h-6 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-6 0a9 9 0 1118 0 9 9 0 11-18 0z"></path>
          </svg>
          <span>{post.cantidadComentarios}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
