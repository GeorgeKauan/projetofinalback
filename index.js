// index.js

const express = require('express');
const cors = require('cors'); // Se você estiver usando CORS

const app = express();

// --- Importação das Rotas que REALMENTE EXISTEM ---
const ativosRoutes = require('./src/routes/ativos.routes'); 
const authRoutes = require('./src/routes/auth.routes'); // Rotas que criamos (Login/Registro)

// const rotinasRoutes = require('./src/routes/rotinas.routes'); // <-- REMOVA OU COMENTE ESSA LINHA!
// const favoritosRoutes = require('./src/routes/favoritos.routes'); // <-- REMOVA OU COMENTE ESSA LINHA!

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Uso das Rotas ---
app.use('/api/ativos', ativosRoutes);
app.use('/api/auth', authRoutes); // A rota de autenticação deve estar aqui

// app.use('/api/rotinas', rotinasRoutes); // <-- REMOVA OU COMENTE ESSA LINHA!

// --- Servidor ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});