const {conexao} = require('../conexao');

async function atualizarEnderecoNumero(endereco) {
    const sql = `UPDATE tbl_endereco 
                SET numero = ?
                WHERE id = ?`;

    const dados = [
        endereco.numero,
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

module.exports = {atualizarEnderecoNumero};