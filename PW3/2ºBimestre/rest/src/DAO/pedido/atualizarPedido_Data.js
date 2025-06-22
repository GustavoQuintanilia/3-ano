const {conexao} = require('../conexao');

async function atualizarPedidoData(pedido) {
    const sql = `UPDATE tbl_pedido 
                SET data_elaboracao = ?
                WHERE numero = ?`;

    const dados = [
        pedido.data_elaboracao,
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

module.exports = {atualizarPedidoData};