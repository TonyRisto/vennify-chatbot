import React, { useState } from 'react';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const systemPrompt = {
      role: 'system',
      content:
        'Olet VennifyAI – helposti lähestyttävä henkilökohtainen raha-avustaja. Puhu suomea, käytä arkikieltä. Vastaa lyhyesti, selkeästi ja käytännönläheisesti. Älä laadi budjetteja tai taulukoita. Anna vinkkejä säästämiseen, kulutuksen hallintaan, sijoittamisen alkeisiin (omalla vastuulla), ja henkiseen rahasuhteeseen. Korosta arjen oivalluksia.',
    };

    const userMessage = { role: 'user', content: input };
    const messageHistory = messages.length === 0
      ? [systemPrompt, userMessage]
      : [...messages, userMessage];

    setMessages(messageHistory);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo-1106',
          messages: messageHistory,
          max_tokens: 250,
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message || {
        role: 'assistant',
        content: 'Valitettavasti OpenAI ei vastannut. Yritä hetken päästä uudelleen.',
      };

      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error('Virhe OpenAI-yhteydessä:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickSuggestions = [
    "Miten säästän ruokakuluissa?",
    "Kannattaako ottaa luottokortti?",
    "Miten kilpailutan vakuutukset?",
    "Miten aloittaa sijoittaminen?",
  ];

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages
          .filter(msg => msg.role !== 'system')
          .map((msg, index) => (
            <div key={index} className="chat-message">
              <strong>{msg.role === 'user' ? 'Sinä' : 'VennifyAI'}:</strong> {msg.content}
            </div>
          ))}
        {loading && <p><em>VennifyAI kirjoittaa...</em></p>}
      </div>

      {messages.length === 0 && (
        <div className="chat-suggestions">
          {quickSuggestions.map((text, index) => (
            <button
              key={index}
              className="suggestion-button"
              onClick={() => {
                setInput(text);
              }}
            >
              {text}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input-wrapper">
        <input
          className="chat-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Kysy helposti rahasta – esim. vakuutuksista, kulutuksesta tai sijoittamisesta"
        />
        <button className="chat-send-icon" onClick={sendMessage}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="20" height="20">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
