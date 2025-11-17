document.addEventListener("DOMContentLoaded", async () => {
  const idUsuario = localStorage.getItem("idUsuario");
  if (!idUsuario) {
    window.location.href = "index.html";
    return;
  }

  try {
    const resposta = await fetch(`/api/usuarios/${idUsuario}`);
    const usuario = await resposta.json();

    document.getElementById("nomeUsuario").textContent = usuario.nome;
    document.getElementById("emailUsuario").textContent = usuario.email;

    const fotoDiv = document.getElementById("fotoPerfil");
    if (usuario.fotoPerfil) {
      fotoDiv.innerHTML = `<img src="${usuario.fotoPerfil}" alt="Foto de Perfil">`;
      fotoDiv.style.background = "none"; // remove o fundo cinza e a imagem padrão

    } else {
      fotoDiv.innerHTML = `<div style="width:100px;height:100px;border-radius:50%;background:#ccc;"></div>`;
    }
  } catch (erro) {
    console.error("Erro ao carregar usuário:", erro);
  }

  document.getElementById("btnSair").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
});
