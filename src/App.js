import React from 'react';
import './App.css';

import emojiList from './database/emojiList.json'

function App() {
  return (
    <div className="container">
      {emojiList.map(emoji => (
        <div className="emoji-container">
          <img src={emoji.link} alt={emoji.emoji} className="emoji-image"></img>
          <span className="emoji-traduzido">{emoji.traduzido}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
