const Tool = require('../models/Tool');

// Método para buscar todas as ferramentas
const getTools = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as ferramentas' });
  }
};

// Método para criar uma nova ferramenta
const createTool = async (req, res) => {
  const { toolName, description, serialNumber } = req.body;
  console.log('Dados recebidos:', req.body); // Log dos dados recebidos
  try {
    const existingTool = await Tool.findOne({ serialNumber });
    if (existingTool) {
      return res.status(400).json({ error: 'Número de série já existe' });
    }
    const newTool = new Tool({ 
      toolName, 
      description, 
      serialNumber, 
      status: 'Em estoque' // Definindo explicitamente o status aqui
    });
    await newTool.save();
    res.status(201).json(newTool);
  } catch (error) {
    console.error('Erro ao criar a ferramenta:', error);
    res.status(400).json({ error: 'Erro ao criar a ferramenta' });
  }
};

// Método para buscar ferramentas disponíveis
const getAvailableTools = async (req, res) => {
  try {
    const availableTools = await Tool.find({ status: 'Em estoque' });
    res.json(availableTools);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as ferramentas disponíveis' });
  }
};

// Método para buscar ferramentas retiradas
const getWithdrawnTools = async (req, res) => {
  try {
    const withdrawnTools = await Tool.find({ status: 'Retirada' });
    res.json(withdrawnTools);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as ferramentas retiradas' });
  }
};

// Método para atualizar o status de uma ferramenta
const updateToolStatus = async (req, res) => {
  const { id } = req.params;
  const { status, problemDescription, solutionDescription } = req.body;
  
  try {
    const tool = await Tool.findById(id); // Primeiro, busca a ferramenta pelo ID
    if (!tool) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }

    // Atualiza os campos com os dados recebidos na requisição
    tool.status = status;
    if (problemDescription) tool.problemDescription = problemDescription;
    if (solutionDescription) tool.solutionDescription = solutionDescription;

    // Salva as alterações na ferramenta
    await tool.save();

    res.json(tool);
  } catch (error) {
    console.error('Erro ao atualizar o status da ferramenta:', error);
    res.status(500).json({ error: 'Erro ao atualizar o status da ferramenta' });
  }
};

module.exports = {
  getTools,
  createTool,
  getAvailableTools,
  getWithdrawnTools,
  updateToolStatus
};
