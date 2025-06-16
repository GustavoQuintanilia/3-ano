const express = require('express')
const env = require('dotenv')

//----------- CONEXÃO - tbl_categoria ----------------
const {buscarCategorias, buscarCategoriasId} = require('./src/DAO/categoria/buscar_Categoria.js')
const {incluirCategoria} = require('./src/DAO/categoria/inserir_Categoria')
const {atualizarCategoria} = require('./src/DAO/categoria/atualizar_Categoria')
const {atualizarCategoriaNome} = require('./src/DAO/categoria/atualizarCategoria_Nome.js')
const {deletarCategoria} = require('./src/DAO/categoria/deletar_Categoria.js')

//----------- CONEXÃO - tbl_cliente ----------------
const {buscarClientes, buscarCliente} = require('./src/DAO/cliente/buscar_cliente.js')
const {incluirCliente} = require('./src/DAO/cliente/inserir_cliente.js')
const {atualizarCliente} = require('./src/DAO/cliente/atualizar_Cliente.js')
const {atualizarClienteLimite} = require('./src/DAO/cliente/atualizarCliente_Limite.js')
const {deletarCliente} = require('./src/DAO/cliente/deletar_Cliente.js')

//----------- CONEXÃO - tbl_endereco ----------------
const {buscarEnderecos, buscarEnderecosId} = require('./src/DAO/endereco/buscar_Endereco.js')
const {incluirEndereco} = require('./src/DAO/endereco/inserir_Endereco.js')
const {atualizarEndereco} = require('./src/DAO/endereco/atualizar_Endereco.js')
const {atualizarEnderecoNumero} = require('./src/DAO/endereco/atualizarEndereco_Numero.js')
const {deletarEndereco} = require('./src/DAO/endereco/deletar_Endereco.js')


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

//-----------tbl_cliente---------------------
//  ---- GET ----
app.get('/firma/1.0.0/cliente', async (req, res) =>{
    let clientes = await buscarClientes();
    res.json(clientes);
});

app.get('/firma/1.0.0/cliente/:codigo', async (req, res) =>{
    let codigo = parseInt(req.params.codigo);
    let cliente = await buscarCliente(codigo);
    res.json(cliente);
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


//-----------tbl_categoria---------------------
//  ---- GET ----
app.get('/firma/1.0.0/categoria', async (req, res) =>{
    let categoria = await buscarCategorias();
    res.json(categoria);
});

app.get('/firma/1.0.0/categoria/:id', async (req, res) =>{
    let id = parseInt(req.params.id);
    let categoria = await buscarCategoriasId(id);
    res.json(categoria);
});

//  ---- POST ----
app.post('/firma/1.0.0/categoria', async (req, res) =>{
    let {id, nome} = req.body;
    const infos = [id, nome];
    let result = await incluirCategoria(infos);
    res.json(result);
});

//  ---- PUT ----
app.put('/firma/1.0.0/categoria/:id', async (req, res) => {
    const categoria = req.body;
    const results = await atualizarCategoria(categoria);
    res.json(results);
});

//  ---- PATCH ----
app.patch('/firma/1.0.0/categoria/:id', async (req, res) => {
    const categoria = {
        id: req.params.id,
        nome: req.body.nome
    };

    const results = await atualizarCategoriaNome(categoria);
    res.json(results);
});

//  ---- DELETE ----
app.delete('/firma/1.0.0/categoria/:id', async (req, res) => {
    const id = req.params.id;
    const results = await deletarCategoria(id);
    res.json(results);
});


//-----------tbl_endereco---------------------
//  ---- GET ----
app.get('/firma/1.0.0/endereco', async (req, res) =>{
    let endereco = await buscarEnderecos();
    res.json(endereco);
});

app.get('/firma/1.0.0/endereco/:id', async (req, res) =>{
    let id = parseInt(req.params.id);
    let endereco = await buscarEnderecosId(id);
    res.json(endereco);
});

//  ---- POST ----
app.post('/firma/1.0.0/endereco', async (req, res) =>{
    let {id, logradouro, cep, numero, bairro, cidade} = req.body;
    const infos = [id, logradouro, cep, numero, bairro, cidade];
    let result = await incluirEndereco(infos);
    res.json(result);
});

//  ---- PUT ----
app.put('/firma/1.0.0/endereco/:id', async (req, res) => {
    const endereco = req.body;
    const results = await atualizarEndereco(endereco);
    res.json(results);
});

//  ---- PATCH ----
app.patch('/firma/1.0.0/endereco/:id', async (req, res) => {
    const endereco = {
        id: req.params.id,
        numero: req.body.numero
    };

    const results = await atualizarEnderecoNumero(endereco);
    res.json(results);
});

//  ---- DELETE ----
app.delete('/firma/1.0.0/endereco/:id', async (req, res) => {
    const id = req.params.id;
    const results = await deletarEndereco(id);
    res.json(results);
});

app.listen(process.env.PORTA, () => {
    console.log(`Operando na porta ${process.env.PORTA}`), 
    testarConexao(conexao())
})