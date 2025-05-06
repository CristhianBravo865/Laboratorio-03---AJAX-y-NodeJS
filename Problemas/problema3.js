window.onload = function () {
    const lista = document.getElementById("lista-10-regiones-mas-confirmados");
  
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data.json", true);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const datos = JSON.parse(xhr.responseText);
        const totales = datos.map(region => {
          const total = region.confirmed.reduce((sum, item) => sum + parseInt(item.value), 0);
          return { nombre: region.region, total: total };
        });
  
        const diez_mayores = totales.sort((a, b) => b.total - a.total).slice(0, 10);
  
        diez_mayores.forEach(region => {
          const li = document.createElement("li");
          li.textContent = `${region.nombre}: ${region.total}`;
          lista.appendChild(li);
        });
      }
    };
  
    xhr.send();
  };
  