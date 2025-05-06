window.onload = function () {
    const lista = document.getElementById("lista-casos-confirmados");
  
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data.json", true);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const datos = JSON.parse(xhr.responseText);
  
        datos.forEach(region => {
          let total = 0;
          region.confirmed.forEach(item => {
            total += parseInt(item.value);
          });
  
          const li = document.createElement("li");
          li.textContent = `${region.region}: ${total}`;
          lista.appendChild(li);
        });
      }
    };
  
    xhr.send();
  };
  