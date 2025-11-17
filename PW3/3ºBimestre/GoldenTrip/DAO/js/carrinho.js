document.addEventListener("DOMContentLoaded", function () {
  const btnCarrinho = document.getElementById("btnCarrinho");
  const modal = document.getElementById("modalCarrinho");
  const closeModal = document.querySelector(".close");
  const btnFechar = document.getElementById("fecharModal");

  const hotelList = document.getElementById("hotelList");
  const passagemList = document.getElementById("passagemList");
  const passeioList = document.getElementById("passeioList");
  const pacoteList = document.getElementById("pacoteList");

  // 🔹 Identificar usuário logado
  const idUsuario = localStorage.getItem("idUsuario");

  // 🔹 Se não estiver logado, limpa carrinho genérico
  if (!idUsuario) {
    localStorage.removeItem("carrinhoHotel");
    localStorage.removeItem("carrinhoPassagem");
    localStorage.removeItem("carrinhoPasseio");
    localStorage.removeItem("carrinhoPacote");
    localStorage.removeItem("itensCarrinho");
  }

  // 🔹 Prefixo para diferenciar carrinhos de usuários
  const prefix = idUsuario ? `user_${idUsuario}_` : "";

  // 🔹 Carrega o carrinho salvo do usuário logado (ou vazio)
  let carrinhoHotel = JSON.parse(localStorage.getItem(prefix + "carrinhoHotel")) || [];
  let carrinhoPassagem = JSON.parse(localStorage.getItem(prefix + "carrinhoPassagem")) || [];
  let carrinhoPasseio = JSON.parse(localStorage.getItem(prefix + "carrinhoPasseio")) || [];
  let carrinhoPacote = JSON.parse(localStorage.getItem(prefix + "carrinhoPacote")) || [];

  // 🔹 Função para salvar o carrinho individual do usuário
  function salvarCarrinho() {
    localStorage.setItem(prefix + "carrinhoHotel", JSON.stringify(carrinhoHotel));
    localStorage.setItem(prefix + "carrinhoPassagem", JSON.stringify(carrinhoPassagem));
    localStorage.setItem(prefix + "carrinhoPasseio", JSON.stringify(carrinhoPasseio));
    localStorage.setItem(prefix + "carrinhoPacote", JSON.stringify(carrinhoPacote));

    const todosItens = [
      ...carrinhoHotel.map(i => ({ ...i, tipo: "hotel" })),
      ...carrinhoPassagem.map(i => ({ ...i, tipo: "passagem" })),
      ...carrinhoPasseio.map(i => ({ ...i, tipo: "passeio" })),
      ...carrinhoPacote.map(i => ({ ...i, tipo: "pacote" }))
    ];

    localStorage.setItem(prefix + "itensCarrinho", JSON.stringify(todosItens));
  }

  // 🔹 Atualiza o modal do carrinho
  function atualizarCarrinho() {
    // Hotéis
    hotelList.innerHTML = carrinhoHotel.length === 0 ? "<p>Nenhum hotel adicionado.</p>" : "";
    carrinhoHotel.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "carrinho-item";
      div.innerHTML = `
        <span>Hotel: ${item.nome}
          <small style="margin-left:8px;color:#666">R$ ${Number(item.preco).toFixed(2)}</small>
        </span>
        <button data-index="${index}" class="remover-hotel">Remover</button>`;
      hotelList.appendChild(div);
    });

    // Passagens
    passagemList.innerHTML = carrinhoPassagem.length === 0 ? "<p>Nenhuma passagem adicionada.</p>" : "";
    carrinhoPassagem.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "carrinho-item";
      div.innerHTML = `
        <span>Passagem: ${item.nome}
          <small style="margin-left:8px;color:#666">R$ ${Number(item.preco).toFixed(2)}</small>
        </span>
        <button data-index="${index}" class="remover-passagem">Remover</button>`;
      passagemList.appendChild(div);
    });

    // Passeios
    passeioList.innerHTML = carrinhoPasseio.length === 0 ? "<p>Nenhum passeio adicionado.</p>" : "";
    carrinhoPasseio.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "carrinho-item";
      div.innerHTML = `
        <span>Passeio: ${item.nome}
          <small style="margin-left:8px;color:#666">R$ ${Number(item.preco).toFixed(2)}</small>
        </span>
        <button data-index="${index}" class="remover-passeio">Remover</button>`;
      passeioList.appendChild(div);
    });

    // Pacotes
    pacoteList.innerHTML = carrinhoPacote.length === 0 ? "<p>Nenhum pacote adicionado.</p>" : "";
    carrinhoPacote.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "carrinho-item";
      div.innerHTML = `
        <span>Pacote: ${item.nome}
          <small style="margin-left:8px;color:#666">R$ ${Number(item.preco).toFixed(2)}</small>
        </span>
        <button data-index="${index}" class="remover-pacote">Remover</button>`;
      pacoteList.appendChild(div);
    });

    // Funções de remover
    document.querySelectorAll(".remover-hotel").forEach(btn => {
      btn.addEventListener("click", e => {
        carrinhoHotel.splice(Number(e.currentTarget.dataset.index), 1);
        salvarCarrinho();
        atualizarCarrinho();
      });
    });

    document.querySelectorAll(".remover-passagem").forEach(btn => {
      btn.addEventListener("click", e => {
        carrinhoPassagem.splice(Number(e.currentTarget.dataset.index), 1);
        salvarCarrinho();
        atualizarCarrinho();
      });
    });

    document.querySelectorAll(".remover-passeio").forEach(btn => {
      btn.addEventListener("click", e => {
        carrinhoPasseio.splice(Number(e.currentTarget.dataset.index), 1);
        salvarCarrinho();
        atualizarCarrinho();
      });
    });

    document.querySelectorAll(".remover-pacote").forEach(btn => {
      btn.addEventListener("click", e => {
        carrinhoPacote.splice(Number(e.currentTarget.dataset.index), 1);
        salvarCarrinho();
        atualizarCarrinho();
      });
    });
  }

  // 🔹 Adicionar item ao carrinho
  window.adicionarAoCarrinho = function ({ id, tipo, nome, preco }) {
    if (!idUsuario) {
      alert("Por favor, faça login antes de adicionar ao carrinho!");
      return;
    }

    const item = { id, nome, preco: Number(preco) };

    switch (tipo) {
      case "hoteis": carrinhoHotel.push(item); break;
      case "passagens": carrinhoPassagem.push(item); break;
      case "passeios": carrinhoPasseio.push(item); break;
      default: carrinhoPacote.push(item);
    }

    salvarCarrinho();
    alert(`${nome} adicionado ao carrinho!`);
    atualizarCarrinho();
  };

  // 🔹 Abrir e fechar modal
  if (btnCarrinho) btnCarrinho.addEventListener("click", () => {
    if (modal) {
      modal.style.display = "flex";
      atualizarCarrinho();
    }
  });

  if (closeModal) closeModal.addEventListener("click", () => (modal.style.display = "none"));
  if (btnFechar) btnFechar.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

  atualizarCarrinho();
});
