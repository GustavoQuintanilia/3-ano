const {conexao} = require('../conexao');

async function atualizarProdutoPreco(produto) {
    const sql = `UPDATE tbl_produtos 
                SET preco = ?
                WHERE codigo = ?`;

    const dados = [
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

module.exports = {atualizarProdutoPreco}