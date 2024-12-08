import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPosts, getCurrentUser } from '../../services/api';
import { FaImage, FaVideo, FaPoll, FaCalendarAlt } from 'react-icons/fa';

const Postear = () => {
  const [formData, setFormData] = useState({
    cuerpo: '',
    multimediaList: []
  });
  const [error, setError] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No has iniciado sesión o no estás registrado.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const profile = await getCurrentUser(token);
        setProfileInfo(profile);
      } catch (error) {
        setError('No has iniciado sesión o no estás registrado.');
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      multimediaList: [...e.target.files]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postInicioDTO = {
        cuerpo: formData.cuerpo,
        autorPId: profileInfo.id,
      };

      const formDataToSend = new FormData();
      formDataToSend.append('data', new Blob([JSON.stringify(postInicioDTO)], { type: 'application/json' }));

      if (formData.multimediaList.length > 0) {
        formData.multimediaList.forEach((file) => {
          formDataToSend.append('files', file);
        });
      }

      await addPosts(formDataToSend);
      setFormData({
        cuerpo: '',
        multimediaList: []
      });
      setSuccessMessage(true);
      console.log('Post creado exitosamente');
    } catch (error) {
      setError('Failed to create post. Please try again.');
    }
  };

  const adjustTextareaHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-4 justify-between text-sm">
      {profileInfo && (
        <img
          src={profileInfo.fotoUrl || '/noAvatar.png'}
          alt="avatar"
          className="w-12 h-12 object-cover rounded-full"
        />
      )}
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            ref={textareaRef}
            placeholder="¿Qué estás pensando?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            name="cuerpo"
            value={formData.cuerpo}
            onChange={handleInputChange}
            rows="1"
            style={{ overflow: 'hidden' }}
          ></textarea>
          <div className="flex items-center">
            <label className="cursor-pointer">
              <FaImage className="text-gray-500 w-5 h-5" />
              <input
                type="file"
                id="multimediaList"
                name="multimediaList"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <FaImage className="text-gray-500 w-5 h-5" />
              <span>Foto</span>
            </label>
            <div className="flex items-center gap-2 cursor-pointer">
              <FaVideo className="text-gray-500 w-5 h-5" />
              <span>Video</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <FaPoll className="text-gray-500 w-5 h-5" />
              <span>Encuesta</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <FaCalendarAlt className="text-gray-500 w-5 h-5" />
              <span>Evento</span>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
              Publicar
            </button>
          </div>
        </form>
        {successMessage && <div className="text-green-500 text-center mt-4">Post creado exitosamente</div>}
      </div>
    </div>
  );
};

export default Postear;
