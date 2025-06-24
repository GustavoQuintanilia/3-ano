const express = require('express')
const env = require('dotenv')

const {conexao, closeConexao, testarConexao} = require('./src/DAO/conexao.js')

// Conexão com as Rotas
const rotas_Categoria = require('./src/router/router_categoria.js')
const rotas_Cliente = require('./src/router/router_cliente.js')
const rotas_Endereco = require('./src/router/router_endereco.js')
const rotas_Itempedido = require('./src/router/router_itempedido.js')
const rotas_Pedido = require('./src/router/router_pedido.js')
const rotas_Produto = require('./src/router/router_produto.js')
const rotas_Status = require('./src/router/router_status.js')

const app = express()
env.config()

app.use(
    express.urlencoded({
        extended: true
    })
  )
  
  app.use(express.json())
  


app.get('/', (req, res) => {
  res.send('Hello World')
})

// Utilização das Rotas
app.use(rotas_Categoria)
app.use(rotas_Cliente)
app.use(rotas_Endereco)
app.use(rotas_Itempedido)
app.use(rotas_Pedido)
app.use(rotas_Produto)
app.use(rotas_Status)


app.listen(process.env.PORTA, () => {
    console.log(`Operando na porta ${process.env.PORTA}`), 
    testarConexao(conexao())
})
