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

//----------- CONEXÃO - tbl_itempedido ----------------
const {buscarItempedido, buscarItempedidoId} = require('./src/DAO/itempedido/buscar_Itempedido.js')
const {incluirItempedido} = require('./src/DAO/itempedido/inserir_Itempedido.js')
const {atualizarItempedido} = require('./src/DAO/itempedido/atualizar_Itempedido.js')
const {atualizarItempedidoQnt} = require('./src/DAO/itempedido/atualizarItempedido_Qnt.js')
const {deletarItempedido} = require('./src/DAO/itempedido/deletar_Itempedido.js')

//----------- CONEXÃO - tbl_pedido ----------------
//Olha em baixo
const {buscarPedido, buscarPedidoNumero} = require('./src/DAO/pedido/buscar_pedido.js') 
const {incluirPedido} = require('./src/DAO/pedido/inserir_Pedido.js')
const {atualizarPedido} = require('./src/DAO/pedido/atualizar_Pedido.js')
const {atualizarPedidoData} = require('./src/DAO/pedido/atualizarPedido_Data.js')
const {deletarPedido} = require('./src/DAO/pedido/deletar_Pedido.js')

//----------- CONEXÃO - tbl_produtos ----------------
const {buscarProduto, buscarProdutoCodigo} = require('./src/DAO/produtos/buscar_Produto.js')
const {incluirProdutos} = require('./src/DAO/produtos/inserir_Produto.js')

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

//-----------tbl_itempedido---------------------
//  ---- GET ----
app.get('/firma/1.0.0/itempedido', async (req, res) =>{
    let itempedido = await buscarItempedido();
    res.json(itempedido);
});

app.get('/firma/1.0.0/itempedido/:id', async (req, res) =>{
    let id = parseInt(req.params.id);
    let itempedido = await buscarItempedidoId(id);
    res.json(itempedido);
});

//  ---- POST ----
app.post('/firma/1.0.0/itempedido', async (req, res) =>{
    let {id, id_pedido, id_produto, qnt} = req.body;
    const infos = [id, id_pedido, id_produto, qnt];
    let result = await incluirItempedido(infos);
    res.json(result);
});

//  ---- PUT ----
app.put('/firma/1.0.0/itempedido/:id', async (req, res) => {
    const itempedido = req.body;
    const results = await atualizarItempedido(itempedido);
    res.json(results);
});

//  ---- PATCH ----
app.patch('/firma/1.0.0/itempedido/:id', async (req, res) => {
    const itempedido = {
        id: req.params.id,
        qnt: req.body.qnt
    };

    const results = await atualizarItempedidoQnt(itempedido);
    res.json(results);
});

//  ---- DELETE ----
app.delete('/firma/1.0.0/itempedido/:id', async (req, res) => {
    const id = req.params.id;
    const results = await deletarItempedido(id);
    res.json(results);
});

//-----------tbl_pedido---------------------
//  ---- GET ----
app.get('/firma/1.0.0/pedido', async (req, res) =>{
    let pedido = await buscarPedido();
    res.json(pedido);
});

app.get('/firma/1.0.0/pedido/:numero', async (req, res) =>{
    let numero = parseInt(req.params.numero);
    let pedido = await buscarPedidoNumero(numero);
    res.json(pedido);
});

//  ---- POST ----
app.post('/firma/1.0.0/pedido', async (req, res) =>{
    let {numero, data_elaboracao, cliente_id} = req.body;
    const infos = [numero, data_elaboracao, cliente_id];
    let result = await incluirPedido(infos);
    res.json(result);
});

//  ---- PUT ----
app.put('/firma/1.0.0/pedido/:numero', async (req, res) => {
    const pedido = req.body;
    const results = await atualizarPedido(pedido);
    res.json(results);
});

//  ---- PATCH ----
app.patch('/firma/1.0.0/pedido/:numero', async (req, res) => {
    const pedido = {
        numero: req.params.numero,
        data_elaboracao: req.body.data_elaboracao
    };

    const results = await atualizarPedidoData(pedido);
    res.json(results);
});

//  ---- DELETE ----
app.delete('/firma/1.0.0/pedido/:numero', async (req, res) => {
    const numero = req.params.numero;
    const results = await deletarPedido(numero);
    res.json(results);
});

//-----------tbl_produtos---------------------
//  ---- GET ----
app.get('/firma/1.0.0/produto', async (req, res) =>{
    let produto = await buscarProduto();
    res.json(produto);
});

app.get('/firma/1.0.0/produto/:codigo', async (req, res) =>{
    let codigo = parseInt(req.params.codigo);
    let produto = await buscarProdutoCodigo(codigo);
    res.json(produto);
});

//  ---- POST ----
app.post('/firma/1.0.0/produto', async (req, res) =>{
    let {codigo, nome, id_categoria, preco} = req.body
    const infos = [codigo, nome, id_categoria, preco]
    let result = await incluirProdutos(infos)
    res.json(result)
});

app.listen(process.env.PORTA, () => {
    console.log(`Operando na porta ${process.env.PORTA}`), 
    testarConexao(conexao())
})