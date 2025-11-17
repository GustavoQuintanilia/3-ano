const modal = document.getElementById("modalEditar");
const btnEditar = document.getElementById("btnEditar");
const btnFecharModal = document.getElementById("btnFecharModal");
const formEditarPerfil = document.getElementById("formEditarPerfil");
const previewFoto = document.getElementById("previewFoto");

// Abrir modal com dados do usuário
btnEditar.addEventListener("click", async () => {
  modal.style.display = "flex";
  const idUsuario = localStorage.getItem("idUsuario");

  const resposta = await fetch(`/api/usuarios/${idUsuario}`);
  const usuario = await resposta.json();

  document.getElementById("nome").value = usuario.nome;
  document.getElementById("email").value = usuario.email;

  if (usuario.fotoPerfil) {
    previewFoto.src = usuario.fotoPerfil;
    previewFoto.style.display = "block";
  } else {
    previewFoto.style.display = "none";
  }
});

// Fechar modal
btnFecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Mostrar prévia da foto
document.getElementById("fotoPerfilInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewFoto.src = reader.result;
      previewFoto.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Salvar alterações (nome, email, senha, e foto)
formEditarPerfil.addEventListener("submit", async (e) => {
  e.preventDefault();

  const idUsuario = localStorage.getItem("idUsuario");
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const foto = document.getElementById("fotoPerfilInput").files[0];

  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("email", email);
  formData.append("senha", senha);
  formData.append("idUsuario", idUsuario);
  if (foto) formData.append("fotoPerfil", foto);

  try {
    const resposta = await fetch(`/api/usuarios/${idUsuario}`, {
      method: "PUT",
      body: formData
    });

    const resultado = await resposta.json();

    if (resultado.sucesso) {
      alert("Perfil atualizado com sucesso!");
      modal.style.display = "none";
      location.reload();
    } else {
      alert("Erro ao atualizar perfil.");
    }
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Erro ao atualizar perfil.");
  }
});
