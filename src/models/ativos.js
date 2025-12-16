// src/models/ativos.js (CÓDIGO CORRETO PARA MYSQL)
const db = require('../config/db'); // Importa a conexão com o Pool (pool.promise())

// Função para buscar os ativos marcados como destaque no banco de dados
const getAtivosEmDestaque = async () => {
    try {
        // A query SQL busca os dados necessários para a home
        const query = `
            SELECT id, nome, indicacao, imagem_url
            FROM ativos 
            WHERE em_destaque = 1
        `;
        
        // Executa a query usando a conexão com suporte a Promises
        const [rows] = await db.execute(query);
        
        // Retorna o array de resultados
        return rows;

    } catch (error) {
        // Lança o erro para ser capturado pelo Controller
        console.error("Erro no Model ao buscar ativos em destaque:", error);
        throw error;
    }
};

// Exporta a função para o Controller
module.exports = {
    getAtivosEmDestaque,
};