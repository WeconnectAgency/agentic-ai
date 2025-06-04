const axios = require('axios');

exports.verify = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.status(403).send('Verification failed');
  }
};

exports.handle = async (req, res) => {
  try {
    const entries = req.body.entry || [];
    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        const messages = change.value?.messages || [];
        for (const msg of messages) {
          const text = msg.text?.body;
          if (text) {
            await axios.post('http://localhost:3000/message', { message: text });
          }
        }
      }
    }
    res.sendStatus(200);
  } catch (err) {
    console.error('Error handling Meta webhook:', err.message);
    res.status(500).send('Error');
  }
};
