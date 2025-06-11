import { jest } from "@jest/globals";
import { registrarInteraccion } from '../src/modules/registrarInteraccion.js';

describe('registrarInteraccion', () => {
  test('logea interaccion', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    registrarInteraccion('test', { hola: 'mundo' });
    expect(spy).toHaveBeenCalledWith('[🧠 Interacción] test → {"hola":"mundo"}');
    spy.mockRestore();
  });
});
