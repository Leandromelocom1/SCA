import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AssetTypeContext = createContext();

export const AssetTypeProvider = ({ children }) => {
  const [assetTypes, setAssetTypes] = useState([]);

  const fetchAssetTypes = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      const response = await axios.get(`${apiUrl}/asset-types`);
      setAssetTypes(response.data);
    } catch (error) {
      console.error('Erro ao buscar tipos de ativos:', error);
    }
  };

  useEffect(() => {
    fetchAssetTypes();
  }, []);

  return (
    <AssetTypeContext.Provider value={{ assetTypes, fetchAssetTypes }}>
      {children}
    </AssetTypeContext.Provider>
  );
};
