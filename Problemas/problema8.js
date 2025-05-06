google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(dibujarGrafico);

function dibujarGrafico() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Filtrar regiones excluyendo Lima y Callao
            const regionesFiltradas = data.filter(r =>
                r.region !== 'Lima' && r.region !== 'Callao'
            );

            if (regionesFiltradas.length === 0) {
                console.error("No hay regiones válidas.");
                return;
            }

            // Tomar las fechas desde la primera región (asumimos que todas tienen las mismas)
            const fechas = regionesFiltradas[0].confirmed.map(c => c.date);

            const tabla = [['Fecha']];
            regionesFiltradas.forEach(r => tabla[0].push(r.region));

            for (let i = 0; i < fechas.length; i++) {
                const fila = [fechas[i]];
                regionesFiltradas.forEach(r => {
                    const valor = parseInt(r.confirmed[i].value) || 0;
                    fila.push(valor);
                });
                tabla.push(fila);
            }

            const dataTable = google.visualization.arrayToDataTable(tabla);

            const options = {
                title: 'Número de confirmados diarios por región (excepto Lima y Callao)',
                curveType: 'function',
                legend: { position: 'bottom' },
                height: 500
            };

            const chart = new google.visualization.LineChart(document.getElementById('grafico'));
            chart.draw(dataTable, options);
        })
        .catch(error => {
            console.error("Error al cargar o procesar data.json:", error);
        });
}
