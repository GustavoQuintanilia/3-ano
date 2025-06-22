const {conexao} = require('../conexao');

async function atualizarPedido(pedido) {
    const sql = `UPDATE tbl_pedido 
                SET data_elaboracao = ?, cliente_id = ?
                WHERE numero = ?`;

    const dados = [
        pedido.data_elaboracao,
        pedido.cliente_id,
        pedido.numero
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

module.exports = {atualizarPedido};