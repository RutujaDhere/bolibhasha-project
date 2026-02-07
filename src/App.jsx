import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation.jsx';
import DialectConverter from './components/DialectConverter.jsx';
import SpeechConverter from './components/SpeechConverter.jsx';
import Header from './components/Header.jsx';

function App() {
  const [activeComponent, setActiveComponent] = useState('text-to-text');

  return (
    <div className="App">
      <header className="App-header">
        <Navigation activeComponent={activeComponent} setActiveComponent={setActiveComponent} />

        <Header />
        
        <div className="component-container">
          {activeComponent === 'text-to-text' && <DialectConverter />}
          {activeComponent === 'speech-converter' && <SpeechConverter />}
        </div>
      </header>
    </div>
  );
}

export default App;
