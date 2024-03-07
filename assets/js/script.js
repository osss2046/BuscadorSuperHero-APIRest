window.onload = function () {
    $(document).ready(function(){
        let numero;

        $('#boton').click(function(){
            numero = $('#Superheroes').val();
            if (isNaN(numero) || numero < 1 || numero > 731) {
                ocultarDetalleTecnico();
                $('#resultado').text('Ingrese un número válido entre 1 y 731');
                return; // Detener la ejecución del código si el número no es válido
            }else{
                mostrarDetalleTecnico();
                $('#resultado').text('');}
            $.ajax({
                type: "GET",
                url: "https://www.superheroapi.com/api.php/2187099688299187/" + numero,
                dataType: "json",
                success: function(datos) {
                    let datosApi = datos;
                    console.log(`aprobado y el url es: ${numero}`)
                    console.log("Success valor de datosApi obtenidos: ", datosApi)
                    
                    console.log("El nombre es:" + datosApi.name);

                    // Crea y muestra el gráfico después de recibir los datos del servidor
                    let areaGrafico;
                    let options4 = {
                        title: {text: "Estadistica de poder para " + datos.name,},
                        axisX:{title : "Frutas Tropicales", titleFontSize: 12},
                        axisY:{title : "Consumo Kg/persona/año", titleFontSize: 12},
                        data: [
                            {
                                type: "pie",
                                showInLegend: true, // Mostrar la leyenda
                                legendText: "{label}", // Texto de la leyenda basado en la etiqueta
                                indexLabel: "{label} ({y})",
                                dataPoints: [
                                    { label: "Inteligencia", y: datos.powerstats.intelligence},
                                    { label: "strength", y: datos.powerstats.strength},
                                    { label: "speed", y: datos.powerstats.speed},
                                    { label: "durability", y: datos.powerstats.durability},
                                    { label: "power", y: datos.powerstats.power},
                                    { label: "combat", y: datos.powerstats.combat},
                                ],
                            },
                        ],
                    };



                    // Suponiendo que ya tienes los datos almacenados en la variable "datos"
                    let detalle = $('#detalleTecnico');
                    // Asignar la imagen del superhéroe
                    detalle.find('img').attr('src', datos.image.url).attr('alt', 'imagen de superhéroe');
                    // Asignar el nombre del superhéroe
                    detalle.find('#nombre').html('<strong>Nombre: </strong>' + datos.name);
                    // Asignar la conexión del superhéroe
                    detalle.find('#conexion').html('<strong>Conexión: </strong>' + datos.connections['group-affiliation'] );
                    // Asignar la biografía publicada del superhéroe
                    detalle.find('#biografiaPublicado').html('<strong>Publicada por:</strong> ' + datos.biography.publisher +'<hr>');
                    detalle.find('#trabajoOcupacion').html('<strong>Ocupación:</strong> ' + datos.work.occupation +'<hr>');
                    detalle.find('#biografiaPrimeraAparacion').html('<strong>Primera Aparición:</strong> ' + datos.biography['first-appearance'] +'<hr>');
                    detalle.find('#aparienciaAltura').html('<strong>Altura:</strong> ' + datos.appearance.height[0]+' - '+datos.appearance.height[1] +'<hr>');
                    detalle.find('#aparienciaPeso').html('<strong>Peso:</strong> ' + datos.appearance.weight[0]+' - '+datos.appearance.weight[1] +'<hr>');
                    detalle.find('#biografiaAlias').html('<strong>Alias:</strong> ' + datos.biography.aliases.join(', '));
                    






                    areaGrafico = $("#chartContainer");

                    // Verificar si todos los atributos necesarios para el gráfico tienen un valor mayor que cero
                    if (datos.powerstats.intelligence > 0 && datos.powerstats.strength > 0 && datos.powerstats.speed > 0 &&
                        datos.powerstats.durability > 0 && datos.powerstats.power > 0 && datos.powerstats.combat > 0) {
                        areaGrafico.CanvasJSChart(options4);
                    } else {
                        areaGrafico.html('Gráfico no disponible para este superheroe');
                    }
                    
                },
                error: function(error) {
                    console.log("Error Status: ", error.status)
                }
            });
        });
        function ocultarDetalleTecnico() {
            $('#detalleTecnico').hide();
            $('#chartContainer').hide();
        }
        
        // Función para mostrar el detalle técnico y el gráfico
        function mostrarDetalleTecnico() {
            $('#detalleTecnico').show();
            $('#chartContainer').show();
        }
    });
}
