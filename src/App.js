import React from 'react';
import ChatBot from './ChatBot';
import './App.css';

function App() {
  return (
    <div className="vennify-app">
      <header className="vennify-header">
        <h1>Vennify – Ota taloutesi haltuun ilman budjettia</h1>
        <p>Kysy RahaRaunolta miten voit säästää arjessa – heti ja helposti.</p>
      </header>

      <main className="vennify-main">
        <div className="chatbot-container">
          <ChatBot />
        </div>
      </main>
      <footer className="vennify-footer">
        <small>🔒 Tietosi pysyvät vain sinulla | Powered by Vennify & OpenAI</small>
      </footer>
    </div>
  );
}
.chat-container {
  padding: 1rem;
  max-width: 600px;
  margin: auto;
  font-family: 'Satoshi', sans-serif;
}

.chat-window {
  min-height: 200px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.chat-message {
  margin-bottom: 0.75rem;
}

.chat-input-row {
  display: flex;
  align-items: center;
}

.chat-input {
  flex: 1;
  padding: 0.75rem;
  border-radius: 16px;
  border: 0.5px solid rgba(255, 255, 255);
  background-color: transparent;
  color: white;
  font-size: 16px;
}

.chat-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.chat-button {
  margin-left: 1rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.chat-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

export default App;
