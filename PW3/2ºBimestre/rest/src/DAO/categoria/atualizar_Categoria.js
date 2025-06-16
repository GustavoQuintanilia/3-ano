const {conexao} = require('../conexao');

async function atualizarCategoria(categoria) {
    const sql = `UPDATE tbl_categoria 
                SET nome = ?
                WHERE id = ?`;

    const dados = [
        categoria.nome,
        categoria.id
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

module.exports = {atualizarCategoria};