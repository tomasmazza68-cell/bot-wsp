const express = require('express');
const app = express();
app.use(express.json());

const TOKEN = 'mi_codigo_secreto_123';

// Esta es la puerta que ya abrimos
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === TOKEN) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).send("Error de contraseña");
  }
});

// Este es el NUEVO buzón para recibir mensajes
app.post('/webhook', (req, res) => {
  console.log("¡Llegó un mensaje de WhatsApp!");
  console.log(JSON.stringify(req.body, null, 2)); // Esto nos muestra el mensaje en la pantalla
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Bot encendido en el puerto', PORT);
});
