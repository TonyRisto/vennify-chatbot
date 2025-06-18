import React, { useState } from 'react';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
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
          messages: newMessages,
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message || {
  	role: 'assistant',
  	content: 'Valitettavasti OpenAI ei vastannut – palvelu voi olla hetkellisesti ylikuormittunut. Yritä hetken päästä uudelleen.',
};


      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error('Virhe OpenAI-yhteydessä:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ minHeight: '200px', border: '1px solid #ccc', padding: '1rem' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role === 'user' ? 'Sinä' : 'RahaRauno'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <p><em>RahaRauno kirjoittaa...</em></p>}
      </div>
      <input
        style={{ width: '80%', marginTop: '1rem' }}
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Kysy jotain rahasta..."
      />
      <button onClick={sendMessage} style={{ marginLeft: '1rem' }}>Lähetä</button>
    </div>
  );
};

export default ChatBot;
