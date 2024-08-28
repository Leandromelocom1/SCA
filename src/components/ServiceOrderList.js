import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceOrderList = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [attendant, setAttendant] = useState('');
  const [attendDescription, setAttendDescription] = useState('');

  useEffect(() => {
    const fetchServiceOrders = async () => {
      try {
        const response = await axios.get('http://192.168.0.78:5000/service-orders/list');
        setServiceOrders(response.data);
      } catch (error) {
        console.error('Erro ao buscar ordens de serviço:', error);
      }
    };

    fetchServiceOrders();
  }, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleAttendOrder = async () => {
    if (!selectedOrder) return;

    try {
      await axios.patch(`http://192.168.0.78:5000/service-orders/update/${selectedOrder._id}`, {
        status: 'Em andamento',
        attendant,
        attendDescription,
      });

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

  return (
    <div>
      <h2>Atendimento de Ordem de Serviço</h2>

      <div>
        <h4>Ordens de Serviço Disponíveis:</h4>
        <ul>
          {serviceOrders.map((order) => (
            <li key={order._id} onClick={() => handleSelectOrder(order)}>
              <strong>ID:</strong> {order._id} <br />
              <strong>Descrição:</strong> {order.description} <br />
              <strong>Equipamento:</strong> {order.equipment} <br />
              <strong>Prioridade:</strong> {order.priority} <br />
              <strong>Status:</strong> {order.status} <br />
              <strong>Data de Abertura:</strong> {new Date(order.createdAt).toLocaleString()} {/* Exibe a data de abertura */}
            </li>
          ))}
        </ul>
      </div>
      
      {selectedOrder && (
        <div>
          <h4>Atender OS</h4>
          <p><strong>ID:</strong> {selectedOrder._id}</p>
          <p><strong>Descrição:</strong> {selectedOrder.description}</p>
          <p><strong>Equipamento:</strong> {selectedOrder.equipment}</p>
          <p><strong>Prioridade:</strong> {selectedOrder.priority}</p>
          <p><strong>Data de Abertura:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p> {/* Exibe a data de abertura */}
          <div className="mb-3">
            <label htmlFor="attendant" className="form-label">Atendente:</label>
            <input
              type="text"
              id="attendant"
              className="form-control"
              value={attendant}
              onChange={(e) => setAttendant(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="attendDescription" className="form-label">Descrição do Atendimento:</label>
            <textarea
              id="attendDescription"
              className="form-control"
              value={attendDescription}
              onChange={(e) => setAttendDescription(e.target.value)}
            ></textarea>
          </div>
          <button onClick={handleAttendOrder} className="btn btn-primary">Atender OS</button>
        </div>
      )}
    </div>
  );
};

export default ServiceOrderList;
