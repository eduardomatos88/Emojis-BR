import React, { useState } from 'react'
import ReactNotification, { store } from 'react-notifications-component'
import './App.css'
import 'react-notifications-component/dist/theme.css'

import emojiListBase from './database/emojiList.json'

function App() {
  const [emojiList, setEmojiList] = useState(emojiListBase)

  function searchEmoji(event) {
    const searchTerm = event.target.value.toLowerCase()
    if (searchTerm === '') {
      setEmojiList(emojiListBase)
    } else {
      var contador = 0
      const searchResult = emojiListBase.filter(emoji => {
        if (contador > 50) {
          return false
        }
        if (emoji.traduzido.toLowerCase().indexOf(searchTerm) !== -1) {
          contador++
          return true
        } else {
          return false
        }
      })
      contador = 0
      setEmojiList(searchResult)
    }
  }
  function copyEmojiToClipboard(emoji) {
    const emojiReady = ':' + emoji + ':'
    navigator.clipboard.writeText(emojiReady)
    store.addNotification({
      title: `Emoji "${emoji}" copiado`,
      message: 'Agora é colar e utilizar o seu emoji!',
      type: 'success',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    })
  }

  return (
    <>
      <ReactNotification />
      <div className="container">
        <h1 className="title">Git Emojis BR</h1>
        <h2 className="subtitle">Seu buscador de emoji em português</h2>
        <div className="emoji-search">
          <input
            onChange={searchEmoji}
            className="search"
            placeholder="Digite para buscar"
          />
        </div>
        <div className="emoji-list">
          {emojiList.map(emoji => (
            <div className="emoji-container"
              key={emoji.emoji}
              onClick={() => copyEmojiToClipboard(emoji.emoji)}
            >
              <img
                src={emoji.link}
                alt={emoji.emoji}
                className="emoji-image"
              ></img>
              <span
                className="emoji-traduzido"
              >
                {emoji.traduzido}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
