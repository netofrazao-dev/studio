/*
  --------------------------------------------------------------
  SCRIPT PRINCIPAL - LUMEN STUDIO
  Funcionalidades:
    - Menu mobile (abrir/fechar)
    - Scroll suave para seções âncora
    - Lightbox simples para o portfólio
    - Atualização do ano no footer
  Observação:
    JavaScript puro, organizado e fácil de adaptar.
  --------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", function () {
  // Seletores principais
  const header = document.querySelector(".header");
  const nav = document.querySelector(".header__nav");
  const toggleButton = document.querySelector(".header__toggle");
  const navLinks = document.querySelectorAll("[data-scroll]");
  const contactButtons = document.querySelectorAll(".js-scroll-to-contact");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox ? lightbox.querySelector(".lightbox__image") : null;
  const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox__caption") : null;
  const lightboxCloseButton = lightbox ? lightbox.querySelector(".lightbox__close") : null;
  const portfolioItems = document.querySelectorAll(".portfolio__item");
  const currentYearEl = document.getElementById("current-year");

  // Atualiza o ano atual no footer
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // -----------------------------------------------------------
  // MENU MOBILE
  // -----------------------------------------------------------

  /**
   * Abre/fecha o menu mobile.
   * Adiciona e remove classes no botão, navegação e body (para travar o scroll).
   */
  function toggleMobileMenu() {
    if (!nav || !toggleButton) return;

    const isOpen = nav.classList.contains("header__nav--open");

    nav.classList.toggle("header__nav--open");
    toggleButton.classList.toggle("header__toggle--active");
    document.body.classList.toggle("no-scroll", !isOpen);

    toggleButton.setAttribute("aria-expanded", String(!isOpen));
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", toggleMobileMenu);
  }

  // -----------------------------------------------------------
  // SCROLL SUAVE
  // -----------------------------------------------------------

  /**
   * Executa scroll suave até o elemento alvo,
   * considerando a altura do header fixo.
   * @param {HTMLElement} targetElement
   */
  function smoothScrollTo(targetElement) {
    if (!targetElement) return;

    const headerHeight = header ? header.offsetHeight : 0;

    // Posição do elemento em relação ao topo da página
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset;

    const offsetPosition = elementPosition - headerHeight - 12; // leve ajuste visual

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  /**
   * Handler genérico para links com atributo data-scroll,
   * que aponta para ids de seções (ex: #about, #services).
   */
  function handleNavLinkClick(event) {
    const link = event.currentTarget;
    const href = link.getAttribute("href");

    // Garante que é uma âncora interna (#id)
    if (!href || !href.startsWith("#")) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    event.preventDefault();
    smoothScrollTo(targetElement);

    // Fecha o menu mobile ao clicar em um item (apenas em telas menores)
    if (window.innerWidth < 768 && nav.classList.contains("header__nav--open")) {
      toggleMobileMenu();
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", handleNavLinkClick);
  });

  // Botões específicos que devem rolar até o contato
  contactButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const contactSection = document.getElementById("contact");
      smoothScrollTo(contactSection);
    });
  });

  // -----------------------------------------------------------
  // EFEITO HEADER AO ROLAR
  // -----------------------------------------------------------

  /**
   * Adiciona uma classe ao header quando a página é rolada
   * para aplicar sombra e reforçar a separação do conteúdo.
   */
  function handleScrollHeader() {
    if (!header) return;

    if (window.scrollY > 10) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }

  window.addEventListener("scroll", handleScrollHeader);
  handleScrollHeader(); // estado inicial

  // -----------------------------------------------------------
  // LIGHTBOX / MODAL DE IMAGENS DO PORTFÓLIO
  // -----------------------------------------------------------

  /**
   * Abre o lightbox com a imagem e legenda fornecidas.
   * @param {string} src - Caminho da imagem em alta
   * @param {string} alt - Texto alternativo da imagem
   * @param {string} caption - Legenda opcional para exibir abaixo da imagem
   */
  function openLightbox(src, alt, caption) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = caption || "";

    lightbox.classList.add("lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  /**
   * Fecha o lightbox e limpa a imagem exibida.
   */
  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.remove("lightbox--open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");

    // Opcional: limpar src para evitar carregar imagem em background
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }

  // Clique nos cards do portfólio para abrir o lightbox
  portfolioItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const img = item.querySelector("img");
      if (!img) return;

      // Usa o data-full se estiver definido; caso contrário, usa o src atual
      const highResSrc = item.getAttribute("data-full") || img.src;
      const alt = img.alt || "";
      const titleEl = item.querySelector(".portfolio__title");

      const caption = titleEl ? titleEl.textContent.trim() : "";

      openLightbox(highResSrc, alt, caption);
    });
  });

  // Botão de fechar do lightbox
  if (lightboxCloseButton) {
    lightboxCloseButton.addEventListener("click", closeLightbox);
  }

  // Clique fora do conteúdo interno fecha o lightbox
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Tecla ESC fecha o lightbox, se estiver aberto
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      if (lightbox && lightbox.classList.contains("lightbox--open")) {
        closeLightbox();
      }
    }
  });
});

//direcionar para agendar sessao
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((el) => el.classList.remove("is-open"));

      if (!isOpen) {
        item.classList.add("is-open");
      }
    });
  });
});

// FORMULÁRIO DE CONTATO → WHATSAPP
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // impede recarregamento da página

    const nome = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const servico = document.getElementById("service").value;
    const mensagem = document.getElementById("message").value.trim();

    let servicoTexto = "Não informado";
    if (servico === "retrato") servicoTexto = "Retrato profissional";
    if (servico === "editorial") servicoTexto = "Editorial / Campanha";
    if (servico === "produto") servicoTexto = "Still / Produto";
    if (servico === "outro") servicoTexto = "Outro";

    const textoWhatsApp = `
Olá! Meu nome é ${nome}.

Tenho interesse em serviços fotográficos.

📸 Tipo de sessão: ${servicoTexto}
📧 E-mail: ${email}

📝 Mensagem:
${mensagem}
    `.trim();

    const numeroWhatsApp = "5599999999999"; // ← TROQUE PELO NÚMERO REAL
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;

    window.open(url, "_blank");
  });
});
