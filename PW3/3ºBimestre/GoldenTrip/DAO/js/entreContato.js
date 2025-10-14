document.addEventListener("DOMContentLoaded", function() {
  emailjs.init({
    publicKey: "9HTJ5GDrHvqiG0tBa"
  });

  document.getElementById("form_contato").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || mensagem === "") {
      alert("⚠️ Por favor, preencha todos os campos antes de enviar!");
      return;
    }

    emailjs.send("service_gtiuxcc", "template_ihwic7b", {
      nome: nome,
      mensagem: mensagem
    })
    .then(() => {
      alert("✅ Mensagem enviada com sucesso!");
      document.getElementById("form_contato").reset();
    })
    .catch((error) => {
      console.error("Erro ao enviar:", error);
      alert("❌ Erro ao enviar: " + JSON.stringify(error));
    });
  });
});
