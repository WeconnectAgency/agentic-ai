import { register_function, get_function } from '../src/modules/toolRegistry.js';

describe('toolRegistry', () => {
  test('registers and retrieves functions', () => {
    const fn = () => 'ok';
    register_function('test', fn);
    const retrieved = get_function('test');
    expect(retrieved).toBe(fn);
  });
});
