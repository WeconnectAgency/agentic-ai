import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

const sessionSchema = new mongoose.Schema({
  userId: String,
  memory: Object
});

const Session = mongoose.model('Session', sessionSchema);

export async function getSessionMemory(userId) {
  const session = await Session.findOne({ userId }).lean();
  return session ? session.memory : {};
}

export async function updateSessionMemory(userId, data) {
  await Session.updateOne({ userId }, { memory: data }, { upsert: true });
}
