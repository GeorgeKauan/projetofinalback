// src/models/auth.js

const db = require('../config/db');

/**
 * Busca um usuário pelo email. Usado no processo de login.
 * @param {string} email
 */
const findUserByEmail = async (email) => {
    const query = 'SELECT id, nome, email, senha FROM usuarios WHERE email = ?';
    // [rows] retorna o array de resultados; esperamos 0 ou 1 usuário
    const [rows] = await db.execute(query, [email]); 
    // Retorna o primeiro (e único) usuário encontrado, ou undefined
    return rows[0];
};

/**
 * Cria um novo usuário no banco de dados. Usado no registro.
 * @param {string} nome
 * @param {string} email
 * @param {string} hashedPassword - Senha já criptografada (hash)
 */
const createUser = async (nome, email, hashedPassword) => {
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [nome, email, hashedPassword]);
    
    // Retorna o ID do usuário recém-criado
    return result.insertId;
};

module.exports = {
    findUserByEmail,
    createUser,
};