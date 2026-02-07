import React, { useState } from 'react';
import '../styles/SpeechConverter.css';

function SpeechConverter() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSpeak = () => {
    if (text.trim()) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const handleListen = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleStop = () => {
    speechSynthesis.cancel();
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="speech-converter-container">
      <h2>Speech Converter</h2>
      
      <div className="speech-input-section">
        <textarea
          className="speech-textarea"
          placeholder="Type text or click 'Listen' to record speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="speech-button-group">
        <button 
          className={`btn-listen ${isListening ? 'listening' : ''}`}
          onClick={handleListen}
          disabled={isListening}
        >
          {isListening ? 'Listening...' : '🎤 Listen'}
        </button>
        
        <button 
          className="btn-speak"
          onClick={handleSpeak}
        >
          🔊 Speak
        </button>
        
        <button 
          className="btn-stop"
          onClick={handleStop}
        >
          ⏹ Stop
        </button>
        
        <button 
          className="btn-clear"
          onClick={handleClear}
        >
          🗑 Clear
        </button>
      </div>
    </div>
  );
}

export default SpeechConverter;
