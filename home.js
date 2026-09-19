let home = document.getElementById("home")
let historia = document.getElementById("historia")
let artistas = document.getElementById("artistas")
let instrumentos = document.getElementById("instrumentos")

let inicio1 = document.getElementById("inicio1")
let inicio2 = document.getElementById("inicio2")
let inicio3 = document.getElementById("inicio3")

let punto1 = document.getElementById("punto1")
let punto2 = document.getElementById("punto2")
let punto3 = document.getElementById("punto3")

// Variables globales (sin 'let' adentro de los listeners)
let inicioActual1 = false
let inicioActual2 = false
let inicioActual3 = false

let timerActual = null // Guarda el timer activo para poder cancelarlo

const paso = 50;
const limiteMax = 107.5;

const elementos = document.querySelectorAll('.animar');

// Las secciones "instrumentosBarra", "instrumentos" y "home" tienen cada
// una su propio carrusel "De línea" y "Customizados". Antes esos elementos
// compartían el mismo id (btn_arrow, cardsContenedor_Carrusel, etc.) en
// las 3 secciones, y como document.getElementById siempre devuelve el
// PRIMER elemento del documento con ese id, los listeners terminaban
// enganchados únicamente a los botones de "instrumentosBarra" (la primera
// sección del HTML) sin importar en qué sección se hiciera click. Por eso
// los botones de "home" e "instrumentos" no respondían.
// Ahora cada set de ids lleva un sufijo por sección (_barra, _detalle, _home)
// y se arma un carrusel independiente por cada uno.
function crearCarrusel(sufijo, numero = "") {
    return {
        posicionActual: 0,
        botonRetroceso: false,
        contenedor: document.getElementById(`cardsContenedor_Carrusel${numero}_${sufijo}`),
        btnAvanzar: document.getElementById(`btn_arrow${numero}_${sufijo}`),
        btnRetroceder: document.getElementById(`btn_arrowRotate${numero}_${sufijo}`),
    }
}

const sufijosSecciones = ["barra", "detalle", "home"]

const carrusels = sufijosSecciones.flatMap((sufijo) => [
    crearCarrusel(sufijo),        // carrusel "De línea"
    crearCarrusel(sufijo, "2"),   // carrusel "Customizados"
]).filter((c) => c.contenedor && c.btnAvanzar && c.btnRetroceder)
let card1 = document.getElementById("Card1")
let card2 = document.getElementById("Card2")
let guitarra = document.getElementById("guitarra")
let bajo = document.getElementById("bajo")

let inicioImg = document.getElementById("inicioImg")
let navBar_pantalla2 = document.getElementById("navBar_pantalla2")
let navBar_pantalla3 = document.getElementById("navBar_pantalla3")
let navBar_pantalla4 = document.getElementById("navBar_pantalla4")

let instrumentosBarra = document.getElementById("instrumentosBarra")

// Lógica reutilizable de hover para las imágenes de las cards del carrusel.
// En vez de variables/ids individuales por imagen (imagenGuitarra, imagenGuitarra2, ...),
// se recorren todas las cards (".cards_Carrusel") y se busca dentro de cada una
// su imagen de "frente" (.imagenGuitarra) y su imagen de "atrás" (.imagenGuitarraAtras).
// Así, cualquier card que se agregue al HTML (en cardsContenedor_Carrusel o
// cardsContenedor_Carrusel2) obtiene el efecto automáticamente, sin tocar el JS.
function activarHoverImagenesCarrusel(selectorCards = ".cards_Carrusel") {
    const cards = document.querySelectorAll(selectorCards)

    cards.forEach((card) => {
        const imagenFrente = card.querySelector(".imagenGuitarra")
        const imagenAtras = card.querySelector(".imagenGuitarraAtras")

        // Si a la card le falta alguna de las dos imágenes, se la salteamos
        if (!imagenFrente || !imagenAtras) return

        imagenFrente.addEventListener("mouseover", () => {
            imagenAtras.classList.remove("opacity")
            imagenFrente.classList.add("opacity")
        })

        imagenFrente.addEventListener("mouseout", () => {
            imagenAtras.classList.add("opacity")
            imagenFrente.classList.remove("opacity")
        })
    })
}

// Se aplica a TODAS las cards de TODOS los carruseles (barra, detalle y home),
// ya que ".cards_Carrusel" es una clase, no un id, y no tiene el problema de
// duplicados que sí tenían los selectores "#cardsContenedor_Carrusel ..."
activarHoverImagenesCarrusel(".cards_Carrusel")

navBar_pantalla4.addEventListener("click", () => {
home.classList.add("displayNone")
home.classList.add("opacity")
home.classList.remove("aparecer")
historia.classList.add("displayNone")
historia.classList.add("opacity")
historia.classList.remove("aparecer")
artistas.classList.add("displayNone")
artistas.classList.add("opacity")
artistas.classList.remove("aparecer")
navBar_pantalla3.classList.remove("hover_navBar")
navBar_pantalla2.classList.remove("hover_navBar")
navBar_pantalla4.classList.add("hover_navBar")
instrumentosBarra.classList.remove("displayNone")
instrumentos.classList.add("displayNone")
})


navBar_pantalla3.addEventListener("click", () => {
home.classList.add("displayNone")
home.classList.add("opacity")
home.classList.remove("aparecer")
historia.classList.add("displayNone")
historia.classList.add("opacity")
historia.classList.remove("aparecer")
artistas.classList.remove("displayNone")
artistas.classList.remove("opacity")
artistas.classList.add("aparecer")
navBar_pantalla3.classList.add("hover_navBar")
navBar_pantalla2.classList.remove("hover_navBar")
navBar_pantalla4.classList.remove("hover_navBar")
instrumentos.classList.add("displayNone")
instrumentosBarra.classList.add("displayNone")
pantallaInstrumentos = false
})

inicioImg.addEventListener("click", () => {
    home.classList.remove("displayNone")
    home.classList.remove("opacity")
    home.classList.add("aparecer")
    historia.classList.add("displayNone")
    historia.classList.add("opacity")
    navBar_pantalla2.classList.remove("hover_navBar")
    navBar_pantalla3.classList.remove("hover_navBar")
    navBar_pantalla4.classList.remove("hover_navBar")
    artistas.classList.add("displayNone")
    artistas.classList.add("opacity")
    instrumentos.classList.add("displayNone")
    instrumentosBarra.classList.add("displayNone")
    pantallaInstrumentos = false
})

navBar_pantalla2.addEventListener("click", () => {
home.classList.add("displayNone")
home.classList.add("opacity")
home.classList.remove("aparecer")
historia.classList.remove("displayNone")
historia.classList.remove("opacity")
navBar_pantalla2.classList.add("hover_navBar")
navBar_pantalla3.classList.remove("hover_navBar")
navBar_pantalla4.classList.remove("hover_navBar")
    artistas.classList.add("displayNone")
    artistas.classList.add("opacity")
    instrumentos.classList.add("displayNone")
    instrumentosBarra.classList.add("displayNone")
    pantallaInstrumentos = false
})





card1.addEventListener("mouseover", () => {
    bajo.classList.remove("opacity")
})
card1.addEventListener("mouseout", () => {
    bajo.classList.add("opacity")
})

card2.addEventListener("mouseover", () => {
    guitarra.classList.remove("opacity")
})      
card2.addEventListener("mouseout", () => {
    guitarra.classList.add("opacity")
})




// Funciones reutilizables que reciben el carrusel como parámetro
function avanzarCarrusel(c) {
    if (c.posicionActual < limiteMax) {
        c.posicionActual = Math.min(c.posicionActual + paso, limiteMax);
        c.contenedor.style.transform = `translateX(-${c.posicionActual}vw)`;
    }
    if (c.posicionActual >= paso) {
        c.btnRetroceder.classList.add("aparecer");
        c.botonRetroceso = true;
    }
    if (c.posicionActual >= limiteMax) {
        c.btnAvanzar.classList.add("opacity");
    }
}

function retrocederCarrusel(c) {
    if (c.botonRetroceso && c.posicionActual > 0) {
        c.posicionActual = Math.max(c.posicionActual - paso, 0);
        c.contenedor.style.transform = `translateX(-${c.posicionActual}vw)`;

        if (c.posicionActual === 0) {
            c.btnRetroceder.classList.remove("aparecer");
            c.botonRetroceso = false;
        }
        if (c.posicionActual < limiteMax) {
            c.btnAvanzar.classList.remove("opacity");
        }
    }
}

// Listeners: uno por cada carrusel encontrado (barra, detalle y home)
carrusels.forEach((c) => {
    c.btnAvanzar.addEventListener("click", () => avanzarCarrusel(c));
    c.btnRetroceder.addEventListener("click", () => retrocederCarrusel(c));
});


// Función reutilizable que centraliza toda la lógica de cambio
function mostrarSlide(numero) {
    // Cancelar cualquier timer anterior antes de iniciar uno nuevo
    if (timerActual) {
        clearTimeout(timerActual)
        timerActual = null
    }

    // Resetear todos
    [inicio1, inicio2, inicio3].forEach(el => {
        el.classList.remove("aparecer")
        el.classList.add("opacity")
    });
    [punto1, punto2, punto3].forEach(el => {
        el.classList.remove("punto_seleccionado")
        el.classList.add("puntos_caracterisitcas")
    })

    // Activar el slide correspondiente
    const inicios = [inicio1, inicio2, inicio3]
    const puntos = [punto1, punto2, punto3]

    inicios[numero - 1].classList.add("aparecer")
    inicios[numero - 1].classList.remove("opacity")
    puntos[numero - 1].classList.add("punto_seleccionado")
    puntos[numero - 1].classList.remove("puntos_caracterisitcas")

    // Actualizar variables de estado globales
    inicioActual1 = numero === 1
    inicioActual2 = numero === 2
    inicioActual3 = numero === 3

    console.log("Slide actual:", numero)

    // Calcular el siguiente slide (1→2→3→1)
    const siguiente = (numero % 3) + 1

    // Programar el cambio automático después de 5 segundos
    timerActual = setTimeout(() => {
        mostrarSlide(siguiente)
    }, 5000)
}

// Listeners simplificados que llaman a la función central
punto1.addEventListener("click", () => mostrarSlide(1))
punto2.addEventListener("click", () => mostrarSlide(2))
punto3.addEventListener("click", () => mostrarSlide(3))

// Iniciar automáticamente en el slide 1
mostrarSlide(1)

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('aparecer'); 
      entrada.target.classList.remove('opacity');
    } else {
      entrada.target.classList.remove('aparecer');
      entrada.target.classList.add('opacity');
    }
  });
}, {
  threshold: 0.05
});

// Empezamos a observar cada uno
elementos.forEach((el) => observer.observe(el));
