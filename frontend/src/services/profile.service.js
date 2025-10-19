import axios from './root.service.js';

export async function getProfile() {
    try {
        const response = await axios.get('/profile/private');
        return response.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener perfil' };
    }
}

export async function modifyProfile(data) {
    try {
        const response = await axios.patch('/profile/private', data);
        return response.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al actualizar perfil' };
    }
}

export async function deleteProfile() {
    try {
        const response = await axios.delete('/profile/private');
        return response.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al eliminar perfil' };
    }
}
