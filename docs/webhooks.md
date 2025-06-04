# Webhooks de Mensajería

Este proyecto recibe eventos desde distintas plataformas de mensajería y reenvía los textos al endpoint interno `/message`.

## Twilio

1. Instala la librería oficial:
   ```bash
   npm install twilio axios
   ```
2. Configura en el [panel de Twilio](https://www.twilio.com/) la URL de webhook para mensajes entrantes. Ejemplo:
   `https://tu-servidor.com/webhook/twilio`
3. La ruta `/webhook/twilio` procesa el cuerpo `application/x-www-form-urlencoded` que envía Twilio y reenvía el texto al endpoint interno.
4. Se responde con un TwiML vacío para confirmar la recepción.

## Meta (WhatsApp Cloud API)

1. Crea una app en [Meta for Developers](https://developers.facebook.com/).
2. En la sección de Webhooks suscribe el evento de mensajes y define la URL:
   `https://tu-servidor.com/webhook/meta`
3. La verificación inicial requiere que el parámetro `hub.verify_token` coincida con la variable `META_VERIFY_TOKEN` del entorno.
4. Los mensajes recibidos se leen del objeto `entry[*].changes[*].value.messages` y cada texto se reenvía a `/message`.

Ambos webhooks pueden probarse localmente usando herramientas como `ngrok` para exponer el puerto 3000.
