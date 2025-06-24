const {conexao} = require('../conexao');

async function atualizarStatusNome(status) {
    const sql = `UPDATE tbl_status 
                SET nome = ?
                WHERE id = ?`;

    const dados = [
        status.nome,
        status.id
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

module.exports = {atualizarStatusNome};