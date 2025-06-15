const {conexao} = require('../conexao');

async function atualizarClienteLimite(cliente) {
    const sql = `UPDATE tbl_cliente 
                SET limite = ?
                WHERE codigo = ?`;

    const dados = [
        cliente.limite,
        cliente.codigo
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

module.exports = {atualizarClienteLimite}