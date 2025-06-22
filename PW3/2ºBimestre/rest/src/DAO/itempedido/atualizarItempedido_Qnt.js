const {conexao} = require('../conexao');

async function atualizarItempedidoQnt(itempedido) {
    const sql = `UPDATE tbl_itempedido 
                SET qnt = ?
                WHERE id = ?`;

    const dados = [
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

module.exports = {atualizarItempedidoQnt};