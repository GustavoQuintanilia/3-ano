document.addEventListener("DOMContentLoaded", async () => {
  const idUsuario = localStorage.getItem("idUsuario");
  if (!idUsuario) return;

  const listaReservas = document.getElementById("listaReservas");

  try {
    const resposta = await fetch(`/api/reservas/usuario/${idUsuario}`);
    const reservas = await resposta.json();

    if (!reservas || reservas.length === 0) {
      listaReservas.innerHTML = `<p>Você não possui reservas.</p>`;
      return;
    }

    for (const reserva of reservas) {
      const nomesItens = [];
      const tipos = [];

      // 🔹 Hotel
      if (reserva.id_hotel) {
        const res = await fetch(`/api/hoteis/${reserva.id_hotel}`);
        const hotel = await res.json();
        nomesItens.push(hotel.nome);
        tipos.push("Hotel");
      }

      // 🔹 Passagem
      if (reserva.id_passagem) {
        const res = await fetch(`/api/passagens/${reserva.id_passagem}`);
        const passagem = await res.json();
        nomesItens.push(passagem.nome);
        tipos.push("Passagem");
      }

      // 🔹 Passeio
      if (reserva.id_passeio) {
        const res = await fetch(`/api/passeios/${reserva.id_passeio}`);
        const passeio = await res.json();
        nomesItens.push(passeio.nome);
        tipos.push("Passeio");
      }

      // 🔹 Pacote
      if (reserva.id_pacote) {
        const res = await fetch(`/api/pacotes/${reserva.id_pacote}`);
        const pacote = await res.json();
        nomesItens.push(pacote.nome);
        tipos.push("Pacote");
      }

      // 🔹 Monta nomes em formato de lista
      const nomesHTML = nomesItens.map((n, i) => `<li>${tipos[i]}: ${n}</li>`).join("");

      // 🔹 Formata datas e valores
      const dataCompra = new Date(reserva.data_compra).toLocaleString("pt-BR");
      const dataViagem = new Date(reserva.data_viagem).toLocaleDateString("pt-BR");
      const horaViagem = reserva.hora_viagem ? reserva.hora_viagem.slice(0, 5) : "Não informada";
      const valor = parseFloat(reserva.valor_total).toFixed(2);

      // 🔹 Cria o card
      const card = document.createElement("div");
      card.classList.add("card-reserva");
      card.innerHTML = `
        <h3>Reserva #${reserva.id}</h3>
        <ul>${nomesHTML}</ul>
        <p><strong>Valor Total:</strong> R$ ${valor}</p>
        <p><strong>Data da Compra:</strong> ${dataCompra}</p>
        <p><strong>Data da Viagem:</strong> ${dataViagem}</p>
        <p><strong>Hora da Viagem:</strong> ${horaViagem}</p>
      `;

      listaReservas.appendChild(card);
    }
  } catch (erro) {
    console.error("Erro ao carregar reservas:", erro);
    listaReservas.innerHTML = `<p>Erro ao carregar suas reservas.</p>`;
  }
});
