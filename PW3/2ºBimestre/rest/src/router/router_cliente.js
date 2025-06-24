const express = require('express')
const router = express.Router()

//----------- CONEXÃO - tbl_cliente ----------------
const {buscarClientes, buscarCliente} = require('../DAO/cliente/buscar_cliente.js')
const {incluirCliente} = require('../DAO/cliente/inserir_cliente.js')
const {atualizarCliente} = require('../DAO/cliente/atualizar_Cliente.js')
const {atualizarClienteLimite} = require('../DAO/cliente/atualizarCliente_Limite.js')
const {deletarCliente} = require('../DAO/cliente/deletar_Cliente.js')

//-----------tbl_cliente---------------------
//  ---- GET ----
router.get('/firma/1.0.0/cliente', async (req, res) =>{
    let clientes = await buscarClientes();
    res.json(clientes);
});

router.get('/firma/1.0.0/cliente/:codigo', async (req, res) =>{
    let codigo = parseInt(req.params.codigo);
    let cliente = await buscarCliente(codigo);
    res.json(cliente);
});

//  ---- POST ----
router.post('/firma/1.0.0/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [codigo, nome, telefone, limite, id_endereco, id_status]
    let result = await incluirCliente(infos)
    res.json(result)
});

//  ---- PUT ----
router.put('/firma/1.0.0/cliente/:codigo', async (req, res) => {
    const cliente = req.body;
    const results = await atualizarCliente(cliente);
    res.json(results);
});

//  ---- PATCH ----
router.patch('/firma/1.0.0/cliente/:codigo', async (req, res) => {
    const cliente = {
        codigo: req.params.codigo,
        limite: req.body.limite
    };

    const results = await atualizarClienteLimite(cliente);
    res.json(results);
});

//  ---- DELETE ----
router.delete('/firma/1.0.0/cliente/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    const results = await deletarCliente(codigo);
    res.json(results);
});

module.exports = router;
