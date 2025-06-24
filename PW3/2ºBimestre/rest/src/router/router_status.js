const express = require('express')
const router = express.Router()

//----------- CONEXÃO - tbl_status ----------------
const {buscarStatus, buscarStatusId} = require('../DAO/status/buscar_Status.js')
const {incluirStatus} = require('../DAO/status/inserir_Status.js')
const {atualizarStatus} = require('../DAO/status/atualizar_Status.js')
const {atualizarStatusNome} = require('../DAO/status/atualizarStatus_Nome.js')
const {deletarStatus} = require('../DAO/status/deletar_Status.js')

//-----------tbl_status---------------------
//  ---- GET ----
router.get('/firma/1.0.0/status', async (req, res) =>{
    let status = await buscarStatus();
    res.json(status);
});

router.get('/firma/1.0.0/status/:id', async (req, res) =>{
    let id = parseInt(req.params.id);
    let status = await buscarStatusId(id);
    res.json(status);
});

//  ---- POST ----
router.post('/firma/1.0.0/status', async (req, res) =>{
    let {id, nome} = req.body;
    const infos = [id, nome];
    let result = await incluirStatus(infos);
    res.json(result);
});

//  ---- PUT ----
router.put('/firma/1.0.0/status/:id', async (req, res) => {
    const status = req.body;
    const results = await atualizarStatus(status);
    res.json(results);
});

//  ---- PATCH ----
router.patch('/firma/1.0.0/status/:id', async (req, res) => {
    const status = {
        id: req.params.id,
        nome: req.body.nome
    };

    const results = await atualizarStatusNome(status);
    res.json(results);
});

//  ---- DELETE ----
router.delete('/firma/1.0.0/status/:id', async (req, res) => {
    const id = req.params.id;
    const results = await deletarStatus(id);
    res.json(results);
});

module.exports = router;
