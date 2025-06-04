const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.error('Mongo connection error:', err));

const sessionSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    historial: { type: [String], default: [] },
    intenciones: { type: [String], default: [] },
    fechas: { type: [Date], default: [] }
});

const Session = mongoose.model('SessionMemory', sessionSchema);

async function getSessionMemory(userId) {
    const session = await Session.findOne({ userId });
    return session ? session.historial : [];
}

async function updateSessionMemory(userId, nuevaInfo) {
    const { mensaje, intencion, fecha = new Date() } = nuevaInfo;
    await Session.findOneAndUpdate(
        { userId },
        { $push: { historial: mensaje, intenciones: intencion, fechas: fecha } },
        { upsert: true, new: true }
    );
}

module.exports = { getSessionMemory, updateSessionMemory };
