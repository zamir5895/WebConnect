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
    const response = await axios.post(`/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
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

export const postLike = async (publicacionId, userId) => {
  try {
    await axios.post(`/likes/${publicacionId}/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const deleteLike = async (publicacionId, userId) => {
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
export const crearPublicacionAlojamiento = async (formData) => {
  try {
    const response = await axios.post('/publicacionAlojamiento', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMisPublicaciones = async(propietarioId, page = 0, size = 10) => {
  try{
    const response =await axios.get(`/publicacionAlojamiento/mispublicaciones/${propietarioId}`, {
      params: { page, size }
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo publicaciones', error);
    throw error;
  }
};
export const getAllAlojamientos = async (page, size) => {
  try {
    const response = await axios.get(`/publicacionAlojamiento?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    throw (error);
  }
}

export const updateTitle = async (publicacionId, title) => {
  try {
    await axios.patch(`/publicacionAlojamiento/${publicacionId}/actualizar`, title, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw error;
  }
};

export const updateDescription = async (alojamientoId, descripcion) => {
  try {
    await axios.patch(`/alojamiento/alojamientos/descripcion/${alojamientoId}`, { descripcion }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw error;
  }
};


export const updateEstado = async (alojamientoId, estado) => {
  try {
    await axios.patch(`/alojamiento/disponibilidad/${alojamientoId}`, { estado });
  } catch (error) {
    throw error;
  }
};


export const updateImage = async (alojamientoId, imagenId, imagen) => {
  try {
    const formData = new FormData();
    formData.append('file', imagen);

    await axios.patch(`/alojamiento/imagen/${alojamientoId}/${imagenId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  } catch (error) {
    throw error;
  }
};


export const updatePrice = async (alojamientoId, priceDTO) => {
  try {
    await axios.patch(`/alojamiento/alojamientos/${alojamientoId}`, priceDTO, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw error;
  }
};


export const updateUbicacion = async (alojamientoId, ubicacionDTO) => {
  try {
    await axios.patch(`/alojamiento/alojamientos/ubicacion/${alojamientoId}`, ubicacionDTO, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (alojamientoId, imagenId) => {
  try {
    await axios.delete(`/alojamiento/imagen/${alojamientoId}/${imagenId}`);
  } catch (error) {
    throw error;
  }
};



export const deletePublicacion = async (publicacionId) => {
  try {
    await axios.delete(`/publicacionAlojamiento/${publicacionId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getAlojamiento = async (alojamientoId) => {
  try {
    const response = await axios.get(`/alojamiento/${alojamientoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const buscarPublicaciones = async (keyword) => {
  try {
    const response = await axios.get(`/publicacionAlojamiento/buscar`, {
      params: { keyword },
    });
    return response.data;
    console.log('Respuesta de la API:', response.data); 

  } catch (error) {
    console.error('Error al buscar publicaciones:', error);
    throw error;
  }
};

export const getAlojamientoDetails = async (publicacionId) => {
  try {
    const response = await axios.get(`/publicacionAlojamiento/${publicacionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await axios.post('/review', reviewData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create review');
  }
};

export const getReviewsByPublicacionId = async (publicacionId, page, size) => {
  try {
    const response = await axios.get(`/review/${publicacionId}?page=${page}&size=${size}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reviews');
  }
};


export const deleteReview = async (reviewId) => {
  await axios.delete(`/review/${reviewId}`);
};



export default axios;
