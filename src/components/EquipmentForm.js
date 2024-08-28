import React, { useState } from 'react';
import axios from 'axios';

const EquipmentForm = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://192.168.0.78:5000/equipments/create', {
        name: equipmentName,
        type: equipmentType,
      });

      alert('Equipamento cadastrado com sucesso!');
      setEquipmentName('');
      setEquipmentType('');
    } catch (error) {
      console.error('Erro ao cadastrar o equipamento:', error);
      alert('Erro ao cadastrar o equipamento.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Equipamento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="equipmentName" className="form-label">Nome do Equipamento:</label>
          <input
            type="text"
            id="equipmentName"
            className="form-control"
            value={equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="equipmentType" className="form-label">Tipo de Equipamento:</label>
          <input
            type="text"
            id="equipmentType"
            className="form-control"
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
};

export default EquipmentForm;
