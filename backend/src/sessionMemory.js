require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'agentic';
const collectionName = 'session_memory';

let client;

async function getCollection() {
  if (!client) {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
}

async function getSessionMemory(userId) {
  const col = await getCollection();
  const doc = await col.findOne({ userId });
  return doc ? doc.data : null;
}

async function updateSessionMemory(userId, data) {
  const col = await getCollection();
  await col.updateOne(
    { userId },
    { $set: { data } },
    { upsert: true }
  );
}

module.exports = {
  getSessionMemory,
  updateSessionMemory,
};
