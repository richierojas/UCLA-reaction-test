import React from 'react'
import useReactionTimer from './hooks/useReactionTimer'

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

  return (
    <div style={{ padding: 20 }}>
      <h1>Reaction Time Test</h1>

      <p>State: <strong>{status}</strong></p>

      <div style={{ marginBottom: 12 }}>
        <button onClick={startGame} disabled={status === 'waiting'}>Start</button>
        <button onClick={registerClick} style={{ marginLeft: 8 }}>Click</button>
        <button onClick={reset} style={{ marginLeft: 8 }}>Reset</button>
      </div>

      <div>
        <p>Last reaction: {lastReaction != null ? `${Math.round(lastReaction)} ms` : '—'}</p>
        <p>Average: {average != null ? `${Math.round(average)} ms` : '—'}</p>
        <p>Best: {best != null ? `${Math.round(best)} ms` : '—'}</p>
        <p>All: {reactionTimes.length ? reactionTimes.map(t => `${Math.round(t)}ms`).join(', ') : '—'}</p>
      </div>
    </div>
  )
}
