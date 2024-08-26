import React, { useState } from 'react';
import axios from '../setupAxios';

const ToolUpdateStatus = ({ toolId, refreshTools }) => {
  const [status, setStatus] = useState('');

  const handleStatusChange = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
    try {
      await axios.patch(`${apiUrl}/tools/${toolId}/status`, { status });
      refreshTools();
      alert('Status da ferramenta atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o status da ferramenta', error);
      alert('Erro ao atualizar o status da ferramenta');
    }
  };

  return (
    <div>
      <h3>Atualizar Status da Ferramenta</h3>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Selecione o Status</option>
        <option value="Em estoque">Em estoque</option>
        <option value="Retirada">Retirada</option>
        <option value="Em manutenção">Em manutenção</option>
        <option value="Reparado">Reparado</option>
      </select>
      <button onClick={handleStatusChange}>Atualizar Status</button>
    </div>
  );
};

export default ToolUpdateStatus;
