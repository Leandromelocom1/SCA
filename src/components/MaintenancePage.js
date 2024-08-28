import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const MaintenancePage = () => {
  const [defectiveTools, setDefectiveTools] = useState([]);
  const [problemDescription, setProblemDescription] = useState('');
  const [solutionDescription, setSolutionDescription] = useState('');
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [purchaseResponse, setPurchaseResponse] = useState('');

  useEffect(() => {
    const fetchDefectiveTools = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
        const response = await axios.get(`${apiUrl}/tools/defective`);
        setDefectiveTools(response.data);
      } catch (error) {
        console.error("Erro ao buscar as ferramentas com defeito", error);
      }
    };
    fetchDefectiveTools();
  }, []);

  const handleRepair = async (id) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      const response = await axios.patch(`${apiUrl}/tools/${id}/repair`, {
        solutionDescription,
      });

      if (response.data.status === 'Em estoque') {
        setDefectiveTools(defectiveTools.filter(tool => tool._id !== id));
        alert('Ferramenta marcada como reparada e retornada ao estoque.');
        setSolutionDescription('');
      } else {
        alert('Falha ao marcar a ferramenta como reparada.');
      }
    } catch (error) {
      console.error("Erro ao marcar a ferramenta como reparada", error);
      alert('Erro ao marcar a ferramenta como reparada.');
    }
  };

  const handleSendPurchaseRequest = async (toolId) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      const response = await axios.post(`${apiUrl}/tools/send-purchase-request`, {
        toolId,
        problemDescription,
        solutionDescription,
      });

      if (response.status === 200) {
        setIsRequestSent(true);
        alert('Solicitação de compra enviada com sucesso.');
      } else {
        alert('Falha ao enviar solicitação de compra.');
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação de compra:', error);
      alert('Erro ao enviar solicitação de compra.');
    }
  };

  const handlePartArrived = async (toolId) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      const response = await axios.patch(`${apiUrl}/tools/${toolId}/mark-part-arrived`);

      if (response.status === 200) {
        alert('Peça marcada como chegada.');
        setDefectiveTools(defectiveTools.map(tool => 
          tool._id === toolId ? { ...tool, isPartArrived: true } : tool
        ));
      } else {
        alert('Falha ao marcar a chegada da peça.');
      }
    } catch (error) {
      console.error('Erro ao marcar chegada da peça:', error);
      alert('Erro ao marcar chegada da peça.');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gestão de Manutenção</h1>
      <ul className="list-group">
        {defectiveTools.map((tool) => (
          <li key={tool._id} className="list-group-item d-flex justify-content-between align-items-start mb-3">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Ferramenta: {tool.toolName}</div>
              <div>Status: {tool.status}</div>
              <div>
                <label htmlFor={`problemDescription-${tool._id}`}>Descrição do Problema:</label>
                <textarea
                  id={`problemDescription-${tool._id}`}
                  className="form-control mb-2"
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  disabled={isRequestSent}
                />
              </div>
              <div>
                <label htmlFor={`solutionDescription-${tool._id}`}>Peças Necessárias:</label>
                <textarea
                  id={`solutionDescription-${tool._id}`}
                  className="form-control mb-2"
                  value={solutionDescription}
                  onChange={(e) => setSolutionDescription(e.target.value)}
                  disabled={isRequestSent}
                />
              </div>
              {tool.isPartArrived && (
                <div>
                  <label>Resposta de Compras:</label>
                  <textarea
                    className="form-control mb-2"
                    value="Peça disponível no estoque"
                    readOnly
                  />
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => handleRepair(tool._id)}
                className="btn btn-success me-2"
                disabled={isRequestSent}
              >
                Marcar como Reparado
              </button>
              <button
                onClick={() => handleSendPurchaseRequest(tool._id)}
                className="btn btn-primary me-2"
                disabled={isRequestSent}
              >
                Solicitar Peças
              </button>
              <button
                onClick={() => handlePartArrived(tool._id)}
                className={`btn ${tool.isPartArrived ? 'btn-warning' : 'btn-secondary'}`}
                disabled={tool.isPartArrived}
              >
                {tool.isPartArrived ? 'Peça Chegou' : 'Marcar Chegada de Peça'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenancePage;
