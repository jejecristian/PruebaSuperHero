//********************************************************************************************************
// Script implementado en jQuery
//********************************************************************************************************

$('#seccionBusqueda').show(); // Muestra la seccion que permite buscar un SuperHero
$('#seccionEncontrado').hide(); // Oculta la seccion donde se mostrará el perfil del SuperHero
$('#idSuperHero').val(''); // Restablece a vacio el cuadro de busqueda

// Funcion que permite consumir Api y cargar datos
let consumirApi = (idSuperHeroe) => {
  $.ajax({
    type: "GET",
    url: "https://superheroapi.com/api.php/10158454625280878/" + idSuperHeroe,
    dataType: "json",
    success: function (data) {

      //*****************************************************************************
      // DATOS PARA CARD
      //*****************************************************************************
      // imagen
      $('#imgProfile').attr("src", data.image.url);
      // nombre
      $('#nombre').text('Nombre: ' + data.name);
      // conexiones
      let propiedad = 1;
      for (const groupAffiliation in data.connections) {
        if (propiedad == 1) {
          $('#conexiones').text('Conexiones: ' + data.connections[groupAffiliation]);
        }
        propiedad++;
      };
      // publicado por
      $('#publicadoPor').text('Publicado por: ' + data.biography.publisher);
      // ocupacion
      $('#ocupacion').text('Ocupación: ' + data.work.occupation);
      // primera aparicion
      propiedad = 1;
      for (const firstAppareance in data.biography) {
        if (propiedad == 5) {
          $('#primeraAparicion').text('Primera Aparición: ' + data.biography[firstAppareance]);
        }
        propiedad++;
      };
      // altura
      $('#altura').text('Altura: ' + data.appearance.height);
      // peso
      $('#peso').text('Peso: ' + data.appearance.weight);
      // alianzas
      $('#alianza').text('Alianzas: ' + data.biography.aliases);


      //*****************************************************************************
      // DATOS PARA CHART
      //*****************************************************************************
      // Obtiene datos de estadisticas de poder del personaje
      let sumPower = 0;
      let powerStats = Object.entries(data.powerstats).map(([label, y]) => {
        if (y === 'null') {
          y = 0;
        }
        sumPower += parseInt(y);
        return { y, label };
      });
      // Valida personaje sin ninguna estadistica de poder, ej: id 51
      if (sumPower === 0) {
        powerStats = [{ y: 0.1, label: 'None' }]
      };

      //*****************************************************************************
      // CARGA CHART
      //*****************************************************************************
      // Se genera grafico de torta con estadisticas de poder del personaje
      var chart = new CanvasJS.Chart("chartContainer", {
        theme: "dark2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: false,
        animationEnabled: true,
        title: {
          text: "Estadísticas de Poder para " + data.name
        },
        data: [{
          type: "pie",
          startAngle: 45,
          toolTipContent: "<b>{label}</b>: {y}",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          yValueFormatString: "0",
          indexLabel: "{label} {y}",
          dataPoints: powerStats
        }]
      });
      chart.render();
      
      $('#seccionBusqueda').hide(); // Oculta seccion de busqueda
      $('#seccionEncontrado').show(); // Presenta perfil y estadisticas del personaje
    },
    error: function (data) {
      alert("Error: se ha producido un error al intentar consumir la API.\nSe imprime detalle en la consola...");
      console.log("Error generado:");
      console.log(data.error);
    },
    async: true
  });
  return this;
};

// Identifica y escucha comportamiento del link Buscar del menú
let linkBuscarSH = $('#linkBuscarSuperHero');
linkBuscarSH.click(function () {
  $('#seccionBusqueda').show(); // Muestra la seccion que permite buscar un SuperHero
  $('#seccionEncontrado').hide(); // Oculta la seccion donde se mostrará el perfil del SuperHero
  $('#idSuperHero').val(''); // Restablece a vacio el cuadro de busqueda 
  $('#btnHamburguesa').click(); // Presiona el boton hamburguesa para esconder el menu
});

