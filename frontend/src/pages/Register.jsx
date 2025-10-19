import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, { email, password });
      setSuccess(res.data.message || 'Usuario creado correctamente');
      // opcional: redirigir al login tras 1s
      setTimeout(() => navigate('/Login'), 1000);
    } catch (err) {
      if (err.response?.status === 409) {
        setError('El email ya está registrado');
      } else if (err.response?.data?.errorDetails) {
        setError(err.response.data.errorDetails);
      } else {
        setError('Error al registrar usuario');
      }
      console.error('Error al registrar usuario:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md transform transition-all hover:scale-105">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center mb-6">Registrarse</h1>

          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
