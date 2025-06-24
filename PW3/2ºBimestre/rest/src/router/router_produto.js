const express = require('express')
const router = express.Router()

//----------- CONEXÃO - tbl_produtos ----------------
const {buscarProduto, buscarProdutoCodigo} = require('../DAO/produtos/buscar_Produto.js')
const {incluirProdutos} = require('../DAO/produtos/inserir_Produto.js')
const {atualizarProduto} = require('../DAO/produtos/atualizar_Produto.js')
const {atualizarProdutoPreco} = require('../DAO/produtos/atualizarProduto_Preco.js')
const {deletarProduto} = require('../DAO/produtos/deletar_Produto.js')

//-----------tbl_produtos---------------------
//  ---- GET ----
router.get('/firma/1.0.0/produto', async (req, res) =>{
    let produto = await buscarProduto();
    res.json(produto);
});

router.get('/firma/1.0.0/produto/:codigo', async (req, res) =>{
    let codigo = parseInt(req.params.codigo);
    let produto = await buscarProdutoCodigo(codigo);
    res.json(produto);
});

//  ---- POST ----
router.post('/firma/1.0.0/produto', async (req, res) =>{
    let {codigo, nome, id_categoria, preco} = req.body
    const infos = [codigo, nome, id_categoria, preco]
    let result = await incluirProdutos(infos)
    res.json(result)
});

//  ---- PUT ----
router.put('/firma/1.0.0/produto/:codigo', async (req, res) => {
    const produto = req.body;
    const results = await atualizarProduto(produto);
    res.json(results);
});

//  ---- PATCH ----
router.patch('/firma/1.0.0/produto/:codigo', async (req, res) => {
    const produto = {
        codigo: req.params.codigo,
        preco: req.body.preco
    };

    const results = await atualizarProdutoPreco(produto);
    res.json(results);
});

//  ---- DELETE ----
router.delete('/firma/1.0.0/produto/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    const results = await deletarProduto(codigo);
    res.json(results);
});

module.exports = router;
