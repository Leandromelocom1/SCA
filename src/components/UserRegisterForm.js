import React, { useState } from 'react';
import axios from 'axios';

const UserRegisterForm = ({ refreshUsers }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Campo para o papel do usuário
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      await axios.post(`${apiUrl}/users`, {
        username,
        password,
        role, // Inclua o papel do usuário
      });

      setUsername('');
      setPassword('');
      setRole('');
      setError('');
      refreshUsers();
      alert('Usuário registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar o usuário', error);
      setError(error.response?.data?.error || 'Erro ao registrar o usuário.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 user-register-form">
      <h2 className="mb-4">Registrar Usuário</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group mb-3">
        <label>Nome de Usuário:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Senha:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Papel:</label>
        <input
          type="text"
          className="form-control"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Registrar</button>
    </form>
  );
};

export default UserRegisterForm;
