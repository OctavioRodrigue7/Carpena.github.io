let boton_artistas = document.getElementById("boton_artistas")


let masartistasimg1 = document.getElementById("masartistasimg1")
let masartistasimg2 = document.getElementById("masartistasimg2")
let masartistasimg3 = document.getElementById("masartistasimg3")

let imgActual1 = true
let imgActual2 = false
let imgActual3 = false

boton_artistas.addEventListener("click", () => {
    if (imgActual1 == true){
        masartistasimg2.classList.remove("opacity")
        masartistasimg1.classList.add("opacity")
        imgActual1 = false
        imgActual2 = true
        imgActual3 = false
    }else if (imgActual2 == true){
        masartistasimg3.classList.remove("opacity")
        masartistasimg2.classList.add("opacity")
        imgActual1 = false
        imgActual2 = false
        imgActual3 = true
    }else if (imgActual3 == true){
        masartistasimg1.classList.remove("opacity")
        masartistasimg3.classList.add("opacity")
        imgActual1 = true
        imgActual2 = false
        imgActual3 = false
    }
})