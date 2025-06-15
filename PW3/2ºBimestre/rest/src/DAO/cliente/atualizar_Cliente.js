const {conexao} = require('../conexao');

async function atualizarCliente(cliente) {
    const sql = `UPDATE tbl_cliente 
                SET telefone = ?, nome = ?, limite = ?, id_endereco = ?, id_status = ?
                WHERE codigo = ?`;

    const dados = [
        cliente.telefone,
        cliente.nome,
        cliente.limite,
        cliente.id_endereco,
        cliente.id_status,
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

module.exports = {atualizarCliente}