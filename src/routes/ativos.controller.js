const connection = require('../config/db');

module.exports = {
  
  // Listar todos os ativos
  listarAtivos(req, res) {
    const sql = "SELECT * FROM ativo";
    connection.query(sql, (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(result);
    });
  },

  // Buscar ativo específico
  buscarAtivo(req, res) {
    const id = +req.params.id;
    const sql = "SELECT * FROM ativo WHERE id=?";
    connection.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(result[0] || {});
    });
  },

  // Pesquisa geral
  pesquisar(req, res) {
    const termo = '%' + req.params.termo + '%';
    const sql = `
      SELECT * FROM ativo 
      WHERE nome LIKE ? 
         OR funcao LIKE ?
         OR objetivo LIKE ?
    `;
    connection.query(sql, [termo, termo, termo], (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(result);
    });
  },

  // Filtragem avançada
  filtrar(req, res) {
    const { tipoPele, necessidade, categoria } = req.params;

    const sql = `
      SELECT * FROM ativo
      WHERE tipo_pele LIKE ?
        AND necessidade LIKE ?
        AND categoria LIKE ?
    `;

    connection.query(
      [ '%' + tipoPele + '%', '%' + necessidade + '%', '%' + categoria + '%' ],
      sql, 
      (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(result);
      }
    );
  }

};
