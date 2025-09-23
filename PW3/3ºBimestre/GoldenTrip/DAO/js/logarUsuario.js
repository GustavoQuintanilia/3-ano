const conexao = require("./conexao");
const bcrypt = require("bcrypt");

function logarUsuario(email, senha, callback) {
    conexao.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
        if (err) return callback(err);

        if (results.length === 0) {
            return callback(null, { sucesso: false, msg: "Email não encontrado!" });
        }

        const usuario = results[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return callback(null, { sucesso: false, msg: "Senha incorreta!" });
        }

        return callback(null, { sucesso: true, msg: "Login realizado com sucesso!" });
    });
}

module.exports = logarUsuario;
