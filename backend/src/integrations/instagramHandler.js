const ReActHandler = require('../ReActHandler');

/**
 * Handle incoming Instagram webhook events.
 * This placeholder assumes you have subscribed to Instagram webhook events
 * and have verified the request according to their API requirements.
 */
async function handleInstagramWebhook(req, res) {
  try {
    const userMessage = req.body?.message || '';
    const reply = await ReActHandler.processMessage(userMessage);

    // TODO: Send `reply` back to Instagram using their API

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Error handling Instagram webhook:', error);
    res.status(500).json({ error: 'failed' });
  }
}

module.exports = { handleInstagramWebhook };
