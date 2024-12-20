import React, { useState, useEffect, useRef } from 'react';
import { FaImage, FaVideo, FaPoll, FaCalendarAlt } from 'react-icons/fa';
import { addPosts, getCurrentUser } from '../../services/api';
import ScrollablePosts from '../ScrollablePosts/ScrollablePosts';

const Postear = () => {
  const [formData, setFormData] = useState({
    cuerpo: '',
    multimediaList: []
  });
  const [error, setError] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [pending, setPending] = useState(false);
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
    const adjustTextareaHeight = (textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const textarea = textareaRef.current;
    if (textarea) {
      const handleInput = () => adjustTextareaHeight(textarea);
      textarea.addEventListener('input', handleInput);
      adjustTextareaHeight(textarea);

      return () => {
        textarea.removeEventListener('input', handleInput);
      };
    }
  }, [formData.cuerpo]);

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
    setPending(true);
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
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-4 justify-between text-sm w-full">
      {profileInfo && (
        <img
          src={profileInfo.fotoUrl || '/noAvatar.png'}
          alt="avatar"
          className="w-12 h-12 object-cover rounded-full"
        />
      )}
      <div className="flex-1 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="cuerpo">¿Qué estás pensando?</label>
            <textarea
              ref={textareaRef}
              id="cuerpo"
              placeholder="¿Qué estás pensando?"
              name="cuerpo"
              value={formData.cuerpo}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded text-lg resize-none overflow-hidden"
              rows="1"
            />
          </div>
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
            <button
              type="submit"
              className="bg-blue-500 p-2 mt-2 rounded-md text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={pending}
            >
              {pending ? (
                <div className="flex items-center gap-2">
                  <div className="inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                  Enviando...
                </div>
              ) : (
                "Postear"
              )}
            </button>
          </div>
        </form>
        {successMessage && <div className="text-green-500 text-center mt-4">Post creado exitosamente</div>}
      </div>
      <ScrollablePosts />
    </div>
  );
};

export default Postear;
