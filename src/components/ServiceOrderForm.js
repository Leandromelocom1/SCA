import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceOrderForm = () => {
  const [description, setDescription] = useState('');
  const [equipment, setEquipment] = useState('');
  const [priority, setPriority] = useState('Baixa');
  const [requester, setRequester] = useState('');
  const [equipments, setEquipments] = useState([]); // Estado para armazenar os equipamentos

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get('http://192.168.0.78:5000/equipments/list');
        setEquipments(response.data);
      } catch (error) {
        console.error('Erro ao buscar equipamentos:', error);
      }
    };

    fetchEquipments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://192.168.0.78:5000/service-orders/create', {
        description,
        equipment,
        priority,
        requester,
        status: 'Pendente',
      });

      alert('Ordem de serviço criada com sucesso!');
      setDescription('');
      setEquipment('');
      setPriority('Baixa');
      setRequester('');
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
      alert('Erro ao criar ordem de serviço.');
    }
  };

  return (
    <div>
      <h2>Criar Ordem de Serviço</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descrição do Problema:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="equipment" className="form-label">Equipamento:</label>
          <select
            id="equipment"
            className="form-select"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            required
          >
            <option value="">Selecione um equipamento</option>
            {equipments.map((eq) => (
              <option key={eq._id} value={eq.name}>
                {eq.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">Prioridade:</label>
          <select
            id="priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="requester" className="form-label">Solicitante:</label>
          <input
            type="text"
            id="requester"
            className="form-control"
            value={requester}
            onChange={(e) => setRequester(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Criar OS</button>
      </form>
    </div>
  );
};

export default ServiceOrderForm;
