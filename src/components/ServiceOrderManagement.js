import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceOrderManagement = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [attendant, setAttendant] = useState('');
  const [attendDescription, setAttendDescription] = useState('');
  const [isAttendClicked, setIsAttendClicked] = useState(false);

  useEffect(() => {
    const fetchServiceOrders = async () => {
      try {
        const response = await axios.get('http://192.168.0.78:5000/service-orders');
        setServiceOrders(response.data);
      } catch (error) {
        console.error('Erro ao buscar ordens de serviço:', error);
      }
    };

    fetchServiceOrders();
  }, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setIsAttendClicked(false);
  };

  const handleAttendOrder = async () => {
    if (!selectedOrder) return;

    const dataToSend = {
      status: 'Em andamento',
      attendant,
      attendDescription,
    };

    console.log('Dados enviados para o servidor:', dataToSend);

    try {
      await axios.patch(`http://192.168.0.78:5000/service-orders/update/${selectedOrder._id}`, dataToSend);

      alert('Ordem de serviço atendida com sucesso!');
      setIsAttendClicked(true);
      setAttendDescription('');

      const response = await axios.get('http://192.168.0.78:5000/service-orders');
      setServiceOrders(response.data);
    } catch (error) {
      console.error('Erro ao atender a ordem de serviço:', error);
      alert('Erro ao atender a ordem de serviço.');
    }
  };

  const handleCloseOrder = async () => {
    if (!selectedOrder) return;

    const dataToSend = {
      status: 'Concluída',
      attendDescription,
    };

    console.log('Dados enviados para fechar a OS:', dataToSend);

    try {
      await axios.patch(`http://192.168.0.78:5000/service-orders/update/${selectedOrder._id}`, dataToSend);

      alert('Ordem de serviço fechada com sucesso!');
      setSelectedOrder(null);
      setIsAttendClicked(false);

      const response = await axios.get('http://192.168.0.78:5000/service-orders');
      setServiceOrders(response.data);
    } catch (error) {
      console.error('Erro ao fechar a ordem de serviço:', error);
      alert('Erro ao fechar a ordem de serviço.');
    }
  };

  return (
    <div>
      <h2>Atendimento de Ordem de Serviço</h2>
      <ul>
        {serviceOrders.map(order => (
          <li key={order._id} onClick={() => handleSelectOrder(order)}>
            <strong>ID:</strong> {order._id} <br />
            <strong>Descrição:</strong> {order.description} <br />
            <strong>Equipamento:</strong> {order.equipment} <br />
            <strong>Prioridade:</strong> {order.priority} <br />
            <strong>Status:</strong> {order.status} <br />
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <div>
          <h4>Atender OS</h4>
          <p><strong>ID:</strong> {selectedOrder._id}</p>
          <p><strong>Descrição:</strong> {selectedOrder.description}</p>
          <p><strong>Equipamento:</strong> {selectedOrder.equipment}</p>
          <p><strong>Prioridade:</strong> {selectedOrder.priority}</p>
          <div className="mb-3">
            <label htmlFor="attendant" className="form-label">Atendente:</label>
            <input
              type="text"
              id="attendant"
              className="form-control"
              value={attendant}
              onChange={(e) => setAttendant(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="attendDescription" className="form-label">Descrição do Atendimento:</label>
            <textarea
              id="attendDescription"
              className="form-control"
              value={attendDescription}
              onChange={(e) => setAttendDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button onClick={handleAttendOrder} className="btn btn-primary">
            Atender OS
          </button>
          <button 
            onClick={handleCloseOrder} 
            className="btn btn-secondary mt-2" 
            disabled={!isAttendClicked}
          >
            Fechar OS
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceOrderManagement;
