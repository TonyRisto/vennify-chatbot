import React from 'react';
import ChatBot from './ChatBot';
import './App.css';

function App() {
  return (
    <div className="vennify-app">
      <header className="vennify-header">
        <h1>Kysy vinkkejä arjen rahankäyttöön</h1>
        <p>Tämä VennifyAI auttaa sinua säästämään, hallitsemaan rahankäyttöäsi ja ymmärtämään mihin rahasi oikeasti menevät.</p>
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
