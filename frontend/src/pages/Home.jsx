import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { getProfile, deleteProfile, modifyProfile } from '@services/profile.service';

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [showModifyForm, setShowModifyForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleGetProfile = async () => {
    try {
      const res = await getProfile();
      setProfileData(res);
    } catch (error) {
      setProfileData({ error: 'Error al obtener perfil' });
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const res = await deleteProfile();
      setProfileData(null);
      // logout local user and navigate to root
      logout();
      alert(res.message || 'Perfil eliminado correctamente');
      navigate('/');
    } catch (error) {
      setProfileData({ error: 'Error al eliminar perfil' });
    }
  };

  const submitModifyForm = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      if (newEmail) payload.email = newEmail;
      if (newPassword) payload.password = newPassword;
      const res = await modifyProfile(payload);
      alert(res.message || 'Perfil modificado correctamente');
      setShowModifyForm(false);
      // refrescar perfil
      handleGetProfile();
    } catch (error) {
      setProfileData({ error: 'Error al modificar perfil' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Página de Inicio
        </h1>

        <button 
          onClick={handleGetProfile} 
          className="w-full mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Obtener Perfil
        </button>

        {profileData && (
          <div className="mt-2 bg-gray-50 rounded-xl p-6 border border-gray-200">
            {profileData.error ? (
              <div className="text-red-600">{profileData.error}</div>
            ) : (
              <div>
                <div className="font-semibold mb-2">{profileData.message}</div>
                <div className="text-sm text-gray-700">Email: {profileData.data?.userData?.email}</div>
                <div className="text-sm text-gray-700">Password: {profileData.data?.userData?.password}</div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button 
            onClick={handleDeleteProfile} 
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            Eliminar perfil
          </button>

          <button 
            onClick={() => setShowModifyForm(!showModifyForm)} 
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            Modificar perfil
          </button>
        </div>

        {showModifyForm && (
          <form onSubmit={submitModifyForm} className="mt-4 bg-white p-4 rounded-md border">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-700">Nuevo email</label>
              <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="nuevo@ejemplo.com" className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-700">Nueva contraseña</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="********" className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar cambios</button>
              <button type="button" onClick={() => setShowModifyForm(false)} className="bg-gray-200 px-4 py-2 rounded">Cancelar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
