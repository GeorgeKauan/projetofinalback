// src/routes/auth.controller.js

const authModel = require('../models/auth');
const bcrypt = require('bcryptjs'); // Para comparar senhas
const jwt = require('jsonwebtoken'); // Para criar o Token

// ** Variável de Ambiente: Use uma chave forte e secreta! **
const JWT_SECRET = 'sua_chave_secreta_muito_forte_aqui'; 
const JWT_EXPIRES_IN = '1d'; // Token expira em 1 dia

/**
 * Gera um JSON Web Token (JWT) para um usuário
 */
const generateToken = (user) => {
    // O payload deve conter o ID e o email do usuário
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

/**
 * POST /api/auth/register (Registrar novo usuário)
 */
const register = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // 1. Verificar se o usuário já existe
        const existingUser = await authModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ mensagem: "E-mail já cadastrado." });
        }

        // 2. Criar o hash da senha (SALT de 10)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // 3. Salvar o usuário no MySQL
        const userId = await authModel.createUser(nome, email, hashedPassword);

        // 4. Gera o token de acesso
        const token = generateToken({ id: userId, email });

        return res.status(201).json({ 
            mensagem: "Usuário registrado com sucesso.",
            token,
            user: { id: userId, nome, email }
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
};

/**
 * POST /api/auth/login (Autenticar usuário)
 */
const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // 1. Buscar o usuário pelo e-mail
        const user = await authModel.findUserByEmail(email);
        
        // 2. Se o usuário não existe OU a senha não confere
        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).json({ mensagem: "Credenciais inválidas (E-mail ou Senha incorretos)." });
        }

        // 3. Senha correta: Gera o token
        const token = generateToken(user);
        
        // Retorna o token e os dados básicos do usuário (sem a senha)
        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            token,
            user: { id: user.id, nome: user.nome, email: user.email }
        });

    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
};

module.exports = {
    register,
    login,
};