document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper !== 'undefined') {
      const swiper = new Swiper('.projetos-swiper', {
    autoHeight: true,
    loop: true,
    // Remova slidesPerView e slidesPerGroup da configuração principal
    // Eles serão definidos nos breakpoints
    spaceBetween: 20, // Valor padrão (menor)
    centeredSlides: false,
    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    breakpoints: {
        // Mobile pequeno (0-479px)
        0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 15
        },
        // Mobile grande (480-767px)
        480: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20
        },
        // Tablet (768-1023px)
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 25
        },
        // Desktop pequeno (1024-1199px)
        1024: {
            slidesPerView: 3,
            slidesPerGroup: 2,
            spaceBetween: 30
        },
        // Desktop grande (1200px+)
        1200: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40
        }
      }     
        });

        console.log("Swiper inicializado com sucesso para .projetos-swiper!");

    } else {
        console.error("Erro: Swiper não está definido. A biblioteca Swiper.js pode não ter carregado corretamente.");
    }

    
    function typeWriter(element, text, speed) {
        let i = 0;
        element.style.display = 'block';
        element.innerHTML = ''; 

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.style.borderRight = 'none'; 
            }
        }
        type();
    }

    function observarSecoes() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    const textElement = document.querySelector(`#texto-${targetId}`);

                    if (textElement) {
                        const originalText = textElement.getAttribute('data-original-text');
                        if (!originalText) {
                            textElement.setAttribute('data-original-text', textElement.textContent || textElement.innerText);
                        }
                        typeWriter(textElement, originalText || textElement.textContent || textElement.innerText, 100);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.01 
        });

        const sections = ['sobre', 'contatos', 'projetos', 'habilidades'];
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) observer.observe(element);
        });
    }

    observarSecoes();
});