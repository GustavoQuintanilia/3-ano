const {conexao} = require('../conexao.js')


async function buscarItempedido(){
    const sql = `SELECT * FROM tbl_itempedido;`
    
    const conn = await conexao()
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql);
        await conn.end();
        return rows;
      } catch (err) {
        return err.message;
      };
}

async function buscarItempedidoId(id){
    const sql = `SELECT * FROM tbl_itempedido WHERE id = ?`;
    
    const conn = await conexao();
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [id]);
        await conn.end();
        return rows;
      } catch (err) {
        return err.message;
      };
};


module.exports = {buscarItempedido, buscarItempedidoId};