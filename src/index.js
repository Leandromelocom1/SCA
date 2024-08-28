// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Importando o AuthProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import './setupAxios';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <AuthProvider> {/* Envolvendo a aplicação com o AuthProvider */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);
