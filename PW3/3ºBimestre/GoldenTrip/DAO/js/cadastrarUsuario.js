const conexao = require("./conexao");
const bcrypt = require("bcrypt");

function cadastrarUsuario(usuario, callback) {
    // Validação de tamanho da senha
    if (!usuario.senha || usuario.senha.length < 6 || usuario.senha.length > 20) {
        return callback(null, { sucesso: false, msg: "Senha deve ter entre 6 e 20 caracteres!" });
    }

    // Verifica se já existe email
    conexao.query("SELECT * FROM usuarios WHERE email = ?", [usuario.email], async (err, results) => {
        if (err) return callback(err);

        if (results.length > 0) {
            return callback(null, { sucesso: false, msg: "Email já cadastrado!" });
        }

        // Criptografa a senha
        const hash = await bcrypt.hash(usuario.senha, 10);

        conexao.query(
            "INSERT INTO usuarios (nome, email, senha, dataNascimento) VALUES (?, ?, ?, ?)",
            [usuario.nome, usuario.email, hash, usuario.dataNascimento],
            (err) => {
                if (err) return callback(err);
                return callback(null, { sucesso: true, msg: "Cadastro realizado com sucesso!" });
            }
        );
    });
}

module.exports = cadastrarUsuario;
