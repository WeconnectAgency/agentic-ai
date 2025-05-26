import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;
        
        try {
            const response = await fetch('http://localhost:3000/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
            
            const data = await response.json();
            setMessages(prev => [
                ...prev,
                { text: input, isUser: true },
                { text: data.response, isUser: false }
            ]);
            setInput('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`message ${msg.isUser ? 'user' : 'bot'}`}
                    >
                        {msg.text}
                    </motion.div>
                ))}
            </div>
            <div className="input-area">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribe tu mensaje..."
                />
                <button onClick={handleSend}>Enviar</button>
            </div>
        </div>
    );
};

export default ChatBot;