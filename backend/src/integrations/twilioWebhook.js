const axios = require('axios');
const twilio = require('twilio');

module.exports = async (req, res) => {
  const message = req.body.Body;

  if (!message) {
    return res.status(400).send('No message');
  }

  try {
    await axios.post('http://localhost:3000/message', { message });
    const twiml = new twilio.twiml.MessagingResponse();
    res.type('text/xml');
    res.send(twiml.toString());
  } catch (err) {
    console.error('Error forwarding Twilio message:', err.message);
    res.status(500).send('Error');
  }
};
