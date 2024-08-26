const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const Tool = require('../models/Tool');

// Função para realizar o web scraping no Mercado Livre
const searchPartOnMercadoLivre = async (partName) => {
  const searchUrl = `https://lista.mercadolivre.com.br/${encodeURIComponent(partName)}`;

  try {
    const { data } = await axios.get(searchUrl);
    const $ = cheerio.load(data);

    const results = [];
    $('.ui-search-result__content-wrapper').slice(0, 5).each((i, element) => {
      const title = $(element).find('.ui-search-item__title').text().trim();
      const link = $(element).find('.ui-search-link').attr('href');
      const price = $(element).find('.price-tag-fraction').text().trim();

      results.push({ title, link, price });
    });

    return results;
  } catch (error) {
    console.error('Erro ao realizar o scraping:', error);
    return [];
  }
};

// Configurando o transporte SMTP para Locaweb
const transporter = nodemailer.createTransport({
  host: 'email-ssl.com.br',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

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
  console.log('Dados recebidos:', req.body);
  try {
    const existingTool = await Tool.findOne({ serialNumber });
    if (existingTool) {
      return res.status(400).json({ error: 'Número de série já existe' });
    }
    const newTool = new Tool({ 
      toolName, 
      description, 
      serialNumber, 
      status: 'Em estoque'
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

// Método para buscar ferramentas com defeito
const getDefectiveTools = async (req, res) => {
  try {
    const defectiveTools = await Tool.find({ status: 'Em manutenção' });
    res.json(defectiveTools);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as ferramentas com defeito' });
  }
};

// Método para atualizar o status de uma ferramenta
const updateToolStatus = async (req, res) => {
  const { id } = req.params;
  const { status, problemDescription, solutionDescription } = req.body;
  
  try {
    const tool = await Tool.findById(id);
    if (!tool) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }

    tool.status = status;
    if (problemDescription) tool.problemDescription = problemDescription;
    if (solutionDescription) tool.solutionDescription = solutionDescription;

    await tool.save();
    res.json(tool);
  } catch (error) {
    console.error('Erro ao atualizar o status da ferramenta:', error);
    res.status(500).json({ error: 'Erro ao atualizar o status da ferramenta' });
  }
};

// Método para marcar a ferramenta como reparada
const repairTool = async (req, res) => {
  const { id } = req.params;
  const { solutionDescription } = req.body;

  try {
    const tool = await Tool.findById(id);
    if (!tool) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }

    tool.status = 'Em estoque';
    tool.solutionDescription = solutionDescription || 'Reparação realizada';

    await tool.save();
    res.json(tool);
  } catch (error) {
    console.error('Erro ao marcar a ferramenta como reparada:', error);
    res.status(500).json({ error: 'Erro ao marcar a ferramenta como reparada' });
  }
};

// Método para enviar email de solicitação de compra de peças com resultados do Mercado Livre
const sendPurchaseRequest = async (req, res) => {
  const { toolId, problemDescription, solutionDescription } = req.body;

  try {
    const tool = await Tool.findById(toolId);
    if (!tool) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }

    const searchResults = await searchPartOnMercadoLivre(solutionDescription);

    let searchResultsText = '';
    if (searchResults.length > 0) {
      searchResultsText = searchResults.map(result => {
        return `Título: ${result.title}\nPreço: R$ ${result.price}\nLink: ${result.link}\n`;
      }).join('\n');
    } else {
      searchResultsText = 'Nenhum resultado encontrado no Mercado Livre.';
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'leandro@engemolde.com.br',
      subject: `Solicitação de Compra - Ferramenta: ${tool.toolName}`,
      text: `
        Solicitação de compra de peças para a ferramenta:
        Nome: ${tool.toolName}
        Número de Série: ${tool.serialNumber}
        
        Descrição do Problema: ${problemDescription}
        Peças Necessárias: ${solutionDescription}

        Resultados da busca no Mercado Livre:
        ${searchResultsText}
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Solicitação de compra enviada com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar solicitação de compra:', error);
    res.status(500).json({ error: 'Erro ao enviar solicitação de compra.' });
  }
};

module.exports = {
  getTools,
  createTool,
  getAvailableTools,
  getWithdrawnTools,
  getDefectiveTools,
  updateToolStatus,
  repairTool,
  sendPurchaseRequest
};
