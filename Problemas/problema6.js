google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(cargarDatos);

function cargarDatos() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let datos = JSON.parse(xhr.responseText);
      datos = datos.filter(r => r.region.toLowerCase() !== 'lima' && r.region.toLowerCase() !== 'callao');
      const fechas = datos[0].confirmed.map(e => e.date);
      const tabla = [];
      const encabezados = ['Fecha', ...datos.map(r => r.region)];
      tabla.push(encabezados);

      for (let i = 0; i < fechas.length; i++) {
        const fila = [fechas[i]];
        datos.forEach(region => {
          fila.push(parseInt(region.confirmed[i].value));
        });
        tabla.push(fila);
      }

      const data = google.visualization.arrayToDataTable(tabla);

      const options = {
        title: 'Evolución de Casos Confirmados por Región (sin Lima ni El Callao)',
        curveType: 'function',
        legend: { position: 'right' },
        height: 600
      };

      const chart = new google.visualization.LineChart(document.getElementById('grafico'));
      chart.draw(data, options);
    }
  };

  xhr.send();
}
