const {conexao} = require('../conexao.js')


async function buscarPedido(){
    const sql = `SELECT * FROM tbl_pedido;`
    
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

async function buscarPedidoNumero(numero){
    const sql = `SELECT * FROM tbl_pedido WHERE numero = ?`;
    
    const conn = await conexao();
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [numero]);
        await conn.end();
        return rows;
      } catch (err) {
        return err.message;
      };
};


module.exports = {buscarPedido, buscarPedidoNumero};