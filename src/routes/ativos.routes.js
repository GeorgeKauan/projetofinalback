// src/routes/ativos.routes.js

const express = require('express');
const router = express.Router();
const ativosController = require('./ativos.controller'); // Importa o Controller do passo 2

// --- Definição do Endpoint ---

// Rota: GET /api/ativos/destaques
// Quando o Angular fizer um GET para essa URL, o Express chama a função listarDestaques
router.get('/destaques', ativosController.listarDestaques);


// Esta rota será útil mais tarde, para listar todos os ativos no catálogo
// router.get('/', ativosController.listarTodos); 


module.exports = router;