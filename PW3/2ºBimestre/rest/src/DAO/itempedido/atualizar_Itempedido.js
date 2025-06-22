const {conexao} = require('../conexao');

async function atualizarItempedido(itempedido) {
    const sql = `UPDATE tbl_itempedido 
                SET id_pedido = ?, id_produto = ?, qnt = ?
                WHERE id = ?`;

    const dados = [
        itempedido.id_pedido,
        itempedido.id_produto,
        itempedido.qnt,
        itempedido.id
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

module.exports = {atualizarItempedido};