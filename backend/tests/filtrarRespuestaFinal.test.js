import { filtrarRespuestaFinal } from '../src/modules/filtrarRespuestaFinal.js';

describe('filtrarRespuestaFinal', () => {
  test('replaces cabañas with domos', () => {
    const result = filtrarRespuestaFinal('Nuestras cabañas son hermosas');
    expect(result).toBe('Nuestras domos son hermosas');
  });

  test('removes repeated modismos', () => {
    const mensajes = [{ de: 'alma', texto: '¡Pura vida! Bienvenido' }];
    const result = filtrarRespuestaFinal('Claro, ¡Pura vida! te esperamos', mensajes);
    expect(result).toBe('Claro, te esperamos');
  });

  test('elimina sugerencias genéricas fuera de oferta', () => {
    const result = filtrarRespuestaFinal('Podemos organizar un tour de canopy y snorkel.');
    expect(result).toBe('Podemos organizar un tour de y .');
  });
});
