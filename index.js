const express = require('express');
const app = express();
app.use(express.json());

const TOKEN = 'mi_codigo_secreto_123';

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === TOKEN) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).send("Error de contraseña");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Bot encendido en el puerto', PORT);
});
