import { jest } from '@jest/globals';

let sessionResult;
const saveMock = jest.fn();

const SessionMock = {
  findOne: jest.fn(() => ({
    exec: () => Promise.resolve(sessionResult)
  }))
};

jest.unstable_mockModule('mongoose', () => ({
  default: {
    Schema: class {static Types = { Mixed: class {}}},
    model: jest.fn(() => SessionMock)
  }
}));

const { detectarDesaparicion } = await import('../src/modules/sessionMemory.js');

describe('detectarDesaparicion', () => {
  beforeEach(() => {
    saveMock.mockClear();
  });

  test('returns false when user is active', async () => {
    sessionResult = {
      ultimaRespuestaHora: new Date(Date.now() - 2 * 60000),
      desaparecido: false,
      save: saveMock
    };
    const result = await detectarDesaparicion('u1', 5);
    expect(result).toBe(false);
    expect(saveMock).not.toHaveBeenCalled();
  });

  test('returns true when user inactive', async () => {
    sessionResult = {
      ultimaRespuestaHora: new Date(Date.now() - 10 * 60000),
      desaparecido: false,
      save: saveMock
    };
    const result = await detectarDesaparicion('u1', 5);
    expect(result).toBe(true);
    expect(sessionResult.desaparecido).toBe(true);
    expect(saveMock).toHaveBeenCalled();
  });
});
