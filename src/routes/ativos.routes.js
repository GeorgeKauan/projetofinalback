const express = require('express');
const router = express.Router();
const ativosController = require('../controllers/ativos.controller');

// Listar todos os ativos
router.get('/', ativosController.listarAtivos);

// Buscar ativo pelo ID
router.get('/:id', ativosController.buscarAtivo);

// Pesquisa por nome, função ou objetivo
router.get('/buscar/:termo', ativosController.pesquisar);

// Filtros: tipo de pele / necessidade / categoria
router.get('/filtrar/:tipoPele/:necessidade/:categoria', ativosController.filtrar);

module.exports = router;
