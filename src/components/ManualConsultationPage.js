import React, { useState } from 'react';
import axios from 'axios';

const ManualConsultationPage = () => {
  const [manual, setManual] = useState(null);
  const [gptResponse, setGptResponse] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const handleManualUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('manual', manual);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      await axios.post(`${apiUrl}/manuals/upload-manual`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Manual carregado com sucesso.');
      setManual(null);
    } catch (error) {
      console.error('Erro ao carregar o manual', error);
      alert('Erro ao carregar o manual.');
    }
  };

  const handleGPTQuery = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      const response = await axios.post(`${apiUrl}/gpt/gpt-query`, { problemDescription });
      setGptResponse(response.data.solution);
    } catch (error) {
      console.error('Erro ao consultar o GPT', error);
      alert('Erro ao consultar o GPT.');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Consulta de Manuais</h1>
      <form onSubmit={handleManualUpload} className="mb-4">
        <div className="form-group">
          <label htmlFor="manual">Carregar Manual:</label>
          <input
            type="file"
            className="form-control"
            id="manual"
            onChange={(e) => setManual(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Carregar Manual</button>
      </form>
      <div className="mb-4">
        <label htmlFor="problemDescription">Descrição do Problema:</label>
        <textarea
          id="problemDescription"
          className="form-control mb-2"
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
        />
        <button onClick={handleGPTQuery} className="btn btn-secondary">Consultar GPT</button>
        {gptResponse && <div className="mt-3"><strong>Sugestão do GPT:</strong> {gptResponse}</div>}
      </div>
    </div>
  );
};

export default ManualConsultationPage;
