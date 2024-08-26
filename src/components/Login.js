import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      const response = await axios.post(`${apiUrl}/auth/login`, { username, password });

      // Salva o token no localStorage e define o estado de autenticação
      localStorage.setItem('token', response.data.token);
      onLogin(true);

      // Redireciona para o dashboard após o login
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login', error.response ? error.response.data : error.message);
      setError(error.response?.data?.error || 'Erro ao fazer login.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 login-form">
      <h2 className="mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group mb-3">
        <label>Username:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
