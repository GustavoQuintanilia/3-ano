const {conexao} = require('../conexao.js')

async function deletarStatus(id){
    const sql = `DELETE FROM tbl_status WHERE id = ?`;
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


module.exports = {deletarStatus};