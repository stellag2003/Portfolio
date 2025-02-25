function escrever() {
    const texto = document.getElementById("texto-sobre-mim").innerHTML;
    const texto2 = document.getElementById("texto-contatos").innerHTML;
    let i1 = 0; // Para o primeiro texto
    let i2 = 0; // Para o segundo texto

    // Função de digitação para ambos os textos
    function digitar() {
        if (i1 < texto.length) {
            document.getElementById("texto").innerHTML += texto.charAt(i1);
            i1++;
        }
        if (i2 < texto2.length) {
            document.getElementById("texto2").innerHTML += texto2.charAt(i2);
            i2++;
        }

        if (i1 < texto.length || i2 < texto2.length) {
            setTimeout(digitar, 100); // Ajuste a velocidade aqui
        } else {
            document.getElementById("texto").style.borderRight = "none"; // Remove o cursor quando termina
            document.getElementById("texto2").style.borderRight = "none"; // Remove o cursor quando termina
        }
    }

    digitar();
}

// Função que verifica a rolagem da página e dispara a digitação
window.onscroll = function() {
    const textoDiv = document.getElementById("texto");
    const textoDiv2 = document.getElementById("texto2");
    const textoDivPos = textoDiv.getBoundingClientRect().top;
    const textoDiv2Pos = textoDiv2.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Inicia o efeito quando qualquer uma das divs estiver visível na tela
    if ((textoDivPos < windowHeight) || (textoDiv2Pos < windowHeight)) {
        escrever();
        window.onscroll = null; // Desativa o evento após iniciar o efeito
    }
};

const slider = document.querySelectorAll('.slider');
const btnProximo = document.querySelector('.btn-proximo');
const btnAnterior = document.querySelector('.btn-anterior');

let slideAtivo = 0;

function EscondeSlide()
{
    slider.forEach(item => item.classList.remove('on'))
}

function MostraSlide()
{
    slider[slideAtivo].classList.add('on');

}

btnProximo.addEventListener('click', () => console.log("clicado"));
// btnAnterior.addEventListener('click');