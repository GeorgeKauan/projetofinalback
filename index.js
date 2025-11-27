const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
app.use(cors())
const port = 3000

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3307', //adicionei por ter alterei a minha porta do mysql
  user: 'root',
  password: '',
  database: 'loja4v'
})

app.listen(port, () => {
  connection.connect(err => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('BD conectado!')
    }
  })
  console.log(`Aplicação rodando na porta ${port}`)
})

/** Ponto de entrada raíz da aplicação 
 * @param req objeto com os dados da requisição HTTP
 * @param res objeto para tratar a resposta HTTP
*/
app.get('/', (req, res) => { res.redirect('/produtos') })

/** Devolve a lista de todos os produtos */
app.get('/produtos', (req, res) => {
  //connection.query realiza uma operação no BD (select, insert, update...)
  const consulta = 'SELECT * FROM produto'
  connection.query(consulta, (erro, produtos) => {
    if (!erro) {
      res.json(produtos)
    } else {
      console.log(`Erro: ${erro.sqlMessage}`)
      res.json([])
    }
  })
})

/** Devolve um produto específico pelo seu id */
app.get('/produtos/:id', (req, res) => {
  const id = +req.params.id
  if (req.params.id && id >= 0) {
    const consulta = 'SELECT * FROM produto WHERE id=?'
    connection.query(consulta, [id] ,(erro, produto) => {
      if (!erro) {
        res.json(produto)
      } else {
        console.log(`Erro: ${erro.sqlMessage}`)
        res.json([])
      }
    })
  } else {
    res.json([])
  }
})
//Obter o preço de um produto dado o seu id
app.get('/produtos/:id/preco', (req, res) => {
  const id = +req.params.id
  if (req.params.id && id >= 0) {
    const consulta = 'SELECT preco FROM produto WHERE id=?'
    connection.query(consulta, [id] ,(erro, preco) => {
      if (!erro) {
        res.json(preco)
      } else {
        console.log(`Erro: ${erro.sqlMessage}`)
        res.json([])
      }
    })
  } else {
    res.json([])
  }
})
