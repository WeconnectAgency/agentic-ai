import { consultarDisponibilidad } from '../src/modules/consultarDisponibilidad.js';

beforeAll(() => {
  process.env.GOOGLE_SHEET_ID = '';
  process.env.GOOGLE_CLIENT_EMAIL = '';
  process.env.GOOGLE_PRIVATE_KEY = '';
});

test('returns true when date is available', async () => {
  const result = await consultarDisponibilidad('2024-07-01');
  expect(result.disponible).toBe(true);
});

test('returns false when date is not available', async () => {
  const result = await consultarDisponibilidad('2024-07-02');
  expect(result.disponible).toBe(false);
});
