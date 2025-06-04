const sessionMemory = {};

export function getSessionMemory(sessionId) {
  if (!sessionMemory[sessionId]) {
    sessionMemory[sessionId] = [];
  }
  return sessionMemory[sessionId];
}

export function updateSessionMemory(sessionId, data) {
  const memory = getSessionMemory(sessionId);
  memory.push(data);
  if (memory.length > 50) {
    memory.shift();
  }
  return memory;
}
