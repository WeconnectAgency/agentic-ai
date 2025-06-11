import { jest } from '@jest/globals';
import { procesarPagoStripe } from '../src/modules/procesarPagoStripe.js';

describe('procesarPagoStripe', () => {
  test('retorna objeto esperado y logea link', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const result = procesarPagoStripe({ fecha: '2024-01-01', personas: 2, monto: 100 });
    expect(result).toEqual({
      link: 'https://pay.stripe.com/test',
      mensaje: 'Pago pendiente',
      reservaId: 'reserva-demo'
    });
    expect(spy).toHaveBeenCalledWith('[💳 Pago] Link generado para reserva del 2024-01-01 → https://pay.stripe.com/test');
    spy.mockRestore();
  });
});
