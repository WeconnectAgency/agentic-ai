// frontend/src/components/ChatBot.jsx
import { useState } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch("http://localhost:3000/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { text: input, isUser: true },
        { text: data.response, isUser: false },
      ]);

      setInput("");
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.isUser ? "flex-end" : "flex-start",
              backgroundColor: msg.isUser ? "#DCF8C6" : "#EEE",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>
          Enviar
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#fff",
    height: "80vh",
    justifyContent: "space-between",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
  },
  inputContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ChatBot;
