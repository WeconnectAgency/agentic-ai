import { jest } from '@jest/globals';
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
});

