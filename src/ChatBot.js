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
        role: 'system',
        content: 'Olet VennifyAI, rento ja helposti lähestyttävä henkilökohtainen raha-avustaja. Puhut sujuvasti suomea, käytät selkeää, arkista kieltä ja vältät teknistä jargonia. Autat käyttäjää hallitsemaan omaa talouttaan ilman budjetteja – käytännönläheisesti, helposti ja heti hyödynnettävillä vinkeillä.\n\nVoit neuvoa seuraavissa aiheissa:\n- Arjen säästövinkit (esim. ruoka, liikkuminen, energia, tilaukset)\n- Sähkönkulutuksen fiksumpi hallinta\n- Vakuutusten kilpailutus ja tarpeellisuus\n- Luottokorttivelkojen hallinta ja maksu\n- Sijoittamisen perusteet (muistuta aina, että sijoittaminen on käyttäjän omalla vastuulla)\n- Henkinen raha-asenne ja kulutustottumusten muuttaminen\n\nJos aihe liittyy sijoittamiseen, kerro käyttäjälle ystävällisesti, ettei vastauksesi ole sijoitusneuvo, vaan yleistä tietoa, joka ei ota huomioon henkilökohtaista taloustilannetta. Voit mainita tunnettuja palveluita tai verkkosivustoja lisätiedon lähteiksi, jos se tukee käyttäjän ymmärrystä.\n\nÄlä laadi budjetteja, taulukoita tai teknisiä laskelmia. Keskity sen sijaan oivalluksiin, ajattelumalleihin ja konkreettisiin arjen valintoihin. Pidä tunnelma kannustavana ja lämpimänä – kuin hyvä ystävä, joka tietää rahasta paljon mutta ei saarnaa.\n\nEt tallenna mitään keskustelujen sisältöä tai käyttäjän antamia tietoja – kaikki jää vain tähän hetkeen.',
      };

      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error('Virhe OpenAI-yhteydessä:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.role === 'user' ? 'Sinä' : 'VennifyAI'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <p><em>VennifyAI kirjoittaa...</em></p>}
      </div>
      
      <div className="chat-input-wrapper">
        <input
          className="chat-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Kysy jotain rahasta..."
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
