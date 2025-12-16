// src/routes/ativos.controller.js

const ativosModel = require('../models/ativos'); // Importa o Model criado no passo 1

// Função que processa a requisição GET para /api/ativos/destaques
const listarDestaques = async (req, res) => {
    try {
        // 1. Chama o Model para buscar os dados no MySQL
        const ativos = await ativosModel.getAtivosEmDestaque(); 
        
        // 2. Retorna os dados para o Front-end em formato JSON (Status 200 OK)
        return res.status(200).json(ativos);

    } catch (error) {
        // 3. Se houver qualquer erro (conexão, SQL inválido, etc.)
        console.error('Falha na requisição listarDestaques:', error);
        
        // Retorna um erro 500 para o Front-end
        return res.status(500).json({ 
            mensagem: "Erro interno no servidor ao processar a lista de ativos.",
            detalhe: error.message 
        });
    }
};

// Exporta a função para que a Rota possa utilizá-la
module.exports = {
    listarDestaques,
};