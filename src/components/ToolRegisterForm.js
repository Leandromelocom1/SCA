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
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      await axios.post(`${apiUrl}/tools`, {
        toolName,
        description,
        serialNumber,
        status,
      });

      setToolName('');
      setDescription('');
      setSerialNumber('');
      setStatus('Em estoque');
      setError('');
      refreshTools();
      alert('Ferramenta registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar a ferramenta', error);
      setError(error.response?.data?.error || 'Erro ao registrar a ferramenta.');
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
