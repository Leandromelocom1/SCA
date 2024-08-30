import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../App.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://192.168.0.78:5000';
      const response = await axios.post(`${apiUrl}/auth/login`, { username, password });

      // Salva o token e as permissões no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('permissions', JSON.stringify(response.data.permissions));

      onLogin(true);

      // Redireciona para o dashboard após o login
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login', error.response ? error.response.data : error.message);
      setError(error.response?.data?.error || 'Erro ao fazer login.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit} className="login-form">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group mb-3">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
