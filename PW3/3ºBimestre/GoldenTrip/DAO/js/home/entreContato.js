document.addEventListener("DOMContentLoaded", function() {
  emailjs.init({
    publicKey: "ajLPzwzMXnucJK8V4" // sua chave pública do EmailJS
  });

  document.getElementById("form_contato").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || email === "" || mensagem === "") {
      alert("⚠️ Por favor, preencha todos os campos antes de enviar!");
      return;
    }

    // Envia os dados usando o serviço e template configurado no EmailJS
    emailjs.send("service_qvkjncc", "template_ab1b2bh", {
      nome: nome,
      email: email,
      mensagem: mensagem
    })
    .then(() => {
      alert("✅ Mensagem enviada com sucesso!");
      document.getElementById("form_contato").reset();
    })
    .catch((error) => {
      console.error("Erro ao enviar:", error);
      alert("❌ Erro ao enviar a mensagem. Tente novamente mais tarde.");
    });
  });
});
