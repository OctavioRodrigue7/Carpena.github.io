// ============================================================
// Vista de instrumento: ahora se arma dinámicamente a partir
// de los data-* que tiene cada card del carrusel, en vez de
// tener el título / texto / destacados / imágenes hardcodeados
// en el HTML de <main id="instrumentos">.
// ============================================================
let pantallaInstrumentos = false
// Referencias a los elementos de la vista de detalle del instrumento
const vistaInstrumento = {
    imgGrande: document.querySelector("#instrumentos .imgGrandeInstrumento"),
    img1: document.querySelector("#instrumentos .img1Instrumento"),
    img2: document.querySelector("#instrumentos .img2Instrumento"),
    titulo: document.querySelector("#instrumentos .caracteristicasContenedor h3"),
    textoDetalle: document.querySelector("#instrumentos .caracteristicasContenedor p"),
    listaDestacados: document.querySelector("#instrumentos .caracteristicasContenedor ul"),
}

// Lee del DOM (data-attributes) toda la info que necesita la vista
// de detalle a partir de la card que se clickeó.
// Si a una card le falta algún data-*, se usan valores por defecto
// tomados del propio contenido visible de la card (para no romper nada).
function obtenerDatosInstrumento(card) {
    const tituloCard = card.querySelector(".Titulo_card")
    const descripcionCard = card.querySelector(".Descripcion_cards")
    const imagenFrente = card.querySelector(".imagenGuitarra")
    const imagenAtras = card.querySelector(".imagenGuitarraAtras")

    return {
        titulo: card.dataset.detalleTitulo || tituloCard?.textContent.trim() || "",
        texto: card.dataset.detalleTexto || descripcionCard?.textContent.trim() || "",
        destacados: (card.dataset.destacados || "")
            .split("|")
            .map((item) => item.trim())
            .filter(Boolean),
        imgGrande: card.dataset.imgGrande || imagenFrente?.src || "",
        img1: imagenFrente?.src || "",
        img2: card.dataset.img2 || imagenAtras?.src || "",

        // Offsets verticales opcionales, en vh. Positivo = baja la imagen,
        // negativo = la sube. Si la card no define el data-*, queda en 0
        // (así no se "arrastra" el ajuste de una guitarra a la siguiente).
        imgGrandeOffset: card.dataset.imgGrandeOffset || 0,
        img1Offset: card.dataset.img1Offset || 0,
        img2Offset: card.dataset.img2Offset || 0,

        // Anchos opcionales, en vw. Si la card no define el data-*,
        // se resetea al ancho definido en el CSS (no queda pegado
        // el ancho de la guitarra anterior).
        imgGrandeWidth: card.dataset.imgGrandeWidth || "",
        img1Width: card.dataset.img1Width || "",
        img2Width: card.dataset.img2Width || "",
        
        // Márgenes horizontales opcionales, en vw. Si la card no define
        // el data-*, se resetea al margin-left definido en el CSS.
        imgGrandeMargin: card.dataset.imgGrandeMargin || "",
        img1Margin: card.dataset.img1Margin || "",
        img2Margin: card.dataset.img2Margin || "",
    }
}

// Aplica (o resetea) el desplazamiento vertical de una imagen del header
function aplicarOffsetVertical(elemento, valorEnVh) {
    if (!elemento) return
    const offset = parseFloat(valorEnVh) || 0
    elemento.style.transform = offset !== 0 ? `translateY(${offset}vh)` : ""
}

// Aplica (o resetea) el ancho de una imagen del header
function aplicarAncho(elemento, valorEnVw) {
    if (!elemento) return
    const ancho = parseFloat(valorEnVw)
    elemento.style.width = !isNaN(ancho) ? `${ancho}vw` : ""
}


// Aplica (o resetea) el margin-left de una imagen del header
function aplicarMargen(elemento, valorEnVw) {
    if (!elemento) return
    const margen = parseFloat(valorEnVw)
    elemento.style.marginLeft = !isNaN(margen) ? `${margen}vw` : ""
}

// Pinta la vista de detalle con los datos recibidos
function mostrarInstrumento(datos) {
    if (vistaInstrumento.titulo) vistaInstrumento.titulo.textContent = datos.titulo
    if (vistaInstrumento.textoDetalle) vistaInstrumento.textoDetalle.textContent = datos.texto

    if (vistaInstrumento.listaDestacados) {
        vistaInstrumento.listaDestacados.innerHTML = ""
        datos.destacados.forEach((item) => {
            const li = document.createElement("li")
            li.textContent = item
            vistaInstrumento.listaDestacados.appendChild(li)
        })
    }

    if (vistaInstrumento.imgGrande && datos.imgGrande) vistaInstrumento.imgGrande.src = datos.imgGrande
    if (vistaInstrumento.img1 && datos.img1) vistaInstrumento.img1.src = datos.img1
    if (vistaInstrumento.img2 && datos.img2) vistaInstrumento.img2.src = datos.img2

    aplicarOffsetVertical(vistaInstrumento.imgGrande, datos.imgGrandeOffset)
    aplicarOffsetVertical(vistaInstrumento.img1, datos.img1Offset)
    aplicarOffsetVertical(vistaInstrumento.img2, datos.img2Offset)

    aplicarAncho(vistaInstrumento.imgGrande, datos.imgGrandeWidth)
    aplicarAncho(vistaInstrumento.img1, datos.img1Width)
    aplicarAncho(vistaInstrumento.img2, datos.img2Width)

    aplicarMargen(vistaInstrumento.imgGrande, datos.imgGrandeMargin)
    aplicarMargen(vistaInstrumento.img1, datos.img1Margin)
    aplicarMargen(vistaInstrumento.img2, datos.img2Margin)
}

// Muestra la sección "instrumentos" y oculta "home"
function irAVistaInstrumento() {
    home.classList.add("displayNone")
    home.classList.add("opacity")
    home.classList.remove("aparecer")
    instrumentos.classList.remove("displayNone")
    window.scrollTo({top: 0});
    pantallaInstrumentos = true
    resetearScrollCaracteristicas()
}

// Detecta en qué card se clickeó, arma los datos y actualiza la vista.
// Se engancha al click de la card completa (no solo de la imagen),
// para poder seleccionarse desde cualquier punto de la card.
function activarSeleccionDeInstrumentos(selectorCards = ".cards_Carrusel") {
    const cards = document.querySelectorAll(selectorCards)

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const datos = obtenerDatosInstrumento(card)
            mostrarInstrumento(datos)
            irAVistaInstrumento()
            instrumentosBarra.classList.add("displayNone")
            navBar_pantalla4.classList.add("hover_navBar")
        })
    })

    return cards
}

const cardsInstrumentos = activarSeleccionDeInstrumentos(".cards_Carrusel")

// Estado inicial: al cargar la página, la vista de detalle arranca
// mostrando los datos de la primera card disponible (si existe),
// en vez de dejar el contenido hardcodeado del HTML.
if (cardsInstrumentos.length > 0) {
    mostrarInstrumento(obtenerDatosInstrumento(cardsInstrumentos[0]))
}

// ---- Lógica de scroll/desplazamiento del panel de características ----

const caracteristicasContenedor = document.querySelector(".caracteristicasContenedor")
const limite = 700
const velocidad = 30
let desplazamientoContenedor = 0

// Guarda la posición de scroll de la ventana para poder calcular hacia
// dónde se movió (arriba/abajo) sin importar si el usuario usó la rueda,
// el trackpad o arrastró directamente la barra de scroll del navegador.
let scrollAnteriorVentana = window.scrollY

// Vuelve el panel de características al inicio (top). Se llama cada vez
// que se entra a la vista de detalle de una card nueva, para que la
// vista previa de cada instrumento arranque siempre arriba.
function resetearScrollCaracteristicas() {
    desplazamientoContenedor = 0
    scrollAnteriorVentana = window.scrollY

    if (!caracteristicasContenedor) return
    caracteristicasContenedor.style.transition = "transform 0.05s ease-out"
    caracteristicasContenedor.style.transform = "translateY(0px)"
}

function contenidoCompletoVisible() {
    if (!caracteristicasContenedor) return false

    const rect = caracteristicasContenedor.getBoundingClientRect()
    return rect.top >= 0 && rect.bottom <= window.innerHeight
}

// Aplica un "paso" de desplazamiento en la dirección indicada por delta.
// delta > 0 significa que se bajó (rueda hacia abajo, o scrollbar arrastrada
// hacia abajo); delta < 0 significa que se subió.
function moverCaracteristicasContenedor(delta) {
    if (!caracteristicasContenedor || !pantallaInstrumentos || delta === 0) return

    if (delta > 0) {
        desplazamientoContenedor = Math.min(desplazamientoContenedor + velocidad, limite)
    } else {
        const puedeSubir = desplazamientoContenedor < limite || contenidoCompletoVisible()

        if (!puedeSubir) return

        desplazamientoContenedor = Math.max(desplazamientoContenedor - velocidad, 0)
    }

    caracteristicasContenedor.style.transition = "transform 0.05s ease-out"
    caracteristicasContenedor.style.transform = `translateY(${desplazamientoContenedor}px)`
}

// Un solo listener de "scroll" cubre los tres casos (rueda del mouse,
// trackpad y arrastre manual de la barra de scroll del navegador), porque
// los tres mueven window.scrollY. Comparando contra la posición anterior
// se obtiene la dirección para reutilizar la misma lógica de siempre.
window.addEventListener("scroll", () => {
    const scrollActual = window.scrollY
    const delta = scrollActual - scrollAnteriorVentana
    scrollAnteriorVentana = scrollActual

    moverCaracteristicasContenedor(delta)
}, { passive: true })
