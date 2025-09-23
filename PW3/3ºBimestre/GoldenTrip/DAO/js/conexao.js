const mysql = require("mysql2");
const config = require("../../db_config.json");

const conexao = mysql.createConnection(config);

conexao.connect((err) => {
    if (err) {
        console.error("❌ Erro ao conectar no MySQL:", err.message);
        return;
    }
    console.log("✅ Conectado ao MySQL!");
});

module.exports = conexao;
