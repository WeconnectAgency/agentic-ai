import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  history: [mongoose.Schema.Types.Mixed]
});

const Session = mongoose.model('Session', sessionSchema);

export function initSessionMemory() {
  return Session.init();
}

export async function getSessionMemory(userId) {
  try {
    const session = await Session.findOne({ userId }).exec();
    return session ? session.history : [];
  } catch (err) {
    console.error('Error getting session memory:', err);
    return [];
  }
}

export async function updateSessionMemory(userId, history) {
  try {
    await Session.findOneAndUpdate(
      { userId },
      { userId, history: history.slice(-10) },
      { upsert: true }
    ).exec();
  } catch (err) {
    console.error('Error updating session memory:', err);
  }
}
