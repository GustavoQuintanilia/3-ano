const express = require('express')
const router = express.Router()

//----------- CONEXÃO - tbl_pedido ----------------
const {buscarPedido, buscarPedidoNumero} = require('../DAO/pedido/buscar_Pedido.js') 
const {incluirPedido} = require('../DAO/pedido/inserir_Pedido.js')
const {atualizarPedido} = require('../DAO/pedido/atualizar_Pedido.js')
const {atualizarPedidoData} = require('../DAO/pedido/atualizarPedido_Data.js')
const {deletarPedido} = require('../DAO/pedido/deletar_Pedido.js')

//-----------tbl_pedido---------------------
//  ---- GET ----
router.get('/firma/1.0.0/pedido', async (req, res) =>{
    let pedido = await buscarPedido();
    res.json(pedido);
});

router.get('/firma/1.0.0/pedido/:numero', async (req, res) =>{
    let numero = parseInt(req.params.numero);
    let pedido = await buscarPedidoNumero(numero);
    res.json(pedido);
});

//  ---- POST ----
router.post('/firma/1.0.0/pedido', async (req, res) =>{
    let {numero, data_elaboracao, cliente_id} = req.body;
    const infos = [numero, data_elaboracao, cliente_id];
    let result = await incluirPedido(infos);
    res.json(result);
});

//  ---- PUT ----
router.put('/firma/1.0.0/pedido/:numero', async (req, res) => {
    const pedido = req.body;
    const results = await atualizarPedido(pedido);
    res.json(results);
});

//  ---- PATCH ----
router.patch('/firma/1.0.0/pedido/:numero', async (req, res) => {
    const pedido = {
        numero: req.params.numero,
        data_elaboracao: req.body.data_elaboracao
    };

    const results = await atualizarPedidoData(pedido);
    res.json(results);
});

//  ---- DELETE ----
router.delete('/firma/1.0.0/pedido/:numero', async (req, res) => {
    const numero = req.params.numero;
    const results = await deletarPedido(numero);
    res.json(results);
});

module.exports = router;
