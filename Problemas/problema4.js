google.charts.load('current', { packages: ['corechart'] });

google.charts.setOnLoadCallback(cargarDatos);

function cargarDatos() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const datos = JSON.parse(xhr.responseText);
      const arequipa = datos.find(r => r.region === "Arequipa");

      if (!arequipa) {
        alert("No se encontró info");
        return;
      }

      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Fecha');
      data.addColumn('number', 'Casos Confirmados');

      arequipa.confirmed.forEach(item => {
        data.addRow([item.date, parseInt(item.value)]);
      });

      const options = {
        title: 'Casos covid confirmados en Arequipa a lo largo del tiempo',
        curveType: 'function',
        legend: { position: 'bottom' }
      };

      const chart = new google.visualization.LineChart(document.getElementById('grafico'));
      chart.draw(data, options);
    }
  };

  xhr.send();
}
