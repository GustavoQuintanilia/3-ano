const {conexao} = require('../conexao.js')

async function deletarCategoria(id){
    const sql = `DELETE FROM tbl_categoria WHERE id = ?`;
    const conn = await conexao();
    
    try {
        // Executar a consulta
        const [results] = await conn.query(sql, [id]);
        await conn.end();
        return results;
      } catch (err) {
        return err.message;
      };
};


module.exports = {deletarCategoria};