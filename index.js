const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // permite body em JSON

// Conexão MySQL centralizada
const connection = require('./src/config/db');

// Rotas
const ativosRoutes = require('./src/routes/ativos.routes');
const authRoutes = require('./src/routes/auth.routes');
const rotinasRoutes = require('./src/routes/rotinas.routes');
const favoritosRoutes = require('./src/routes/favoritos.routes');
const ativosRoutes = require('./src/routes/ativos.routes');
app.use('/ativos', ativosRoutes);


// Rota raiz
app.get('/', (req, res) => {
  res.send("API PeleNativa Online");
});

// Usando rotas
app.use('/ativos', ativosRoutes);
app.use('/auth', authRoutes);
app.use('/rotinas', rotinasRoutes);
app.use('/favoritos', favoritosRoutes);

// Iniciando o servidor
app.listen(port, () => {
  connection.connect(err => {
    if (err) {
      console.log("Erro ao conectar no banco:", err.message);
    } else {
      console.log("Banco de dados conectado!");
    }
  });

  console.log(`API rodando na porta ${port}`);
});
