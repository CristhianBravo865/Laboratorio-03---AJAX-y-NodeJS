const express = require('express');
const app = express();
const PORT = 3000;

// Para servir archivos estáticos como index.html
app.use(express.static(__dirname));

// Ruta para responder a AJAX
app.get('/mensaje', (req, res) => {
    res.json({ mensaje: '¡Hola desde el servidor con AJAX!' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
