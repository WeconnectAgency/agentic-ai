import fs from 'fs/promises';
const MEMORY_DIR = './memory';

export async function getSessionMemory(userId) {
  try {
    const data = await fs.readFile(`${MEMORY_DIR}/${userId}.json`, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export async function updateSessionMemory(userId, history) {
  try {
    await fs.mkdir(MEMORY_DIR, { recursive: true });
    await fs.writeFile(
      `${MEMORY_DIR}/${userId}.json`,
      JSON.stringify(history.slice(-10), null, 2)
    );
  } catch (err) {
    console.error('Error updating session memory:', err);
  }
}
