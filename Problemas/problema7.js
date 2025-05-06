google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(() => {
    const select = document.getElementById('regiones');
    const choices = new Choices(select, {
        removeItemButton: true,
        maxItemCount: 25,
        searchResultLimit: 10,
        renderChoiceLimit: 25
    });

    const boton = document.getElementById("generar");

    boton.addEventListener("click", function () {
        const opciones = select.options;
        const seleccionadas = [];

        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].selected) {
                const region = opciones[i].getAttribute("data-region");
                if (region) {
                    seleccionadas.push(region);
                }
            }
        }

        if (seleccionadas.length === 0) {
            alert("Debe seleccionar al menos una región.");
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "data.json", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const datos = JSON.parse(xhr.responseText);

                const fechas = [];
                const regionesSeleccionadas = [];

                seleccionadas.forEach(regionNombre => {
                    const region = datos.find(r => r.region === regionNombre);
                    if (region) {
                        if (fechas.length === 0) {
                            region.confirmed.forEach(item => fechas.push(item.date));
                        }
                        regionesSeleccionadas.push({
                            nombre: region.region,
                            valores: region.confirmed.map(item => parseInt(item.value))
                        });
                    }
                });

                if (regionesSeleccionadas.length === 0) {
                    alert("No se encontraron datos para las regiones seleccionadas.");
                    return;
                }

                const tabla = [];
                const encabezados = ['Fecha', ...regionesSeleccionadas.map(r => r.nombre)];
                tabla.push(encabezados);

                for (let i = 0; i < fechas.length; i++) {
                    const fila = [fechas[i]];
                    regionesSeleccionadas.forEach(region => {
                        fila.push(region.valores[i]);
                    });
                    tabla.push(fila);
                }

                const data = google.visualization.arrayToDataTable(tabla);

                const options = {
                    title: 'Comparación de Casos Confirmados',
                    curveType: 'function',
                    legend: { position: 'right' },
                    height: 600
                };

                const chart = new google.visualization.LineChart(document.getElementById('grafico'));
                chart.draw(data, options);
            }
        };

        xhr.send();
    });
});
