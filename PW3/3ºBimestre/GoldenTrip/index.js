const express = require("express");
const path = require("path");

require("./DAO/js/conexao"); // mantém conexão ativa
const cadastrarUsuario = require("./DAO/js/cadastrarUsuario");
const logarUsuario = require("./DAO/js/logarUsuario");

const app = express();
const PORT = 5000;

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views"))); // serve arquivos HTML, CSS, etc
app.use("/DAO", express.static(path.join(__dirname, "DAO"))); // expõe JS/CSS/IMG

// ------------------ ROTAS GET ------------------

// Rota raiz → abre login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// Rota para cadastro
app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "views/cadastro.html"));
});

// Rota para home
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "views/home.html"));
});

// ------------------ ROTAS POST ------------------

// Rota POST de cadastro
app.post("/cadastro", (req, res) => {
  const { nome, email, senha, confirmarSenha, dataNascimento } = req.body;

  if (!nome || !email || !senha || !confirmarSenha || !dataNascimento) {
    return res.send(
      `<script>alert("Preencha todos os campos!"); window.location.href="/cadastro";</script>`
    );
  }

  if (senha !== confirmarSenha) {
    return res.send(
      `<script>alert("As senhas não coincidem!"); window.location.href="/cadastro";</script>`
    );
  }

  cadastrarUsuario({ nome, email, senha, dataNascimento }, (err, resultado) => {
    if (err) {
      console.error(err);
      return res.send(
        `<script>alert("Erro ao cadastrar!"); window.location.href="/cadastro";</script>`
      );
    }
    if (resultado.sucesso) {
      return res.send(
        `<script>alert("${resultado.msg}"); window.location.href="/";</script>`
      );
    } else {
      return res.send(
        `<script>alert("${resultado.msg}"); window.location.href="/cadastro";</script>`
      );
    }
  });
});

// Rota POST de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.send(
      `<script>alert("Preencha todos os campos!"); window.location.href="/";</script>`
    );
  }

  logarUsuario(email, senha, (err, resultado) => {
    if (err) {
      console.error(err);
      return res.send(
        `<script>alert("Erro ao logar!"); window.location.href="/";</script>`
      );
    }
    if (resultado.sucesso) {
      return res.send(
        `<script>alert("${resultado.msg}"); window.location.href="/home";</script>`
      );
    } else {
      return res.send(
        `<script>alert("${resultado.msg}"); window.location.href="/";</script>`
      );
    }
  });
});

// ------------------ INICIA SERVIDOR ------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
