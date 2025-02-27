const conteiner = document.querySelector('.conteiner-imagens'); // Um único contêiner
const btnProximo = document.querySelector('.btn-proximo');
const btnAnterior = document.querySelector('.btn-anterior');

let index = 0;
const totalImagens = document.querySelectorAll(".slider").length;
const imagensVisiveis = 4;
const larguraImagem = document.querySelector(".slider").clientWidth;

btnProximo.addEventListener("click", () => {
    if (index < totalImagens - imagensVisiveis) {
        index++;
        conteiner.style.transform = `translateX(-${index * (larguraImagem + 310)}px)`;
    }
});

btnAnterior.addEventListener("click", () => {
    if (index > 0) {
        index--;
        conteiner.style.transform = `translateX(-${index * (larguraImagem + 10)}px)`;
    }
});


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
    const textoDivPos = textoDiv.getBoundingClientRect().top;
    const textoDiv2 = document.getElementById("texto2");
    const textoDiv2Pos = textoDiv2.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Inicia o efeito quando qualquer uma das divs estiver visível na tela
    if ((textoDivPos < windowHeight) || (textoDiv2Pos < windowHeight) ) {
        escrever();
        window.onscroll = null; // Desativa o evento após iniciar o efeito
    }
};

