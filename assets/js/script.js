//************************************************************************
// Script implementado en JavaScript
//************************************************************************

// Valida el valor ingresado en el cuadro de busqueda
let validarBusqueda = () => {
    let idSuperHeroe = document.getElementById('idSuperHero').value
    idSuperHeroe = parseInt(idSuperHeroe)
    if (idSuperHeroe >= 1 && idSuperHeroe <= 731) {
        consumirApi(idSuperHeroe)
    }else {
      alert("El valor ingresado no es válido.");
    }
}

// Identifica y escucha comportamiento del boton Buscar
let botonBuscar =  document.getElementById('buscar')
botonBuscar.addEventListener('click', validarBusqueda)

// let num = 1;
// const getPokemon = async () => {
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
//   const { name } = await response.json();
//   console.log(name);
//   num < 10 ? num++ : clearInterval(intervalo);
// };
// //const intervalo = setInterval(getPokemon, 2000);