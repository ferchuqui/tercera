$(document).ready(function ($) {
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate : 3,
            stretch : 2,
            depth : 100,
            modifier : 5,
            slideShadows : false,
        },
        loopAdditionSlides: true,
        navigation : {
            nextEl : ".swiper-button-next",
            prevEl : ".swiper-button-prev",
        },
        pagination: {
            el : ".swiper-pagination",
            clickable: true,
        },
    });


    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        /* effect: "coverflow",
        coverflowEffect: {
            rotate : 3,
            stretch : 2,
            depth : 100,
            modifier : 5,
            slideShadows : false,
        }, */
        loopAdditionSlides: true,
        navigation : {
            nextEl : ".swiper-button-next",
            prevEl : ".swiper-button-prev",
        },
        pagination: {
            el : ".swiper-pagination",
            clickable: true,
        },
        breakpoints : {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });
    
    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors : {
                        target : ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation : {
                        effects : "fade",
                        easing : "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner"
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function() {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function() {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () =>myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }



    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);
    
});

jQuery(window).on('load',function () {
    $('body').removeClass('body-fixed')

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old=0;
    let dur = 0.4;
    let animation;

    for (let i=0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }


    //posicion inicial 
    gsap.set(".filter-active", {
        x:targets[0].offsetLeft, 
        width : targets[0].offsetWidth
    });

    function moveBar() {
        if(this.index != activeTab) {
            if(animation && animation.isActive()){
                animation.progress(1)
            }
            animation =gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active",{
                x : targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff" ,
                ease: "none"
            }, 0);
        }
    }
});


/* Inicia Efecto Nieve */

document.addEventListener("DOMContentLoaded", function () {
    const santaButton = document.getElementById('santaButton');
    const christmasMusic = document.getElementById('christmasMusic');
    const main = document.querySelector('main');
    let isPlaying = false;
    let snowInterval;

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Posición inicial
        snowflake.style.left = Math.random() * 90 + 'vw'; // Posición horizontal aleatoria
        snowflake.style.animationDuration = Math.random() * 2 + 1.5 + 's'; // Velocidad aleatoria (más rápido)
        snowflake.style.opacity = Math.random(); // Transparencia aleatoria
        snowflake.style.fontSize = Math.random() * 30 + 10 + 'px'; // Tamaño aleatorio más grande
        snowflake.style.color = "red"

        snowflake.textContent = '❄'; // Copo de nieve
        main.appendChild(snowflake);

        // Remover el copo después de caer
        setTimeout(() => {
            snowflake.remove();
        }, 3000); // Ajusta al mismo tiempo de duración de la animación
    }

    santaButton.addEventListener('click', function () {
        if (!isPlaying) {
            christmasMusic.play(); // Reproduce la música
            santaButton.innerHTML = '<i class="bi bi-music-note-beamed"></i> 🎅 Detener Música';
            isPlaying = true;

            // Iniciar el efecto de nieve con mayor frecuencia
            snowInterval = setInterval(createSnowflake, 100); // Se crean más copos al reducir el intervalo
        } else {
            christmasMusic.pause(); // Pausa la música
            santaButton.innerHTML = '<i class="bi bi-snow2"></i> 🎅 Música Navideña';
            isPlaying = false;

            // Detener el efecto de nieve
            clearInterval(snowInterval);
        }
    });
});




/* Termina Efecto Nieve */

/* Inicia Boton rojo */

document.addEventListener("DOMContentLoaded", function () {
    const suggestionArrow = document.getElementById('suggestionArrow');
    const santaButton = document.getElementById('santaButton');

    // Ocultar el botón de sugerencia después de presionar el botón de música
    santaButton.addEventListener('click', function () {
        suggestionArrow.style.display = 'none'; // Oculta la flecha
    });

    // Mostrar el botón de sugerencia después de unos segundos si no se presiona
    setTimeout(() => {
        if (!santaButton.classList.contains('clicked')) {
            suggestionArrow.style.display = 'block';
        }
    }, 5000); // Muestra la flecha después de 5 segundos
});


/* Termina Boton Rojo */

/* Festejo de navidad */



    document.addEventListener("DOMContentLoaded", function () {
        const santaButton = document.getElementById('santaButton');
        const christmasMusic = document.getElementById('christmasMusic');
        let isPlaying = false;

        santaButton.addEventListener('click', function () {
            if (!isPlaying) {
                christmasMusic.play(); // Reproduce la música
                 console.log("que linda musica")
                santaButton.innerHTML = '<i class="bi bi-music-note-beamed"></i> 🎅 Detener Música';
                isPlaying = true;
            } else {
                christmasMusic.pause(); // Pausa la música
                santaButton.innerHTML = '<i class="bi bi-snow2"></i> 🎅 Música Navideña';
                isPlaying = false;
            }
        });
    });

