const conteiner = document.querySelector('.conteiner-imagens');
const btnProximo = document.querySelector('.btn-proximo');
const btnAnterior = document.querySelector('.btn-anterior');

let index = 0;
const totalImagens = document.querySelectorAll(".slider").length;
const imagensVisiveis = 3; // Corrigido para 3 imagens visíveis
const larguraImagem = document.querySelector(".slider").clientWidth;
const gap = 11; // Espaço entre as imagens (definido no CSS)

btnProximo.addEventListener("click", () => {
    if (index < totalImagens - imagensVisiveis) {
        index++;
        conteiner.style.transition = "transform 0.8s ease-in-out"; // Adiciona a transição diretamente
        conteiner.style.transform = `translateX(-${index * (larguraImagem + gap)}px)`;
    }
    
});

btnAnterior.addEventListener("click", () => {
    if (index > 0) {
        index--;
        conteiner.style.transform = `translateX(-${index * (larguraImagem + gap)}px)`;
    }
});


// Função de máquina de escrever
function typeWriter(element, text, speed) {
    let i = 0;
    element.style.display = 'block'; // Exibe o elemento
    element.innerHTML = ''; // Limpa o conteúdo

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none'; // Remove o cursor quando termina
        }
    }
    type();
}

// Função para observar as seções e disparar a animação
function observarSecoes() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id; // Pega o ID da seção visível
                const textElement = document.querySelector(`#texto-${targetId}`); // Encontra o título correspondente

                if (textElement) {
                    const text = textElement.textContent || textElement.innerText; // Pega o texto do título
                    typeWriter(textElement, text, 100); // Inicia a animação
                }

                observer.unobserve(entry.target); // Para de observar após a animação ser disparada
            }
        });
    }, {
        threshold: 0.2 // Dispara a animação quando 50% da seção estiver visível
    });

    // Observa as seções "sobre", "contatos" e "projetos"
    const sobreSection = document.getElementById('sobre');
    const contatosSection = document.getElementById('contatos');
    const projetosSection = document.getElementById('projetos');
    const habilidadesSection = document.getElementById('habilidades');

    if (sobreSection) observer.observe(sobreSection);
    if (contatosSection) observer.observe(contatosSection);
    if (projetosSection) observer.observe(projetosSection);
    if (habilidadesSection) observer.observe(habilidadesSection);
}

// Inicia a observação das seções quando a página carrega
document.addEventListener('DOMContentLoaded', observarSecoes);

