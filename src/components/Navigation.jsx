import React, { useState } from 'react';
import '../styles/Navigation.css';

function Navigation({ activeComponent, setActiveComponent }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const selectOption = (component) => {
    setActiveComponent(component);
    setMenuOpen(false);
  };

  return (
    <div className="navigation-container">
      <button className="hamburger-btn" onClick={toggleMenu}>
        <span className={menuOpen ? 'open' : ''}></span>
        <span className={menuOpen ? 'open' : ''}></span>
        <span className={menuOpen ? 'open' : ''}></span>
      </button>
      
      {menuOpen && (
        <nav className="menu-dropdown">
          <button 
            className={`menu-item ${activeComponent === 'text-to-text' ? 'active' : ''}`}
            onClick={() => selectOption('text-to-text')}
          >
            📝 Text to Text
          </button>
          <button 
            className={`menu-item ${activeComponent === 'speech-converter' ? 'active' : ''}`}
            onClick={() => selectOption('speech-converter')}
          >
            🎤 Speech Converter
          </button>
        </nav>
      )}
    </div>
  );
}

export default Navigation;
