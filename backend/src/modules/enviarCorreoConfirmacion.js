import nodemailer from 'nodemailer';
import { ALMA_CONFIG } from '../config/almaConfig.js';

export async function enviarCorreoConfirmacion({
  email,
  nombre = '',
  fecha = '',
  detallesLlegada = ''
}) {
  if (!email) {
    console.error('No se proporcionó un email para enviar la confirmación');
    return;
  }

  const plantilla =
    ALMA_CONFIG.PLANTILLA_CORREO_CONFIRMACION ||
    `Hola {{nombre}},\n\nTu reserva para {{fecha}} ha sido confirmada.\n{{detalles}}\n\n${ALMA_CONFIG.NOMBRE_AGENTE} te da la bienvenida a ${ALMA_CONFIG.NOMBRE_NEGOCIO}.`;

  const mensaje = plantilla
    .replace('{{nombre}}', nombre)
    .replace('{{fecha}}', fecha)
    .replace('{{detalles}}', detallesLlegada);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: ALMA_CONFIG.CORREO_ORIGEN || process.env.SMTP_USER,
      to: email,
      subject: `Confirmación de reserva - ${ALMA_CONFIG.NOMBRE_NEGOCIO}`,
      text: mensaje
    });
    console.log(`✉️  Correo de confirmación enviado a ${email}`);
  } catch (err) {
    console.error('Error enviando correo de confirmación:', err);
  }
}

export function bloquearFecha() {
  // Función pendiente de implementación
  console.log('bloquearFecha() aún no implementada');
}
