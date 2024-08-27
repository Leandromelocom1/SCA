const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const assetRoutes = require('./routes/assetRoutes');
const assetTypeRoutes = require('./routes/assetTypeRoutes'); 
const brandRoutes = require('./routes/brandRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const modelRoutes = require('./routes/modelRoutes');
const userRoutes = require('./routes/userRoutes');
const steelRoutes = require('./routes/steelRoutes');
const workRoutes = require('./routes/workRoutes');
const driverRoutes = require('./routes/driverRoutes');
const gptRoutes = require('./routes/gptRoutes');
const toolRoutes = require('./routes/toolRoutes');

const app = express();

// Conectar ao MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI não está definido no arquivo .env');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json()); // Middleware para processar JSON

// Registrar rotas
const routes = [
  { path: '/auth', route: authRoutes },
  { path: '/assets', route: assetRoutes },
  { path: '/asset-types', route: assetTypeRoutes },
  { path: '/brands', route: brandRoutes },
  { path: '/departments', route: departmentRoutes },
  { path: '/models', route: modelRoutes },
  { path: '/users', route: userRoutes },
  { path: '/steel', route: steelRoutes },
  { path: '/works', route: workRoutes },
  { path: '/drivers', route: driverRoutes },
  { path: '/gpt', route: gptRoutes },
  { path: '/tools', route: toolRoutes }
];

routes.forEach((route) => {
  app.use(route.path, route.route);
});

// Iniciar a escuta de emails
require('./emailListener');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
