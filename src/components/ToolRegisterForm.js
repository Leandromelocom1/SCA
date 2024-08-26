import React, { useState } from 'react';
import axios from 'axios';

const ToolRegisterForm = ({ refreshTools }) => {
  const [toolName, setToolName] = useState('');
  const [description, setDescription] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [status, setStatus] = useState('Em estoque'); // Definindo um status padrão
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se os campos estão preenchidos antes de enviar
    if (!toolName || !description || !serialNumber) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      
      // Enviar a solicitação para o backend
      const response = await axios.post(`${apiUrl}/tools`, {
        toolName,
        description,
        serialNumber,
        status,
      });

      // Verificar se o registro foi bem-sucedido
      if (response.status === 201) {
        alert('Ferramenta registrada com sucesso!');
        setToolName('');
        setDescription('');
        setSerialNumber('');
        setStatus('Em estoque');
        setError('');
        refreshTools();
      } else {
        throw new Error('Erro inesperado ao registrar a ferramenta.');
      }
    } catch (error) {
      console.error('Erro ao registrar a ferramenta:', error);

      // Verificar se há uma resposta de erro específica do backend
      if (error.response) {
        setError(error.response.data.error || 'Erro ao registrar a ferramenta.');
      } else {
        setError('Erro de conexão ou erro desconhecido.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 tool-register-form">
      <h2 className="mb-4">Registrar Ferramenta</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group mb-3">
        <label>Nome da Ferramenta:</label>
        <input
          type="text"
          className="form-control"
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Descrição:</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Número de Série:</label>
        <input
          type="text"
          className="form-control"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Registrar</button>
    </form>
  );
};

export default ToolRegisterForm;
