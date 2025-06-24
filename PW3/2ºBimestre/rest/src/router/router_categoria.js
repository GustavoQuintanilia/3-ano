const express = require('express')
const router = express.Router()

//----------- CONEXÃO - tbl_categoria ----------------
const {buscarCategorias, buscarCategoriasId} = require('../DAO/categoria/buscar_Categoria.js')
const {incluirCategoria} = require('../DAO/categoria/inserir_Categoria')
const {atualizarCategoria} = require('../DAO/categoria/atualizar_Categoria')
const {atualizarCategoriaNome} = require('../DAO/categoria/atualizarCategoria_Nome.js')
const {deletarCategoria} = require('../DAO/categoria/deletar_Categoria.js')

//-----------tbl_categoria---------------------
//  ---- GET ----
router.get('/firma/1.0.0/categoria', async (req, res) =>{
    let categoria = await buscarCategorias();
    res.json(categoria);
});

router.get('/firma/1.0.0/categoria/:id', async (req, res) =>{
    let id = parseInt(req.params.id);
    let categoria = await buscarCategoriasId(id);
    res.json(categoria);
});

//  ---- POST ----
router.post('/firma/1.0.0/categoria', async (req, res) =>{
    let {id, nome} = req.body;
    const infos = [id, nome];
    let result = await incluirCategoria(infos);
    res.json(result);
});

//  ---- PUT ----
router.put('/firma/1.0.0/categoria/:id', async (req, res) => {
    const categoria = req.body;
    const results = await atualizarCategoria(categoria);
    res.json(results);
});

//  ---- PATCH ----
router.patch('/firma/1.0.0/categoria/:id', async (req, res) => {
    const categoria = {
        id: req.params.id,
        nome: req.body.nome
    };

    const results = await atualizarCategoriaNome(categoria);
    res.json(results);
});

//  ---- DELETE ----
router.delete('/firma/1.0.0/categoria/:id', async (req, res) => {
    const id = req.params.id;
    const results = await deletarCategoria(id);
    res.json(results);
});

module.exports = router;

