import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl } from 'react-bootstrap';
import { AssetTypeProvider } from './context/AssetTypeContext';
import { BrandProvider } from './context/BrandContext';
import { ModelProvider } from './context/ModelContext';
import { DepartmentProvider } from './context/DepartmentContext';
import { AssetProvider } from './context/AssetContext';
import { FleetProvider } from './context/FleetContext';
import { AuthContext } from './context/AuthContext'; // Importação do AuthContext
import ToolRegisterForm from './components/ToolRegisterForm';
import WorkRegisterForm from './components/WorkRegisterForm';
import StockPage from './components/StockPage';
import WithdrawalForm from './components/WithdrawalForm';
import ReturnForm from './components/ReturnForm';
import MaintenancePage from './components/MaintenancePage';
import ReportsPage from './components/ReportsPage';
import Login from './components/Login';
import UserRegisterForm from './components/UserRegisterForm';
import SteelEntry from './components/SteelEntry';
import SteelExit from './components/SteelExit';
import SteelReport from './components/SteelReport';
import Dashboard from './components/Dashboard';
import AssetRegisterForm from './components/AssetRegisterForm';
import VehicleExitForm from './components/VehicleExitForm';
import VehicleReturnForm from './components/VehicleReturnForm';
import VehicleDashboard from './components/VehicleDashboard';
import DriverRegisterForm from './components/DriverRegisterForm';
import ManualConsultationPage from './components/ManualConsultationPage';
import ServiceOrderForm from './components/ServiceOrderForm';
import ServiceOrderManagement from './components/ServiceOrderManagement';
import EquipmentForm from './components/EquipmentForm';
// import './App.css';
import logo from './assets/logo.png';
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Usando o AuthContext
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [openOsCount, setOpenOsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate, setIsAuthenticated]);

  useEffect(() => {
    const fetchOpenOsCount = async () => {
      try {
        const response = await axios.get('http://192.168.0.78:5000/service-orders/list?status=Aberta');
        setOpenOsCount(response.data.length);
      } catch (error) {
        console.error('Erro ao buscar OS abertas:', error);
      }
    };

    fetchOpenOsCount();

    const interval = setInterval(fetchOpenOsCount, 60000); // Atualiza a cada 60 segundos
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(`http://192.168.0.78:5000/assets/search?query=${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Erro ao buscar ativos:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <AssetProvider>
      <AssetTypeProvider>
        <BrandProvider>
          <ModelProvider>
            <DepartmentProvider>
              <FleetProvider>
                <div className="App">
                  {isAuthenticated && (
                    <header className="App-header">
                      <Navbar bg="black" variant="dark" expand="lg">
                        <Container>
                          <Navbar.Brand as={Link} to="/">
                            <img
                              src={logo}
                              width="60"
                              height="40"
                              className="d-inline-block align-top"
                              alt="Company logo"
                            />
                            {' '}SCA
                          </Navbar.Brand>
                          <Navbar.Toggle aria-controls="basic-navbar-nav" />
                          <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                              <Nav.Link as={Link} to="/">Home</Nav.Link>
                              <NavDropdown title="Cadastro" id="cadastro-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/cadastrar-ferramenta">Ferramentas</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/cadastrar-obra">Obra</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/cadastrar-ativo">Veículo</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/cadastrar-motorista">Motorista</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/equipamentos">Equipamentos</NavDropdown.Item>
                                
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/cadastrar-usuario">Usuário</NavDropdown.Item>
                              </NavDropdown>
                              <NavDropdown title="Estoque" id="estoque-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/estoque">Visualizar Estoque</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/retirar-ferramenta">Retirar</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/devolver-ferramenta">Devolução</NavDropdown.Item>
                              </NavDropdown>
                              <NavDropdown title="Manutenção" id="manutencao-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/atendimento-ordem-servico">Atendimento de OS</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/ordem-servico">Ordem de Serviço</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/manutencao">Gestão de Manutenção</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/consulta-manual">Consulta de Manuais</NavDropdown.Item>
                              </NavDropdown>
                              <NavDropdown title="Relatórios" id="relatorios-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/relatorios">Relatórios de Ferramentas</NavDropdown.Item>
                              </NavDropdown>
                              <NavDropdown title="Veículos" id="gestao-ativos-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/gestao-frota">Saída de Veículo</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/retorno-veiculo">Retorno de Veículo</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/dashboard-veiculos">Dashboard de Veículos</NavDropdown.Item>
                              </NavDropdown>
                            </Nav>
                            <Nav>
                              <Nav.Link as={Link} to="/atendimento-ordem-servico">
                                <i className="fas fa-bell"></i>
                                {openOsCount > 0 && (
                                  <span className="badge badge-danger">{openOsCount}</span>
                                )}
                              </Nav.Link>
                              <Form className="d-flex">
                                <FormControl
                                  type="search"
                                  placeholder="Pesquisar"
                                  className="me-2"
                                  aria-label="Search"
                                  value={searchQuery}
                                  onChange={handleSearch}
                                />
                              </Form>
                              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </Nav>
                          </Navbar.Collapse>
                        </Container>
                      </Navbar>
                    </header>
                  )}

                  <Container className="mt-4">
                    <Routes>
                      <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
                      {isAuthenticated ? (
                        <>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/cadastrar-ferramenta" element={<ToolRegisterForm refreshTools={() => {}} />} />
                          <Route path="/cadastrar-obra" element={<WorkRegisterForm refreshWorks={() => {}} />} />
                          <Route path="/cadastrar-usuario" element={<UserRegisterForm refreshUsers={() => {}} />} />
                          <Route path="/cadastrar-ativo" element={<AssetRegisterForm refreshAssets={() => {}} />} />
                          <Route path="/cadastrar-motorista" element={<DriverRegisterForm />} />
                          <Route path="/estoque" element={<StockPage />} />
                          <Route path="/retirar-ferramenta" element={<WithdrawalForm refreshTools={() => {}} />} />
                          <Route path="/devolver-ferramenta" element={<ReturnForm refreshTools={() => {}} />} />
                          <Route path="/manutencao" element={<MaintenancePage />} />
                          <Route path="/consulta-manual" element={<ManualConsultationPage />} />
                          <Route path="/relatorios" element={<ReportsPage />} />
                          <Route path="/aco-entrada" element={<SteelEntry />} />
                          <Route path="/aco-saida" element={<SteelExit />} />
                          <Route path="/aco-relatorio" element={<SteelReport />} />
                          <Route path="/gestao-frota" element={<VehicleExitForm />} />
                          <Route path="/retorno-veiculo" element={<VehicleReturnForm />} />
                          <Route path="/dashboard-veiculos" element={<VehicleDashboard />} />
                          <Route path="/ordem-servico" element={<ServiceOrderForm />} />
                          <Route path="/atendimento-ordem-servico" element={<ServiceOrderManagement />} />
                          <Route path="/equipamentos" element={<EquipmentForm />} />
                        </>
                      ) : (
                        <Route path="/" element={<Login onLogin={setIsAuthenticated} />} />
                      )}
                    </Routes>
                  </Container>

                  {isAuthenticated && searchResults.length > 0 && (
                    <div className="search-results">
                      <ul>
                        {searchResults.map(result => (
                          <li key={result._id}>{result.nome}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {isAuthenticated && (
                    <footer className="App-footer">
                      <p>&copy; 2023 Sua Empresa. Todos os direitos reservados.</p>
                    </footer>
                  )}
                </div>
              </FleetProvider>
            </DepartmentProvider>
          </ModelProvider>
        </BrandProvider>
      </AssetTypeProvider>
    </AssetProvider>
  );
}

export default App;
