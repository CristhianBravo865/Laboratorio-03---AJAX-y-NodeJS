window.onload = function () {
    const lista = document.getElementById("lista-regiones");
  
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data.json", true);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const datos = JSON.parse(xhr.responseText);
  
        datos.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item.region;
          lista.appendChild(li);
        });
      }
    };
  
    xhr.send();
  };
  