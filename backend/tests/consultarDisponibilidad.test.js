<<<<<<< HEAD
import { jest } from "@jest/globals";
import { consultarDisponibilidad } from '../src/modules/reserva.js';

describe('consultarDisponibilidad', () => {
  const mockData = {
    capacidad: 2,
    getReservas: jest.fn()
  };

  test('returns true when less reservations than capacity', async () => {
    mockData.getReservas.mockResolvedValueOnce(1);
    const result = await consultarDisponibilidad('2025-01-01', mockData);
    expect(result).toBe(true);
  });

  test('returns false when reservations meet capacity', async () => {
    mockData.getReservas.mockResolvedValueOnce(2);
    const result = await consultarDisponibilidad('2025-01-02', mockData);
    expect(result).toBe(false);
  });
=======
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
>>>>>>> main
});
