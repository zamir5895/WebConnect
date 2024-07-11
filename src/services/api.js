import axios from 'axios'

// Configuración global de Axios
//axios.defaults.baseURL = 'http://localhost:8080/api';

axios.defaults.baseURL = 'http://localhost:8080/api';

export const getRoleBasedOnToken = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  return decodedToken.role;
}


export const checkApiStatus = async () => {
  try {
    const response = await axios.get('');
    return true;
  } catch (e) {
    return false;
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData , {
    headers: {
      'Content-Type': 'application/json'
  }
});
return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getApartmentsPosts = async (page, distancia, maxPrecio, minPrecio, tipoMoneda, latitude, longuitude) => {
  try {
    const response = await axios.get(`/alojamiento/dashboard`, {
      params: {
        page: page - 1,
        size: 5,
        distancia: distancia,
        maxPrecio: maxPrecio,
        minPrecio: minPrecio,
        tipoMoneda: tipoMoneda,
        latitude: latitude,
        longuitude: longuitude
      }
    });
    return response.data.content;
  } catch (error) {
    throw (error);
  }
}

export const fetchPostInfoByApartmentId = async (id) => {
  try {
    const response = await axios.get(`/publicacionAlojamiento/id/${id}`);
    return response.data;
  } catch (e) {
    throw (e);
  }
};

export const getAllApartmentsPosts = async (page) => {
  try {
    const response = await axios.get(`/alojamiento/dashboard/all`, {
      params: {
        page: page - 1,
        size: 5
      }
    });
    return response;
  } catch (error) {
    throw (error);
  }

}

export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get('/user/perfil', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const addPosts = async (postData) => {
  try {
    const response = await axios.post('/publicacionInicio', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',

      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async (page, size) => {
  try {
    const response = await axios.get(`/publicacionInicio?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLikesByPublicacion = async (publicacionId) => {
  try {
    const response = await axios.get(`/likes/publicacion/${publicacionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addLike = async (publicacionId, userId) => {
  try {
    await axios.post(`/likes/${publicacionId}/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const removeLike = async (publicacionId, userId) => {
  try {
    await axios.delete(`/likes/${publicacionId}/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const addReply = async (postId, parentId, formData) => {
  try {
    const response = await axios.post(`/comentarios/${postId}/commentario/${parentId}/respuestas`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editComment = async (postId, commentId, content) => {
  try {
    const response = await axios.patch(`/comentarios/${postId}/comentario/${commentId}`, content);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeComment = async (postId, commentId) => {
  try {
    await axios.delete(`/comentarios/${postId}/comentario/${commentId}`);
  } catch (error) {
    throw error;
  }
};

export const addComment = async (postId, commentData) => {
  try {
    const response = await axios.post(`/comentarios/${postId}`, commentData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getCommentsByPublicacion = async (postId, page = 0, size = 10) => {
  try {
    const response = await axios.get(`/comentarios/${postId}/comentario`, {
      params: { page, size }
    });
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const getRepliesByComment = async (postId, parentId, page = 0, size = 10) => {
  try {
    const response = await axios.get(`/comentarios/${postId}/comentario/${parentId}/respuestas`, {
      params: { page, size }
    });
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const getFriends = async (userId) => {
  try {
    const response = await axios.get(`/amigos/${userId}/friends`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProfile = async (token) => {
  try {
    const response = await axios.get('/user/perfilMasInformacion', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateProfile = async (token, updateData) => {
  try {
    const response = await axios.put('/user/update', updateData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const crearPublicacionAlojamiento = async (publicacionAlojamientoDTO) => {
  try {
    const response = await axios.post('/publicacionAlojamiento', publicacionAlojamientoDTO, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllChats = async (token) => {
  const response = await axios.get(`${API_URL}/chat/user`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getChatMessages = async (chatId, page, size, token) => {
  const response = await axios.get(`${API_URL}/messages/${chatId}/mensajes`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, size }
  });
  return response.data;
};

export const sendMessage = async (message, token) => {
  const response = await axios.post(`${API_URL}/messages/create`, message, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const fetchChats = async () => {
  try {
    const response = await axios.get('/api/chat/user', {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};

export const fetchMessages = async (chatId) => {
  try {
    const response = await axios.get(`/api/messages/${chatId}/mensajes`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      params: { page: 0, size: 20 }
    });
    return response.data.content;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export default axios;
