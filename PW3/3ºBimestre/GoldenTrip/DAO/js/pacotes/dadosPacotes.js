document.addEventListener("DOMContentLoaded", () => {
  const containerPacotes = document.querySelector(".container-pacotes");

  // Função para criar card de pacote
  function criarCardPacote(pacote) {
    const card = document.createElement("div");
    card.className = "pacote";

    card.innerHTML = `
      <div class="imagem">
        <img src="${pacote.imagem}" alt="${pacote.nome}" style="width:100%; height:180px; object-fit:cover; border-radius:8px;">
      </div>
      <p class="nome"><strong>${pacote.nome}</strong></p>
      <p>${pacote.descricao}</p>
      <p><strong>R$ ${Number(pacote.preco).toFixed(2)}</strong></p>
      <button class="btn-adicionar">Adicionar ao Carrinho</button>
    `;

    // Botão adiciona ao carrinho
    const btn = card.querySelector(".btn-adicionar");
    btn.addEventListener("click", () => {
      if (window.adicionarAoCarrinho) {
        window.adicionarAoCarrinho({
          id: pacote.id,
          tipo: "pacotes",
          nome: pacote.nome,
          preco: pacote.preco
        });
      }
    });

    containerPacotes.appendChild(card);
  }

  // Puxa os pacotes do servidor via API
  fetch("/api/pacotes")
    .then(res => res.json())
    .then(pacotes => {
      containerPacotes.innerHTML = ""; // limpa os cards antigos
      pacotes.forEach(criarCardPacote);
    })
    .catch(err => console.error("Erro ao carregar pacotes:", err));
});
