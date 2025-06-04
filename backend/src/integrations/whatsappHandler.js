const ReActHandler = require('../ReActHandler');

/**
 * Handle incoming WhatsApp webhook events.
 * This is a placeholder implementation. Here you would verify the webhook
 * with the WhatsApp Business API and extract the message text.
 */
async function handleWhatsAppWebhook(req, res) {
  try {
    const userMessage = req.body?.message || '';
    const reply = await ReActHandler.processMessage(userMessage);

    // TODO: Send `reply` back to WhatsApp using their API

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Error handling WhatsApp webhook:', error);
    res.status(500).json({ error: 'failed' });
  }
}

module.exports = { handleWhatsAppWebhook };
