

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DialectConverter.css';

function DialectConverter() {
  const [inputText, setInputText] = useState("");
  const [dialect, setDialect] = useState("Varhadi");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/convert-dialect', {
        text: inputText,
        dialect: dialect
      });
      setResult(response.data.convertedText);
    } catch (error) {
      setResult("Error converting text");
    }
    setLoading(false);
  };

  return (
    <div className="dialect-converter-root">
      <div className="dialect-converter-panel">
        {/* Source Language (Standard Marathi) */}
        <div className="dialect-converter-column">
          <div className="dialect-converter-label">Standard Marathi</div>
          <textarea
            className="dialect-converter-textarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type to translate."
          />
        </div>

        {/* Arrow and Dialect Selection */}
        <div className="dialect-converter-center">
          <select
            className="dialect-converter-select"
            value={dialect}
            onChange={(e) => setDialect(e.target.value)}
          >
            <option value="Varhadi">Varhadi (Vidarbha)</option>
            <option value="Ahirani">Ahirani (Khandesh)</option>
            <option value="Malvani">Malvani (Konkan)</option>
          </select>
          <button
            className="dialect-converter-button"
            onClick={handleConvert}
            disabled={loading || !inputText.trim()}
          >
            {loading ? 'Converting...' : 'Convert'}
          </button>
        </div>

        {/* Target Language (Converted Dialect) */}
        <div className="dialect-converter-column">
          <div className="dialect-converter-label">{dialect} Dialect</div>
          <textarea
            className="dialect-converter-textarea readonly"
            value={result}
            readOnly
            placeholder="Translation will appear here."
          />
        </div>
      </div>
    </div>
  );
}

export default DialectConverter;