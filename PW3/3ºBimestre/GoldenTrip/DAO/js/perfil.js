document.addEventListener("DOMContentLoaded", async () => {
  const idUsuario = localStorage.getItem("idUsuario");
  if (!idUsuario) return; // se não estiver logado, deixa a imagem padrão

  try {
    const resposta = await fetch(`/api/usuarios/${idUsuario}`);
    if (!resposta.ok) throw new Error("Erro ao buscar usuário");

    const usuario = await resposta.json();
    const fotoIcone = document.getElementById("fotoPerfilIcone");

    if (usuario.fotoPerfil) {
      fotoIcone.src = usuario.fotoPerfil; // exibe a imagem do banco
    } else {
      fotoIcone.src = "../DAO/img/painel_do_viajante.png"; // imagem padrão
    }
  } catch (erro) {
    console.error("Erro ao carregar ícone do perfil:", erro);
  }
});
