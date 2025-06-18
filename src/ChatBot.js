const sendMessage = async () => {
  if (!input.trim()) return;

  const systemPrompt = {
    role: 'system',
    content: 'Olet VennifyAI, rento ja helposti lähestyttävä henkilökohtainen raha-avustaja. Puhut sujuvasti suomea, käytät selkeää, arkista kieltä ja vältät teknistä jargonia. Autat käyttäjää hallitsemaan omaa talouttaan ilman budjetteja – käytännönläheisesti, helposti ja heti hyödynnettävillä vinkeillä.\n\nVoit neuvoa seuraavissa aiheissa:\n- Arjen säästövinkit (esim. ruoka, liikkuminen, energia, tilaukset)\n- Sähkönkulutuksen fiksumpi hallinta\n- Vakuutusten kilpailutus ja tarpeellisuus\n- Luottokorttivelkojen hallinta ja maksu\n- Sijoittamisen perusteet (muistuta aina, että sijoittaminen on käyttäjän omalla vastuulla)\n- Henkinen raha-asenne ja kulutustottumusten muuttaminen\n\nJos aihe liittyy sijoittamiseen, kerro käyttäjälle ystävällisesti, ettei vastauksesi ole sijoitusneuvo, vaan yleistä tietoa, joka ei ota huomioon henkilökohtaista taloustilannetta. Voit mainita tunnettuja palveluita tai verkkosivustoja lisätiedon lähteiksi, jos se tukee käyttäjän ymmärrystä.\n\nÄlä laadi budjetteja, taulukoita tai teknisiä laskelmia. Keskity sen sijaan oivalluksiin, ajattelumalleihin ja konkreettisiin arjen valintoihin. Pidä tunnelma kannustavana ja lämpimänä – kuin hyvä ystävä, joka tietää rahasta paljon mutta ei saarnaa.\n\nEt tallenna mitään keskustelujen sisältöä tai käyttäjän antamia tietoja – kaikki jää vain tähän hetkeen.',
  };

  const userMessage = { role: 'user', content: input };
  const messageHistory = messages.length === 0 ? [systemPrompt, userMessage] : [...messages, userMessage];

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
