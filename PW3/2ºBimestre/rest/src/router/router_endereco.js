const express = require('express')
const router = express.Router()

//----------- CONEXÃO - tbl_endereco ----------------
const {buscarEnderecos, buscarEnderecosId} = require('../DAO/endereco/buscar_Endereco.js')
const {incluirEndereco} = require('../DAO/endereco/inserir_Endereco.js')
const {atualizarEndereco} = require('../DAO/endereco/atualizar_Endereco.js')
const {atualizarEnderecoNumero} = require('../DAO/endereco/atualizarEndereco_Numero.js')
const {deletarEndereco} = require('../DAO/endereco/deletar_Endereco.js')

//-----------tbl_endereco---------------------
//  ---- GET ----
router.get('/firma/1.0.0/endereco', async (req, res) =>{
    let endereco = await buscarEnderecos();
    res.json(endereco);
});

router.get('/firma/1.0.0/endereco/:id', async (req, res) =>{
    let id = parseInt(req.params.id);
    let endereco = await buscarEnderecosId(id);
    res.json(endereco);
});

//  ---- POST ----
router.post('/firma/1.0.0/endereco', async (req, res) =>{
    let {id, logradouro, cep, numero, bairro, cidade} = req.body;
    const infos = [id, logradouro, cep, numero, bairro, cidade];
    let result = await incluirEndereco(infos);
    res.json(result);
});

//  ---- PUT ----
router.put('/firma/1.0.0/endereco/:id', async (req, res) => {
    const endereco = req.body;
    const results = await atualizarEndereco(endereco);
    res.json(results);
});

//  ---- PATCH ----
router.patch('/firma/1.0.0/endereco/:id', async (req, res) => {
    const endereco = {
        id: req.params.id,
        numero: req.body.numero
    };

    const results = await atualizarEnderecoNumero(endereco);
    res.json(results);
});

//  ---- DELETE ----
router.delete('/firma/1.0.0/endereco/:id', async (req, res) => {
    const id = req.params.id;
    const results = await deletarEndereco(id);
    res.json(results);
});

module.exports = router;

