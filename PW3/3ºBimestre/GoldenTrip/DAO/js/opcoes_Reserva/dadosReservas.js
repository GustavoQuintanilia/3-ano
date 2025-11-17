// DAO/js/opcoes_Reserva/opcoes_Reserva.js
document.addEventListener("DOMContentLoaded", () => {
  carregarTipo("hoteis", "hotelContainer");
  carregarTipo("passagens", "passagemContainer");
  carregarTipo("passeios", "passeioContainer");
});

async function carregarTipo(tipo, containerId) {
  try {
    const resp = await fetch(`/api/${tipo}`);
    if (!resp.ok) throw new Error("Erro ao buscar " + tipo);
    const dados = await resp.json();

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    dados.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.width = "291px";

      const img = document.createElement("img");
      img.className = "card-img-top";
      img.src = item.imagem || "../DAO/img/placeholder.png";
      img.alt = item.nome;

      const body = document.createElement("div");
      body.className = "card-body";

      const h5 = document.createElement("h5");
      h5.className = "card-title";
      h5.textContent = item.nome;

      const p = document.createElement("p");
      p.className = "card-text";
      p.textContent = item.descricao;

      const preco = document.createElement("span");
      preco.className = "preco";
      preco.textContent = `R$ ${Number(item.preco).toFixed(2)}`;

      const btn = document.createElement("button");
      btn.className = "btn-btn-primary";
      btn.textContent = "Adicionar ao carrinho";
      // data para identificar
      btn.dataset.tipo = tipo;
      btn.dataset.id = item.id;
      btn.dataset.nome = item.nome;
      btn.dataset.preco = item.preco;

      btn.addEventListener("click", () => {
        // chama função pública do carrinho
        if (typeof window.adicionarAoCarrinho === "function") {
          window.adicionarAoCarrinho({
            id: item.id,
            tipo,
            nome: item.nome,
            preco: item.preco
          });
        } else {
          console.warn("Função adicionarAoCarrinho não encontrada.");
        }
      });

      body.appendChild(h5);
      body.appendChild(p);
      body.appendChild(preco);
      body.appendChild(btn);

      card.appendChild(img);
      card.appendChild(body);

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Erro ao carregar cards:", err);
  }
}
