// src/config/db.js

// Usamos o 'mysql2' porque é mais moderno e suporta Promises nativamente
const mysql = require('mysql2');

// --- Configuração das Credenciais (Mantendo seu host e porta) ---
const dbConfig = {
    host: 'localhost',
    port: 3306, // Mantendo a porta 3307
    user: 'root',
    password: '', // Assumindo que sua senha está vazia
    database: 'pelenativa', // Nome corrigido do seu BD
    
    // Configuração do Pool (melhor para servidores web)
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Cria o Pool de Conexões
const pool = mysql.createPool(dbConfig);

// Função de Teste de Conexão
pool.getConnection((err, connection) => {
    if (err) {
        // Se houver erro, mostre a mensagem (pode ser problema de porta ou credenciais)
        console.error('❌ ERRO: Falha ao conectar ao banco de dados MySQL:', err.message);
        return;
    }
    console.log('✅ Conexão ao MySQL (pelenativa) estabelecida com sucesso! Pool pronto.');
    connection.release(); // Libera a conexão de teste
});

// Exporta o pool com suporte a Promises para ser usado nos Controllers
module.exports = pool.promise();