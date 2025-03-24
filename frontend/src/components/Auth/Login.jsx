import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
          >
            Iniciar Sesión
          </button>
          <a className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800 cursor-pointer" href="/register">
            ¿No tienes cuenta? Regístrate
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;