import React from 'react'
import useReactionTimer from './hooks/useReactionTimer'
import sans from './assets/sans.png'

// This is the simple UI for the game.
// It only shows the state and buttons.
export default function App() {
  const {
    status,
    lastReaction,
    average,
    best,
    reactionTimes,
    startGame,
    registerClick,
    reset,
  } = useReactionTimer()

// Jonathan added this buttonStyle object to make the buttons look better and more consistent.
  const buttonStyle = {
    fontFamily: 'comic sans ms',
    fontSize: '60px',
    padding: '80px 92px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',  
  }


// Jonathan made these edits below! Just changed the button colors and added some padding to the div. Also changed the font to comic 
// sans because geeeeeeeeeet dunked on!!!


  return (
    <div style={{ padding: 20, fontFamily: 'comic sans ms, cursive', textAlign: 'center'}}>
      <h1 style={{ fontFamily: 'comic sans ms, cursive' }}>ucla reaction speed test</h1>
      <p>State: <strong>{status}</strong></p>
      <div style={{ marginBottom: 20, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button
          style={{ ...buttonStyle, backgroundColor: '#4CAF50', color: 'white' }}
          onClick={startGame}
          disabled={status === 'waiting'}
        >
          start
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#f44336', color: 'white' }}
          onClick={registerClick}
        >
          click
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#ff9800', color: 'white' }}
          onClick={reset}
        >
          reset
        </button>
      </div>
      <div>
        <p>last reaction: {lastReaction != null ? `${Math.round(lastReaction)} ms` : '—'}</p>
        <p>average: {average != null ? `${Math.round(average)} ms` : '—'}</p>
        <p>best: {best != null ? `${Math.round(best)} ms` : '—'}</p>
        <p>all: {reactionTimes.length ? reactionTimes.map(t => `${Math.round(t)}ms`).join(', ') : '—'}</p>
      </div>
      {/* Jonathan added this image of sans to the bottom right corner of the screen. */}
      <img
        src={sans}
        alt="hey im senana. senana the skenana"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 250,
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
