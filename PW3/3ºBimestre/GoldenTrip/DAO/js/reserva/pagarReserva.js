document.addEventListener("DOMContentLoaded", () => {
  const itensContainer = document.querySelector(".itens");
  const pagamentosContainer = document.querySelector(".pagamentos");
  const metodos = document.querySelectorAll(".metodo");
  let metodoSelecionado = null;

  function obterCarrinhoAtual() {
    const idUsuario = localStorage.getItem("idUsuario");
    const prefix = idUsuario ? `user_${idUsuario}_` : "";
    return JSON.parse(localStorage.getItem(prefix + "itensCarrinho")) || [];
  }


  // 🔹 Exibir itens + total + botão de remover
  function exibirItensCarrinho() {
    const carrinho = obterCarrinhoAtual();
    itensContainer.innerHTML = "";

    if (carrinho.length === 0) {
      itensContainer.innerHTML = "<p>Nenhum item selecionado.</p>";
      return;
    }

    let total = 0;
    carrinho.forEach(item => {
      total += Number(item.preco);
      const div = document.createElement("div");
      div.classList.add("item-reserva");
      div.innerHTML = `
        <div>
          <h4>${item.nome}</h4>
          <p>Preço: R$ ${Number(item.preco).toFixed(2)}</p>
        </div>
      `;
      itensContainer.appendChild(div);
    });

    // 🔹 Mostrar o total e botão remover
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total-reserva");
    totalDiv.innerHTML = `
      <hr>
      <h3>Total: R$ ${total.toFixed(2)}</h3>
      <button id="removerItensCarrinho" class="btn-remover">🗑️ Remover Itens</button>
    `;
    itensContainer.appendChild(totalDiv);

    // 🔹 Ação do botão remover
    document.getElementById("removerItensCarrinho").addEventListener("click", () => {
      if (confirm("Tem certeza que deseja remover todos os itens do carrinho?")) {
        const idUsuario = localStorage.getItem("idUsuario");
        const prefix = idUsuario ? `user_${idUsuario}_` : "";
        localStorage.removeItem(prefix + "carrinhoHotel");
        localStorage.removeItem(prefix + "carrinhoPassagem");
        localStorage.removeItem(prefix + "carrinhoPasseio");
        localStorage.removeItem(prefix + "carrinhoPacote");
        localStorage.removeItem(prefix + "itensCarrinho");
        exibirItensCarrinho();
      }
    });
  }

  exibirItensCarrinho();

  // 🔹 Exibir campos de pagamento
  function mostrarCamposPagamento(metodo) {
    const existente = document.querySelector(".campos-dinamicos");
    if (existente) existente.remove();

    const div = document.createElement("div");
    div.classList.add("campos-dinamicos");

    let labelPagamento = "";
    let placeholder = "";

    switch (metodo) {
      case "pix":
        labelPagamento = "Chave PIX:";
        placeholder = "Digite sua chave PIX";
        break;
      case "debito":
        labelPagamento = "Número do Cartão (Débito):";
        placeholder = "XXXX XXXX XXXX XXXX";
        break;
      case "credito":
        labelPagamento = "Número do Cartão (Crédito):";
        placeholder = "XXXX XXXX XXXX XXXX";
        break;
    }

    const hoje = new Date().toISOString().split("T")[0];

    div.innerHTML = `
      <div class="campo-pagamento">
        <label>${labelPagamento}</label>
        <input type="text" id="campoPagamento" placeholder="${placeholder}">
      </div>

      <div class="campo-data">
        <label>Data da Viagem:</label>
        <input type="date" id="dataViagem" min="${hoje}">
      </div>

      <div class="campo-hora">
        <label>Hora da Viagem:</label>
        <input type="time" id="horaViagem">
      </div>

      <button id="efetuarCompra">Efetuar Compra</button>
    `;

    pagamentosContainer.insertAdjacentElement("afterend", div);

    // 🔹 Evento do botão de compra
    document.getElementById("efetuarCompra").addEventListener("click", async () => {
      const carrinho = obterCarrinhoAtual();
      const campoPagamento = document.getElementById("campoPagamento").value.trim();
      const dataViagem = document.getElementById("dataViagem").value;
      const horaViagem = document.getElementById("horaViagem").value;

      if (carrinho.length === 0) {
        alert("Você não possui itens no carrinho!");
        return;
      }
      if (!campoPagamento) {
        alert("Preencha o campo de pagamento!");
        return;
      }
      if (!dataViagem || !horaViagem) {
        alert("Selecione a data e a hora da viagem!");
        return;
      }

      const valorTotal = carrinho.reduce((t, i) => t + Number(i.preco), 0);
      const idUsuario = localStorage.getItem("idUsuario");

      try {
        const resposta = await fetch("/api/reservar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUsuario,
            itens: carrinho,
            valorTotal,
            dataViagem,
            horaViagem
          })
        });

        const resultado = await resposta.json();

    if (resultado.sucesso) {
      alert("Pagamento realizado com sucesso!");

      const idUsuario = localStorage.getItem("idUsuario");
      const prefix = idUsuario ? `user_${idUsuario}_` : "";

      // 🔹 Limpa todos os itens do carrinho do usuário logado
      localStorage.removeItem(prefix + "carrinhoHotel");
      localStorage.removeItem(prefix + "carrinhoPassagem");
      localStorage.removeItem(prefix + "carrinhoPasseio");
      localStorage.removeItem(prefix + "carrinhoPacote");
      localStorage.removeItem(prefix + "itensCarrinho");

      // 🔹 Atualiza a interface
      exibirItensCarrinho();

      const campos = document.querySelector(".campos-dinamicos");
      if (campos) campos.remove();
    }
    else {
              alert("Erro ao processar pagamento!");
            }
          } catch (erro) {
            console.error("Erro ao enviar:", erro);
            alert("Erro na conexão com o servidor!");
          }
        });
      }

  // 🔹 Selecionar método
  metodos.forEach(metodo => {
    metodo.addEventListener("click", () => {
      metodos.forEach(m => m.classList.remove("ativo"));
      metodo.classList.add("ativo");
      metodoSelecionado = metodo.dataset.metodo;
      mostrarCamposPagamento(metodoSelecionado);
    });
  });
});
