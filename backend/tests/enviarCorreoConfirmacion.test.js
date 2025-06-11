import { jest } from '@jest/globals';
import nodemailer from 'nodemailer';
import { enviarCorreoConfirmacion } from '../src/modules/enviarCorreoConfirmacion.js';

describe('enviarCorreoConfirmacion', () => {
  test('envia correo utilizando nodemailer', async () => {
    const sendMail = jest.fn().mockResolvedValue(true);
    nodemailer.createTransport = jest.fn(() => ({ sendMail }));

    await enviarCorreoConfirmacion({
      email: 'test@example.com',
      nombre: 'Juan',
      fecha: '2024-08-01',
      detallesLlegada: 'Llegada 3pm'
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
