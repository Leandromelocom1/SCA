import React, { useContext, useState, useEffect } from 'react';
import { AssetTypeContext } from '../context/AssetTypeContext';
import axios from 'axios';

const AssetRegisterForm = ({ refreshAssets }) => {
  const { assetTypes, fetchAssetTypes } = useContext(AssetTypeContext);
  const [name, setName] = useState('');
  const [assetType, setAssetType] = useState('');
  const [model, setModel] = useState('');   // Novo campo para Modelo
  const [brand, setBrand] = useState('');   // Novo campo para Marca
  const [currentKm, setCurrentKm] = useState('');   // Novo campo para KM atual
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAssetTypes();
  }, [fetchAssetTypes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      await axios.post(`${apiUrl}/assets`, {
        name,
        assetType,
        model,   // Incluindo modelo no envio
        brand,   // Incluindo marca no envio
        currentKm,   // Incluindo KM atual no envio
      });

      setName('');
      setAssetType('');
      setModel('');
      setBrand('');
      setCurrentKm('');
      setError('');
      refreshAssets();
      alert('Ativo registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar o ativo', error);
      setError(error.response?.data?.error || 'Erro ao registrar o ativo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 asset-register-form">
      <h2 className="mb-4">Registrar Ativo</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group mb-3">
        <label>Nome do Ativo:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Tipo de Ativo:</label>
        <select
          className="form-control"
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
          required
        >
          <option value="">Selecione um tipo de ativo</option>
          {assetTypes.map((assetType) => (
            <option key={assetType._id} value={assetType._id}>
              {assetType.name}
            </option>
          ))}
          <option value="carro-de-passeio">Carro de Passeio</option>
          <option value="caminhao">Caminhão</option>
          <option value="trator">Trator</option>
        </select>
      </div>
      <div className="form-group mb-3">
        <label>Modelo:</label>
        <input
          type="text"
          className="form-control"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Marca:</label>
        <input
          type="text"
          className="form-control"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>KM Atual:</label>
        <input
          type="number"
          className="form-control"
          value={currentKm}
          onChange={(e) => setCurrentKm(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Registrar</button>
    </form>
  );
};

export default AssetRegisterForm;
