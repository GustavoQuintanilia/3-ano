// DAO/js/reserva/dadosReserva.js
document.addEventListener("DOMContentLoaded", function () {
  const containerItens = document.querySelector(".itens");

  // 🔹 Carregar cada categoria separadamente
  function carregarCarrinho() {
    return {
      hoteis: JSON.parse(localStorage.getItem("carrinhoHotel")) || [],
      passagens: JSON.parse(localStorage.getItem("carrinhoPassagem")) || [],
      passeios: JSON.parse(localStorage.getItem("carrinhoPasseio")) || [],
      pacotes: JSON.parse(localStorage.getItem("carrinhoPacote")) || []
    };
  }

  // 🔹 Salvar de volta no localStorage
  function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinhoHotel", JSON.stringify(carrinho.hoteis));
    localStorage.setItem("carrinhoPassagem", JSON.stringify(carrinho.passagens));
    localStorage.setItem("carrinhoPasseio", JSON.stringify(carrinho.passeios));
    localStorage.setItem("carrinhoPacote", JSON.stringify(carrinho.pacotes));
  }

  // 🔹 Atualizar itens na página
  function atualizarItensSelecionados() {
    const carrinho = carregarCarrinho();
    containerItens.innerHTML = "";

    const categorias = [
      { nome: "Hotéis", chave: "hoteis" },
      { nome: "Passagens", chave: "passagens" },
      { nome: "Passeios", chave: "passeios" },
      { nome: "Pacotes", chave: "pacotes" },
    ];

    let total = 0;
    let temItens = false;

    categorias.forEach(cat => {
      const itens = carrinho[cat.chave];

      const secao = document.createElement("div");
      secao.className = "secao-categoria";

      const titulo = document.createElement("h3");
      titulo.textContent = cat.nome;
      secao.appendChild(titulo);

      const lista = document.createElement("div");
      lista.className = "lista-categoria";

      if (itens.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = `Nenhum ${cat.nome.toLowerCase()} adicionado.`;
        msg.className = "mensagem-vazia";
        lista.appendChild(msg);
      } else {
        temItens = true;
        itens.forEach((item, index) => {
          total += Number(item.preco);
          const div = document.createElement("div");
          div.className = "item-selecionado";
          div.innerHTML = `
            <span><strong>${item.nome}</strong> - R$ ${Number(item.preco).toFixed(2)}</span>
            <button class="remover-item" data-tipo="${cat.chave}" data-index="${index}">Remover</button>
          `;
          lista.appendChild(div);
        });
      }

      secao.appendChild(lista);
      containerItens.appendChild(secao);
    });

    // 🔹 Total
    const totalDiv = document.createElement("div");
    totalDiv.className = "total-compra";
    totalDiv.innerHTML = temItens
      ? `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`
      : `<p><strong>Nenhum produto adicionado até então.</strong></p><p><strong>Preço total: R$ 0,00</strong></p>`;
    containerItens.appendChild(totalDiv);

    // 🔹 Função de remover
    document.querySelectorAll(".remover-item").forEach(btn => {
      btn.addEventListener("click", e => {
        const tipo = e.currentTarget.dataset.tipo;
        const index = Number(e.currentTarget.dataset.index);

        carrinho[tipo].splice(index, 1);
        salvarCarrinho(carrinho);
        atualizarItensSelecionados();

        // Atualiza o modal se estiver aberto
        if (window.atualizarCarrinho) window.atualizarCarrinho();
      });
    });
  }

  atualizarItensSelecionados();
});
