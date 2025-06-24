const express = require('express')
const router = express.Router()

//----------- CONEXÃO - tbl_itempedido ----------------
const {buscarItempedido, buscarItempedidoId} = require('../DAO/itempedido/buscar_Itempedido.js')
const {incluirItempedido} = require('../DAO/itempedido/inserir_Itempedido.js')
const {atualizarItempedido} = require('../DAO/itempedido/atualizar_Itempedido.js')
const {atualizarItempedidoQnt} = require('../DAO/itempedido/atualizarItempedido_Qnt.js')
const {deletarItempedido} = require('../DAO/itempedido/deletar_Itempedido.js')

//-----------tbl_itempedido---------------------
//  ---- GET ----
router.get('/firma/1.0.0/itempedido', async (req, res) =>{
    let itempedido = await buscarItempedido();
    res.json(itempedido);
});

router.get('/firma/1.0.0/itempedido/:id', async (req, res) =>{
    let id = parseInt(req.params.id);
    let itempedido = await buscarItempedidoId(id);
    res.json(itempedido);
});

//  ---- POST ----
router.post('/firma/1.0.0/itempedido', async (req, res) =>{
    let {id, id_pedido, id_produto, qnt} = req.body;
    const infos = [id, id_pedido, id_produto, qnt];
    let result = await incluirItempedido(infos);
    res.json(result);
});

//  ---- PUT ----
router.put('/firma/1.0.0/itempedido/:id', async (req, res) => {
    const itempedido = req.body;
    const results = await atualizarItempedido(itempedido);
    res.json(results);
});

//  ---- PATCH ----
router.patch('/firma/1.0.0/itempedido/:id', async (req, res) => {
    const itempedido = {
        id: req.params.id,
        qnt: req.body.qnt
    };

    const results = await atualizarItempedidoQnt(itempedido);
    res.json(results);
});

//  ---- DELETE ----
router.delete('/firma/1.0.0/itempedido/:id', async (req, res) => {
    const id = req.params.id;
    const results = await deletarItempedido(id);
    res.json(results);
});

module.exports = router;

