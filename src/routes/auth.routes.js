// src/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('./auth.controller'); // Importa o Controller

// Rota de Registro: POST /api/auth/register
router.post('/register', authController.register);

// Rota de Login: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;