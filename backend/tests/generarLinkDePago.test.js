import { generarLinkDePago } from '../src/modules/reserva.js';

describe('generarLinkDePago', () => {
  test('returns URL with reservation id', () => {
    const url = generarLinkDePago('https://pago.com/checkout', 'abc123');
    expect(url).toBe('https://pago.com/checkout?id=abc123');
  });

  test('works without id', () => {
    const url = generarLinkDePago('https://pago.com/checkout');
    expect(url).toBe('https://pago.com/checkout');
  });
});
