document.addEventListener('DOMContentLoaded', function () {
    iniciarMenu();
    iniciarCarrossel();
    iniciarIdioma();
    observarSecoes();
});

// ---------- Tradução (PT / EN) ----------
const TEXTOS = {
    pt: {
        tituloPagina: 'Portfólio Stella Gonçalves',
        menuSobre: 'Sobre mim',
        menuProjetos: 'Projetos',
        menuHabilidades: 'Habilidades',
        menuContatos: 'Contatos',
        botaoIdioma: 'Switch to English',
        abrirMenu: 'Abrir menu',
        fecharMenu: 'Fechar menu',
        titulo: 'Olá, seja bem-vindo(a) <br> <strong class="titulo-destaque">ao mundo de Stella! <br> <i class="fas fa-star star-icone"></i></strong>',
        baixarCv: 'Baixar CV',
        linkCv: 'assets/CV_Stella_Goncalves_Mendonca_Developer_Jr.pdf',
        irParaSobre: 'Ir para Sobre mim',
        tituloSobre: 'Sobre Mim',
        textoSobre:
            '<p>Oi! Eu sou a Stella, tenho 23 anos e sou <strong class="titulo-destaque">desenvolvedora Full Stack</strong>. Curso <strong class="titulo-destaque">Análise e Desenvolvimento de Sistemas</strong> e gosto de transformar ideias em algo que realmente funciona, sem deixar de lado o visual e a criatividade. Estou sempre aprendendo algo novo e busco projetos que me desafiem a evoluir.</p>' +
            '<p>Fora da programação, curto <strong class="titulo-destaque">música, jogos, filmes, séries e livros</strong>, e sou apaixonada pelos meus <strong class="titulo-destaque">cachorros</strong>. Acho que tudo isso aparece no meu jeito de trabalhar: <strong class="titulo-destaque">curiosa, criativa e sempre querendo descobrir coisas novas</strong>.</p>',
        fotoStella: 'Foto de Stella Gonçalves',
        tituloProjetos: 'Projetos',
        projetoAnterior: 'Projeto anterior',
        proximoProjeto: 'Próximo projeto',
        irParaProjeto: 'Ir para o projeto {{index}}',
        altDevflow: 'Projeto DevFlow',
        altTodo: 'Projeto QG de Missões (To-Do List)',
        altAmigo: 'Projeto Amigo Secreto',
        altPlayer: 'Projeto Player de Músicas',
        altPresente: 'Projeto Presente',
        tituloHabilidades: 'Habilidades',
        tituloContatos: 'Contatos',
        linkEmail: 'https://mail.google.com/mail/?view=cm&to=stellagmendonca@gmail.com&subject=Contato&body=Olá, Stella. Podemos conversar?',
        rodape: '© Desenvolvido por Stella Gonçalves⭐'
    },
    en: {
        tituloPagina: 'Stella Gonçalves Portfolio',
        menuSobre: 'About me',
        menuProjetos: 'Projects',
        menuHabilidades: 'Skills',
        menuContatos: 'Contact',
        botaoIdioma: 'Mudar para português',
        abrirMenu: 'Open menu',
        fecharMenu: 'Close menu',
        titulo: 'Hi, welcome <br> <strong class="titulo-destaque">to Stella\'s world! <br> <i class="fas fa-star star-icone"></i></strong>',
        baixarCv: 'Download CV',
        linkCv: 'assets/Resume_Stella_Goncalves_Mendonca_Developer_Jr.pdf',
        irParaSobre: 'Go to About me',
        tituloSobre: 'About Me',
        textoSobre:
            '<p>Hi! I\'m Stella, I\'m 23 years old and I\'m a <strong class="titulo-destaque">Full Stack developer</strong>. I study <strong class="titulo-destaque">Systems Analysis and Development</strong> and I love turning ideas into things that actually work, without leaving visuals and creativity aside. I\'m always learning something new and looking for projects that challenge me to grow.</p>' +
            '<p>Outside of programming, I enjoy <strong class="titulo-destaque">music, games, movies, TV shows and books</strong>, and I\'m in love with my <strong class="titulo-destaque">dogs</strong>. I think all of this shows in the way I work: <strong class="titulo-destaque">curious, creative and always eager to discover new things</strong>.</p>',
        fotoStella: 'Photo of Stella Gonçalves',
        tituloProjetos: 'Projects',
        projetoAnterior: 'Previous project',
        proximoProjeto: 'Next project',
        irParaProjeto: 'Go to project {{index}}',
        altDevflow: 'DevFlow project',
        altTodo: 'Mission HQ project (To-Do List)',
        altAmigo: 'Secret Santa project',
        altPlayer: 'Music Player project',
        altPresente: 'Valentine\'s gift project',
        tituloHabilidades: 'Skills',
        tituloContatos: 'Contact',
        linkEmail: 'https://mail.google.com/mail/?view=cm&to=stellagmendonca@gmail.com&subject=Contact&body=Hi, Stella. Can we talk?',
        rodape: '© Developed by Stella Gonçalves⭐'
    }
};

let idiomaAtual = 'pt';

function t(chave) {
    return TEXTOS[idiomaAtual][chave];
}

function aplicarIdioma(idioma) {
    idiomaAtual = idioma;
    document.documentElement.lang = idioma === 'pt' ? 'pt-br' : 'en';
    document.title = t('tituloPagina');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        el.innerHTML = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
        el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
        el.alt = t(el.dataset.i18nAlt);
    });
    document.querySelectorAll('[data-i18n-href]').forEach(function (el) {
        el.href = t(el.dataset.i18nHref);
    });

    // Cards dos projetos: a versão em inglês fica em assets/en/
    document.querySelectorAll('[data-card]').forEach(function (img) {
        img.src = (idioma === 'en' ? 'assets/en/' : 'assets/') + img.dataset.card;
    });

    // Títulos com efeito de digitação: só troca os que já apareceram na tela
    document.querySelectorAll('[data-i18n-titulo]').forEach(function (el) {
        if (el.dataset.pendente) return;
        cancelarDigitacao(el);
        el.textContent = t(el.dataset.i18nTitulo);
    });

    // Botão do menu mobile
    const hamburguer = document.querySelector('.cabecalho_hamburguer');
    const menuAberto = hamburguer.getAttribute('aria-expanded') === 'true';
    hamburguer.setAttribute('aria-label', t(menuAberto ? 'fecharMenu' : 'abrirMenu'));

    // Bolinhas do carrossel
    const carrossel = document.querySelector('.projetos-swiper').swiper;
    if (carrossel) carrossel.params.a11y.paginationBulletMessage = t('irParaProjeto');
    document.querySelectorAll('.projetos-paginacao .swiper-pagination-bullet').forEach(function (bolinha, i) {
        bolinha.setAttribute('aria-label', t('irParaProjeto').replace('{{index}}', i + 1));
    });

    document.querySelectorAll('.btn_idioma_opcao').forEach(function (opcao) {
        opcao.classList.toggle('ativo', opcao.dataset.idioma === idioma);
    });
}

function iniciarIdioma() {
    let salvo = null;
    try { salvo = localStorage.getItem('idioma'); } catch (e) {}
    // Sem escolha salva, usa o idioma do navegador
    const inicial = salvo || (navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en');
    aplicarIdioma(inicial);

    document.querySelector('.btn_idioma').addEventListener('click', function () {
        const novo = idiomaAtual === 'pt' ? 'en' : 'pt';
        aplicarIdioma(novo);
        try { localStorage.setItem('idioma', novo); } catch (e) {}
    });
}

// ---------- Menu mobile ----------
function iniciarMenu() {
    const botao = document.querySelector('.cabecalho_hamburguer');
    const menu = document.querySelector('.cabecalho_menu');

    function fecharMenu() {
        menu.classList.remove('aberto');
        botao.setAttribute('aria-expanded', 'false');
        botao.setAttribute('aria-label', t('abrirMenu'));
    }

    botao.addEventListener('click', function () {
        const aberto = menu.classList.toggle('aberto');
        botao.setAttribute('aria-expanded', String(aberto));
        botao.setAttribute('aria-label', t(aberto ? 'fecharMenu' : 'abrirMenu'));
    });

    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', fecharMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') fecharMenu();
    });
}

// ---------- Carrossel de projetos ----------
function iniciarCarrossel() {
    if (typeof Swiper === 'undefined') {
        console.error('Erro: Swiper não está definido. A biblioteca Swiper.js pode não ter carregado corretamente.');
        return;
    }

    new Swiper('.projetos-swiper', {
        loop: true,
        grabCursor: true,
        slidesPerView: 1.15,
        spaceBetween: 16,
        centeredSlides: true,
        keyboard: { enabled: true, onlyInViewport: true },
        a11y: {
            prevSlideMessage: 'Projeto anterior',
            nextSlideMessage: 'Próximo projeto',
            paginationBulletMessage: 'Ir para o projeto {{index}}'
        },
        navigation: {
            nextEl: '.projetos-next',
            prevEl: '.projetos-prev'
        },
        pagination: {
            el: '.projetos-paginacao',
            clickable: true
        },
        breakpoints: {
            480: {
                slidesPerView: 1.6,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 24
            },
            1024: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 30
            }
        }
    });
}

// ---------- Efeito de digitação nos títulos ----------
function cancelarDigitacao(element) {
    clearTimeout(element._digitacao);
    element.classList.remove('digitando');
}

function typeWriter(element, text, speed) {
    let i = 0;
    element.textContent = '';
    element.classList.add('digitando');

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            element._digitacao = setTimeout(type, speed);
        } else {
            element.classList.remove('digitando');
        }
    }
    type();
}

function observarSecoes() {
    const sections = ['sobre', 'projetos', 'habilidades', 'contatos'];
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduzirMovimento || !('IntersectionObserver' in window)) return;

    // Esvazia os títulos até a seção aparecer na tela
    sections.forEach(function (id) {
        const titulo = document.getElementById('texto-' + id);
        if (titulo) {
            titulo.dataset.pendente = '1';
            titulo.textContent = '';
        }
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            const titulo = document.getElementById('texto-' + entry.target.id);
            if (titulo) {
                delete titulo.dataset.pendente;
                typeWriter(titulo, t(titulo.dataset.i18nTitulo), 100);
            }
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    sections.forEach(function (id) {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
    });
}
