import React, { createContext, useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Certifique-se de que o axiosConfig.js está corretamente configurado

const ToolsContext = createContext();

export const ToolsProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTools = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please log in');
      setError('No token found, please log in');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('/tools');
      setTools(response.data);
    } catch (error) {
      console.error('Erro ao buscar as ferramentas', error);
      setError('Erro ao buscar as ferramentas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <ToolsContext.Provider value={{ tools, fetchTools, loading, error }}>
      {children}
    </ToolsContext.Provider>
  );
};

export default ToolsContext;
