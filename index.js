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

const produtos = [
    { id: 1, nome: 'Smartphone Motorola G85', marca: 'Motorola', preco: 1800.00, quantidade: 50 }, 
    { id: 2, nome: 'TV Lg 42 polegadas', marca: 'Motorola', preco: 1499.99, quantidade: 12 }
]
/** Ponto de entrada raíz da aplicação 
 * @param req objeto com os dados da requisição HTTP
 * @param res objeto para tratar a resposta HTTP
*/
app.get('/', (req, res) => { res.redirect('/produtos') })

/** Devolve a lista de todos os produtos */
app.get('/produtos', (req, res) => { 
  connection.query('SELECT * FROM produto', (err, rows, fields) => {
  if (err) throw err

  console.log(rows)
})

  res.json(produtos) 
})

/** Devolve um produto específico pelo seu id */
app.get('/produtos/:id', (req, res) => {
    const id = +req.params.id
    if (req.params.id && id >= 0) {
        const prod = produtos.find(p => p.id === id)
        if (prod) { 
          res.json(prod) 
        } else { 
          res.json({}) 
        }
    } else {
      res.json({})
    }
})
//Obter o preço de um produto dado o seu id
app.get('/produtos/:id/preco', (req, res) => {
  const id = +req.params.id
    if (req.params.id && id >= 0) {
        const prod = produtos.find(p => p.id === id)
        if (prod) { 
          res.json(prod.preco) 
        } else { 
          res.json({}) 
        }
    } else {
      res.json({})
    }
})
