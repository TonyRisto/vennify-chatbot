import React from 'react';
import ChatBot from './ChatBot';
import './App.css';
import logo from './logo.svg'; // Vaihda omaan logoosi

function App() {
  return (
    <div className="vennify-app">
      <header className="vennify-header">
        <img src={logo} alt="Vennify logo" className="vennify-logo" />
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

export default App;