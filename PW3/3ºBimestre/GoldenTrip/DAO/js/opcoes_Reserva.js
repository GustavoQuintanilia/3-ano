document.addEventListener("DOMContentLoaded", function () {
    const botoes = document.querySelectorAll('.aba-item');
    const abas = document.querySelectorAll('.conteudo-aba');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove active das abas e botões
            botoes.forEach(b => b.classList.remove('active'));
            abas.forEach(a => a.classList.remove('active'));

            // Adiciona active ao botão e à aba correta
            const abaAlvo = botao.getAttribute('data-aba');
            botao.classList.add('active');
            document.getElementById(`conteudo-${abaAlvo}`).classList.add('active');
        });
    });
});

