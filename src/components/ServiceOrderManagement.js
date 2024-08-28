import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceOrderManagement = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [attendant, setAttendant] = useState('');
  const [attendDescription, setAttendDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchServiceOrders = async () => {
      try {
        let url = 'http://192.168.0.78:5000/service-orders/list';
        const params = new URLSearchParams();

        // Adicionar filtros de status, data inicial e data final, se disponíveis
        if (statusFilter) params.append('status', statusFilter);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await axios.get(url);
        setServiceOrders(response.data);
      } catch (error) {
        console.error('Erro ao buscar ordens de serviço:', error);
      }
    };

    fetchServiceOrders();
  }, [statusFilter, startDate, endDate]);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setAttendant(order.attendant || '');
    setAttendDescription(order.attendDescription || '');
  };

  const handleAttendOrder = async () => {
    if (!selectedOrder) return;

    try {
      const payload = {
        status: 'Em andamento',
        attendant,
        attendDescription,
        priority: selectedOrder.priority,
        equipment: selectedOrder.equipment,
      };

      console.log("Dados enviados para o servidor:", payload);

      await axios.patch(`http://192.168.0.78:5000/service-orders/update/${selectedOrder._id}`, payload);

      alert('Ordem de serviço atendida com sucesso!');
      setAttendant('');
      setAttendDescription('');
      setSelectedOrder(null);

      // Recarregar a lista de ordens de serviço
      const response = await axios.get('http://192.168.0.78:5000/service-orders/list');
      setServiceOrders(response.data);
    } catch (error) {
      console.error('Erro ao atender a ordem de serviço:', error);
      alert('Erro ao atender a ordem de serviço.');
    }
  };

  const handleCloseOrder = async () => {
    if (!selectedOrder) return;

    try {
      const payload = {
        status: 'Fechada',
        attendant,
        attendDescription,
        priority: selectedOrder.priority,
        equipment: selectedOrder.equipment,
      };

      console.log("Dados enviados para o servidor:", payload);

      await axios.patch(`http://192.168.0.78:5000/service-orders/update/${selectedOrder._id}`, payload);

      alert('Ordem de serviço fechada com sucesso!');
      setAttendant('');
      setAttendDescription('');
      setSelectedOrder(null);

      // Redirecionar para o filtro de OS fechadas
      setStatusFilter('Fechada');
    } catch (error) {
      console.error('Erro ao fechar a ordem de serviço:', error);
      alert('Erro ao fechar a ordem de serviço.');
    }
  };

  return (
    <div>
      <h2>Atendimento de Ordens de Serviço</h2>

      <div className="filters">
        <div className="mb-3">
          <label htmlFor="statusFilter" className="form-label">Filtrar por Status:</label>
          <select
            id="statusFilter"
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Aberta">Aberta</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Fechada">Fechada</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Data Inicial:</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">Data Final:</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <ul>
        {serviceOrders.map(order => (
          <li key={order._id} onClick={() => handleSelectOrder(order)}>
            <strong>ID:</strong> {order._id} <br />
            <strong>Descrição:</strong> {order.description} <br />
            <strong>Equipamento:</strong> {order.equipment} <br />
            <strong>Prioridade:</strong> {order.priority} <br />
            <strong>Status:</strong> {order.status} <br />
            <strong>Data de Abertura:</strong> {new Date(order.createdAt).toLocaleDateString()} <br />
            {selectedOrder && selectedOrder._id === order._id && (
              <div>
                <div className="mb-3">
                  <label htmlFor="attendant" className="form-label">Atendente:</label>
                  <input
                    type="text"
                    id="attendant"
                    className="form-control"
                    value={attendant}
                    onChange={(e) => setAttendant(e.target.value)}
                    disabled={order.status === 'Fechada'}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="attendDescription" className="form-label">Descrição do Atendimento:</label>
                  <textarea
                    id="attendDescription"
                    className="form-control"
                    value={attendDescription}
                    onChange={(e) => setAttendDescription(e.target.value)}
                    disabled={order.status === 'Fechada'}
                  ></textarea>
                </div>
                <button onClick={handleAttendOrder} className="btn btn-primary" disabled={order.status === 'Fechada'}>Atender OS</button>
                <button onClick={handleCloseOrder} className="btn btn-danger" disabled={order.status === 'Fechada'}>Fechar OS</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceOrderManagement;
