function PAIS(nombre, iva) {
    this.nombre = nombre;
    this.iva = iva;
  }

  const OPCION = document.getElementById("PAIS"); // Guardo el objeto del doom, paara mas practicidad.
  let paises = []; // Definir el array para los países a nivel global

  fetch('paises.json')
  .then(response => response.json())
  .then(data => {
    paises = data // Crear objetos PAIS
    paises.forEach(pais => {
      const NUEVAOPCION = document.createElement("option");
      NUEVAOPCION.text = pais.nombre;
      OPCION.add(NUEVAOPCION); // Cargar las opciones.
    });
  })
  .catch(error => console.error('Error cargando paises.json:', error));

  function filtrar(nombre) {
    let paisbuscado = nombre;
    let resultado = paises.filter((PAIS) => PAIS.nombre.includes(paisbuscado));

    if (resultado.length > 0) {
      return resultado[0].iva;
    } else {
      return null;
    }
  }

OPCION.onchange = function(){ //Cada vez que cambio del pais en el select, se me actualiza el IVA
    
let PAIS = document.getElementById("PAIS").value;
let IVA = document.getElementById("IVA");

IVA.value = filtrar(PAIS);

}


document.getElementById("CALCULAR").onclick = function(){

let PAIS = document.getElementById("PAIS").value;
let PRECIO = parseFloat(document.getElementById("PRECIO").value);
let IVA = filtrar(PAIS);
let FINAL = PRECIO + (PRECIO * filtrar(PAIS));
let IVA2 = (IVA * PRECIO);

document.getElementById("CALCULAR").onclick = Swal.fire("Pais seleccionado:" + PAIS + " " + "IVA:" + IVA + " " + "Precio del IVA:" + IVA2 + " " + "Precio final:" + FINAL)

localStorage.setItem("PAIS", PAIS);
localStorage.setItem("IVA", IVA);
localStorage.setItem("PRECIO", PRECIO);
localStorage.setItem("FINAL", FINAL);
};


