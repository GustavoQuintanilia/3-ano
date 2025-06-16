const {conexao} = require('../conexao');

async function atualizarEndereco(endereco) {
    const sql = `UPDATE tbl_endereco 
                SET logradouro = ?, cep = ?, numero = ?, bairro = ?, cidade = ?
                WHERE id = ?`;

    const dados = [
        endereco.logradouro,
        endereco.cep,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.id
    ];

    const conn = await conexao();

    try {
        const [results] = await conn.query(sql, dados)
        await conn.end();
        return results;
        
    } catch (err) {
        return err.message;
    }
    
}

module.exports = {atualizarEndereco};