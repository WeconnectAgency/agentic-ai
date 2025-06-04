const memory = new Map();

function getMemory(userId) {
  if (!memory.has(userId)) {
    memory.set(userId, []);
  }
  return memory.get(userId);
}

function updateMemory(userId, data) {
  const userMemory = getMemory(userId);
  userMemory.push(data);
}

module.exports = {
  memory,
  getMemory,
  updateMemory,
};
