import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPosts, getCurrentUser } from '../../services/api';

const Postear = () => {
  const [formData, setFormData] = useState({
    Cuerpo: '',
    multimediaList: []
  });
  const [error, setError] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const profile = await getCurrentUser(token);
        setProfileInfo(profile);
      } catch (error) {
        setError('No has iniciado sesión o no estás registrado.');
      }
    };

    fetchProfile();
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
        ...formData,
        autorPId: profileInfo.id,
        multimediaList: formData.multimediaList || []
      };

      const formDataToSend = new FormData();
      formDataToSend.append('Cuerpo', postInicioDTO.Cuerpo);
      formDataToSend.append('autorPId', postInicioDTO.autorPId);
      postInicioDTO.multimediaList.forEach((file) => {
        formDataToSend.append('multimediaList', file);
      });

      await addPosts(formDataToSend);
      setFormData({
        Cuerpo: '',
        multimediaList: []
      });
      setSuccessMessage(true);
    } catch (error) {
      setError('Failed to create post. Please try again.');
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate('/entrance')}
          >
            Registrate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-4">Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Cuerpo">
            Cuerpo
          </label>
          <textarea
            id="Cuerpo"
            name="Cuerpo"
            value={formData.Cuerpo}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="multimediaList">
            Archivos Multimedia
          </label>
          <input
            type="file"
            id="multimediaList"
            name="multimediaList"
            multiple
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {successMessage && <div className="text-green-500 text-center mb-4">Post creado exitosamente</div>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Postear;