const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static(__dirname)); // para servir tus archivos HTML
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/demo_get.asp', (req, res) => {
  res.send('Hola desde demo_get.asp');
});

app.post('/demo_post.asp', (req, res) => {
  res.send('POST simple recibido correctamente');
});

app.post('/ajax_test.asp', (req, res) => {
  const { fname, lname } = req.body;
  res.send(`Hola ${fname} ${lname} (POST con datos recibido)`);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
