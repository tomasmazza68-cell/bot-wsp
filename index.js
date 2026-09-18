const express = require('express');
const app = express();
app.use(express.json());

// 1. TUS LLAVES
const TOKEN_WEBHOOK = 'mi_codigo_secreto_123';
const TOKEN_META = 'EAAdEYVIY3V8BShjoypSK2EDj7uAiG5ZAx0T7Mg7lh2s6xzF1ZBXti6ml8fPhqmfniASWLDdlZACq8uc1Fyy0c2pKhB2vqsSlzflJcFXYP6JZBlqitnZAEioOPqpwFupe2dRl7DNSZCdl68rBdqSLwZCxx2Wa47oDYe68eaZBILkYfiVh5ilCkmixkQ69dGdtjGxqEZBfT08kpogeZAZAxss4AVsm6bFVbAvCv0TILA5owBFwcbwJQC1yMCAWQbzaYYRnuZBZA1KeB4BHQ4vogv0plgvsQ'; 
const ID_NUMERO = '1329816126879163'; 

// 2. LA PUERTA (Para que Meta se conecte)
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === TOKEN_WEBHOOK) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).send("Error de contraseña");
  }
});

// 3. EL CEREBRO (Recibe el mensaje y responde)
app.post('/webhook', (req, res) => {
  const body = req.body;
  
  if (body.object === 'whatsapp_business_account') {
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    if (message) {
      const numeroCliente = message.from; 
      const textoRecibido = message.text?.body; 

      console.log(`Recibimos: "${textoRecibido}" del número ${numeroCliente}`);

      enviarMensaje(numeroCliente, "¡Hola! Soy tu primer bot. Todavía estoy aprendiendo, pero ya sé responder de forma automática. 🤖");
    }
  }
  res.sendStatus(200); 
});

// 4. LA BOCA (La función que manda el mensaje a WhatsApp)
function enviarMensaje(numero, texto) {
  const data = {
    messaging_product: "whatsapp",
    to: numero,
    text: { body: texto }
  };

  fetch(`https://graph.facebook.com/v20.0/${ID_NUMERO}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN_META}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => console.log("¡Mensaje de respuesta enviado!"))
  .catch(err => console.log("Error enviando:", err));
}

// Encender el bot
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Bot encendido y listo para hablar en el puerto', PORT);
});
