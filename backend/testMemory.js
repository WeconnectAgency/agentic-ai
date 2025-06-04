// testMemory.js

require('dotenv').config();
const { getSessionMemory, updateSessionMemory } = require('./src/sessionMemory');

(async () => {
  const userId = 'test-user-001';

  console.log('🧪 Guardando memoria de prueba...');
  await updateSessionMemory(userId, {
    historialMensajes: ['Hola', 'Quiero reservar'],
    intenciones: ['reservar'],
    fechasConsultadas: ['2025-06-15'],
  });

  console.log('✅ Memoria guardada. Leyendo...');
  const data = await getSessionMemory(userId);

  console.log('🧾 Resultado desde MongoDB:');
  console.log(data);

  process.exit();
})();
