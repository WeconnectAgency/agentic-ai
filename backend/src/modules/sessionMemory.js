const sessions = new Map();

function getMemory(userId) {
  if (!sessions.has(userId)) {
    sessions.set(userId, []);
  }
  return sessions.get(userId);
}

function addExchange(userId, userMessage, assistantMessage) {
  const memory = getMemory(userId);
  memory.push({ role: 'user', content: userMessage });
  memory.push({ role: 'assistant', content: assistantMessage });
}

module.exports = { getMemory, addExchange };
