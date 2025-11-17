// MENU DROPDOWN
const btnMenuOpcoes = document.getElementById("btnMenuOpcoes");
const dropdown = document.getElementById("dropdownOpcoes");

btnMenuOpcoes.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// FECHA O MENU AO CLICAR FORA
document.addEventListener("click", (e) => {
  if (!btnMenuOpcoes.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// BOTÃO DELETAR CONTA
document.getElementById("btnDeletarConta").addEventListener("click", () => {
  const confirmar = confirm("Tem certeza que deseja apagar sua conta?");

  if (!confirmar) return;

  const idUsuario = localStorage.getItem("idUsuario");

  fetch(`/api/usuarios/${idUsuario}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => {
    if (data.sucesso) {
      alert("Conta excluída com sucesso!");

      localStorage.clear();
      window.location.href = "index.html";
    } else {
      alert("Erro ao excluir conta.");
    }
  })
  .catch(err => {
    console.error("Erro ao deletar conta:", err);
    alert("Erro no servidor.");
  });
});
