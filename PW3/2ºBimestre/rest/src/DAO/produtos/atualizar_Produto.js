const {conexao} = require('../conexao');

async function atualizarProduto(produto) {
    const sql = `UPDATE tbl_produtos 
                SET nome = ?, id_categoria = ?, preco = ?
                WHERE codigo = ?`;

    const dados = [
        produto.nome,
        produto.id_categoria,
        produto.preco,
        produto.codigo
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

module.exports = {atualizarProduto}