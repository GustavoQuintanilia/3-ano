// --------------------------------------------
// IMPORTAÇÕES
// --------------------------------------------
require('dotenv').config();
const express = require("express");
const path = require("path");
const multer = require('multer');

const conexao = require("./DAO/js/conexao");
const cadastrarUsuario = require("./DAO/js/cadastrarUsuario");
const logarUsuario = require("./DAO/js/logarUsuario");

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------------------------------
// CONFIGURAÇÕES DO EXPRESS
// --------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}


//------------------ ROTAS GET ---------------------

// login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// cadastro
app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "views/cadastro.html"));
});

// home
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "views/home.html"));
});

// pacotes
app.get("/pacotes", (req, res) => {
  res.sendFile(path.join(__dirname, "views/pacotes.html"));
});

// opções de reserva
app.get("/opcoes_Reserva", (req, res) => {
  res.sendFile(path.join(__dirname, "views/opcoes_Reserva.html"));
});

// reservas
app.get("/reservas", (req, res) => {
  res.sendFile(path.join(__dirname, "views/reservas.html"));
});

// Painel do Viajante
app.get("/painelViajante", (req, res) => {
  res.sendFile(path.join(__dirname, "views/painelViajante.html"));
});

// Dados hotéis
app.get("/api/hoteis", (req, res) => {
  conexao.query("SELECT id, nome, imagem, descricao, preco FROM hoteis", (err, rows) => {
    if (err) {
      console.error("Erro /api/hoteis:", err);
      return res.status(500).json({ error: "Erro ao buscar hotéis" });
    }
    res.json(rows);
  });
});

// Dados passagens
app.get("/api/passagens", (req, res) => {
  conexao.query("SELECT id, nome, imagem, descricao, preco FROM passagens", (err, rows) => {
    if (err) {
      console.error("Erro /api/passagens:", err);
      return res.status(500).json({ error: "Erro ao buscar passagens" });
    }
    res.json(rows);
  });
});

// Dados passeios
app.get("/api/passeios", (req, res) => {
  conexao.query("SELECT id, nome, imagem, descricao, preco FROM passeios", (err, rows) => {
    if (err) {
      console.error("Erro /api/passeios:", err);
      return res.status(500).json({ error: "Erro ao buscar passeios" });
    }
    res.json(rows);
  });
});

// Dados pacotes
app.get("/api/pacotes", (req, res) => {
  conexao.query("SELECT id, nome, imagem, descricao, preco FROM pacotes", (err, rows) => {
    if (err) {
      console.error("Erro /api/pacotes:", err);
      return res.status(500).json({ error: "Erro ao buscar pacotes" });
    }
    res.json(rows);
  });
});

// Dados usuário
app.get("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  conexao.query(
    "SELECT id, nome, email, fotoPerfil FROM usuarios WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ erro: "Erro ao buscar usuário" });
      }
      if (results.length === 0) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }
      res.json(results[0]);
    }
  );
});

// Dados das reservas do usuário
app.get("/api/reservas/usuario/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      r.*, 
      COALESCE(h.nome, pa.nome, ps.nome, pc.nome) AS nome_reserva,
      COALESCE(h.imagem, pa.imagem, ps.imagem, pc.imagem) AS imagem_reserva
    FROM reservas r
    LEFT JOIN hoteis h ON r.id_hotel = h.id
    LEFT JOIN passagens pa ON r.id_passagem = pa.id
    LEFT JOIN passeios ps ON r.id_passeio = ps.id
    LEFT JOIN pacotes pc ON r.id_pacote = pc.id
    WHERE r.id_usuario = ?;
  `;

  conexao.query(sql, [id], (err, resultados) => {
    if (err) {
      console.error("Erro ao buscar reservas:", err);
      return res.status(500).json({ erro: "Erro ao buscar reservas do usuário" });
    }
    res.json(resultados);
  });
});


// HOTÉIS:ID 
app.get("/api/hoteis/:id", (req, res) => {
  const { id } = req.params;
  conexao.query(
    "SELECT id, nome, imagem, descricao, preco FROM hoteis WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) {
        console.error("Erro /api/hoteis/:id:", err);
        return res.status(500).json({ error: "Erro ao buscar hotel." });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: "Hotel não encontrado." });
      }
      res.json(rows[0]);
    }
  );
});

// PASSAGENS:ID
app.get("/api/passagens/:id", (req, res) => {
  const { id } = req.params;
  conexao.query(
    "SELECT id, nome, imagem, descricao, preco FROM passagens WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) {
        console.error("Erro /api/passagens/:id:", err);
        return res.status(500).json({ error: "Erro ao buscar passagem." });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: "Passagem não encontrada." });
      }
      res.json(rows[0]);
    }
  );
});

// PASSEIOS:ID
app.get("/api/passeios/:id", (req, res) => {
  const { id } = req.params;
  conexao.query(
    "SELECT id, nome, imagem, descricao, preco FROM passeios WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) {
        console.error("Erro /api/passeios/:id:", err);
        return res.status(500).json({ error: "Erro ao buscar passeio." });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: "Passeio não encontrado." });
      }
      res.json(rows[0]);
    }
  );
});

// PACOTES:ID
app.get("/api/pacotes/:id", (req, res) => {
  const { id } = req.params;
  conexao.query(
    "SELECT id, nome, imagem, descricao, preco FROM pacotes WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) {
        console.error("Erro /api/pacotes/:id:", err);
        return res.status(500).json({ error: "Erro ao buscar pacote." });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: "Pacote não encontrado." });
      }
      res.json(rows[0]);
    }
  );
});


// -------------------- ROTAS POST -----------------------

// Cadastro
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

// Login
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
      // ✅ Salva id e nome do usuário no localStorage
      return res.send(`
        <script>
          alert("${resultado.msg}");
          localStorage.setItem("idUsuario", "${resultado.id}");
          localStorage.setItem("nomeUsuario", "${resultado.nome}");
          window.location.href="/home";
        </script>
      `);
    } else {
      return res.send(
        `<script>alert("${resultado.msg}"); window.location.href="/";</script>`
      );
    }
  });
});

//Efetuar o pagamento da reserva
app.post("/api/reservar", (req, res) => {
  const { idUsuario, itens, valorTotal, dataViagem, horaViagem } = req.body;

  if (!idUsuario) return res.status(400).json({ erro: "Usuário não identificado." });
  if (!itens || itens.length === 0) return res.status(400).json({ erro: "Nenhum item selecionado." });
  if (!dataViagem || !horaViagem) return res.status(400).json({ erro: "Data e hora da viagem são obrigatórias." });

  // Inicializa os IDs como null
  let idHotel = null, idPassagem = null, idPasseio = null, idPacote = null;

  // Preenche os IDs de acordo com os tipos
  itens.forEach(item => {
    switch (item.tipo) {
      case "hotel": idHotel = item.id; break;
      case "passagem": idPassagem = item.id; break;
      case "passeio": idPasseio = item.id; break;
      case "pacote": idPacote = item.id; break;
    }
  });

  const sql = `
    INSERT INTO reservas (id_usuario, id_hotel, id_passagem, id_passeio, id_pacote, valor_total, data_viagem, hora_viagem)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexao.query(
    sql,
    [idUsuario, idHotel, idPassagem, idPasseio, idPacote, valorTotal, dataViagem, horaViagem],
    (err) => {
      if (err) {
        console.error("Erro ao registrar reserva:", err);
        return res.status(500).json({ erro: "Erro ao registrar reserva." });
      }

      res.json({ sucesso: true, msg: "Reserva registrada com sucesso!" });
    }
  );
});


// Rota para upload da foto
app.post('/api/uploadFoto', upload.single('fotoPerfil'), (req, res) => {
  const { idUsuario } = req.body;
  const caminho = `/uploads/${req.file.filename}`;

  conexao.query(
    "UPDATE usuarios SET fotoPerfil = ? WHERE id = ?",
    [caminho, idUsuario],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ sucesso: false, erro: "Erro ao salvar foto." });
      }
      res.json({ sucesso: true, caminho });
    }
  );
});

// -------------------- ROTAS PUT -----------------------

// Atualizar usuário  
app.put('/api/usuarios/:id', upload.single('fotoPerfil'), async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.params;
  let caminhoFoto = null;

  if (req.file) {
    caminhoFoto = `/uploads/${req.file.filename}`;
  }

  // Monta a query de forma dinâmica
  let query = 'UPDATE usuarios SET nome=?, email=?';
  const params = [nome, email];

  const bcrypt = require('bcrypt');

  if (senha && senha.trim() !== "") {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    query += ', senha=?';
    params.push(senhaCriptografada);
  }


  if (caminhoFoto) {
    query += ', fotoPerfil=?';
    params.push(caminhoFoto);
  }

  query += ' WHERE id=?';
  params.push(id);

  conexao.query(query, params, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ sucesso: false, erro: 'Erro ao atualizar perfil.' });
    }
    res.json({ sucesso: true });
  });
});

// -------------------- ROTAS DELETE -----------------------

// Deletar dados do usuário e as referencias a ele
app.delete("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;

  conexao.query("DELETE FROM reservas WHERE id_usuario = ?", [id], (err) => {
    if (err) {
      console.error("Erro ao deletar reservas:", err);
      return res.status(500).json({ erro: "Erro ao apagar reservas do usuário." });
    }

    // Remove o usuário
    conexao.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
      if (err) {
        console.error("Erro ao deletar usuário:", err);
        return res.status(500).json({ erro: "Erro ao apagar conta do usuário." });
      }

      res.json({ sucesso: true, msg: "Conta apagada com sucesso!" });
    });
  });
});


// Rotas estáticas
app.use(express.static(path.join(__dirname, "views"))); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/DAO", express.static(path.join(__dirname, "DAO"))); 


// --------- INICIA SERVIDOR--------------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
