import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div className="mb-4 p-4 border rounded">
      <h3 className="font-bold">{post.username}</h3>
      <p>{post.contenido}</p>
      {/* Render multimedia items if any */}
      {post.multimediaInicioDTO && post.multimediaInicioDTO.map(media => (
        <div key={media.id}>
          {/* Assuming media.url is the URL to the media file */}
          <img src={media.url} alt="Media content" />
        </div>
      ))}
      <div className="text-sm text-gray-500">{new Date(post.fechaPublicacion).toLocaleString()}</div>
    </div>
  );
};

export default PostItem;
