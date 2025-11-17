document.addEventListener("DOMContentLoaded", () => {

    const criadores = [
        { nome: "Gustavo Fernandes", instagram: "https://www.instagram.com/o.gusty?igsh=MTBpdnQzajB0ajNlbg%3D%3D&utm_source=qr", linkedin: "https://www.linkedin.com/in/yz-guxt0-119249399?trk=contact-info", github: "https://github.com/session", gmail: "https://mail.google.com/mail/?view=cm&fs=1&to=gradmano265@gmail.com" },
        { nome: "Gustavo Quintanilia", instagram: "https://www.instagram.com/gustavoquintanilia?igsh=MW5vcWh4c3A0bXc5cA==", linkedin: "https://www.linkedin.com/in/gustavo-quintanilia-695988381?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/GustavoQuintanilia", gmail: "https://mail.google.com/mail/?view=cm&fs=1&to=guquinmafran@gmail.com" },
        { nome: "Nathan Fioravanti", instagram: "https://www.instagram.com/nathanfer1/", linkedin: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_nav-header-signin", github: "https://github.com/Nathan-Fioravanti/Etec-CT", gmail: "https://mail.google.com/mail/u/0/#inbox" }
    ];

    criadores.sort((a,b) => a.nome.localeCompare(b.nome));

    const modal = document.getElementById("socialModal");
    const closeBtn = modal.querySelector(".close");
    const socialLinks = document.getElementById("socialLinks");
    const modalTitle = document.getElementById("modalTitle");

    function abrirModal(rede) {
        socialLinks.innerHTML = "";
        modalTitle.textContent = `Perfis no ${rede.charAt(0).toUpperCase() + rede.slice(1)}`;

        criadores.forEach(criador => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${criador.nome}</strong>: <a href="${criador[rede]}" target="_blank">${rede}</a>`;
            socialLinks.appendChild(li);
        });

        modal.style.display = "block";
    }

    // Eventos de clique
    document.getElementById("instagram").addEventListener("click", () => abrirModal("instagram"));
    document.getElementById("linkedin").addEventListener("click", () => abrirModal("linkedin"));
    document.getElementById("github").addEventListener("click", () => abrirModal("github"));
    document.getElementById("gmail").addEventListener("click", () => abrirModal("gmail"));

    // Fechar modal
    closeBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });

});
