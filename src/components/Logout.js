// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axiosConfig'; // Importa o arquivo de configuração do Axios

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      await axios.delete('/logout', { data: { token: refreshToken } });
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      onLogout(false);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
