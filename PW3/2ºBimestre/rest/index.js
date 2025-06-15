const express = require('express')
const env = require('dotenv')

const {buscarClientes, buscarCliente} = require('./src/DAO/cliente/buscar_cliente.js')
const {incluirCliente} = require('./src/DAO/cliente/inserir_cliente.js')
const {atualizarCliente} = require('./src/DAO/cliente/atualizar_Cliente.js')
const {atualizarClienteLimite} = require('./src/DAO/cliente/atualizarCliente_Limite.js')
const {deletarCliente} = require('./src/DAO/cliente/deletar_Cliente.js')
const {conexao, closeConexao, testarConexao} = require('./src/DAO/conexao.js')

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

//-----------tbl_Cliente---------------------
//  ---- GET ----
app.get('/firma/1.0.0/cliente', async (req, res) =>{
    let clientes = await buscarClientes()
    res.json(clientes)
});

app.get('/firma/1.0.0/cliente/:codigo', async (req, res) =>{
    let codigo = parseInt(req.params.codigo)
    let cliente = await buscarCliente(codigo)
    res.json(cliente)
});


//  ---- POST ----
app.post('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [codigo, nome, telefone, limite, id_endereco, id_status]
    let result = await incluirCliente(infos)
    res.json(result)
});


//  ---- PUT ----
app.put('/firma/1.0.0/cliente/:codigo', async (req, res) => {
    const cliente = req.body;
    const results = await atualizarCliente(cliente);
    res.json(results);
});

//  ---- PATCH ----
app.patch('/firma/1.0.0/cliente/:codigo', async (req, res) => {
    const cliente = {
        codigo: req.params.codigo,
        limite: req.body.limite
    };

    const results = await atualizarClienteLimite(cliente);
    res.json(results);
});

//  ---- DELETE ----
app.delete('/firma/1.0.0/cliente/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    const results = await deletarCliente(codigo);
    res.json(results);
});

app.listen(process.env.PORTA, () => {
    console.log(`Operando na porta ${process.env.PORTA}`), 
    testarConexao(conexao())
})