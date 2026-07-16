import React from 'react'
import useReactionGame from '../hooks/useReactionGame'

// Example UI connector for the `useReactionGame` hook.
// Keeps UI separate from the logic so frontend teammates can restyle
// or replace UI while reusing the same hook.
export default function ReactionGameUI() {
  const {
    status,
    start,
    userClick,
    restart,
    reactionTimes,
    lastReaction,
    average,
    best,
  } = useReactionGame()

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h2>Reaction Time Test (Logic Example)</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={start} disabled={status === 'waiting' || status === 'go'}>
          Start
        </button>
        <button onClick={restart} style={{ marginLeft: 8 }}>
          Restart
        </button>
      </div>

      <div
        onClick={userClick}
        role="button"
        tabIndex={0}
        style={{
          margin: '0 auto',
          width: 340,
          height: 160,
          background: status === 'go' ? '#4caf50' : status === 'waiting' ? '#f0ad4e' : '#ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          borderRadius: 8,
        }}
      >
        <strong>
          {status === 'idle' && 'Click Start'}
          {status === 'waiting' && 'Wait for it...'}
          {status === 'go' && 'GO! Click now!'}
          {status === 'too_soon' && 'Too soon — false start.'}
          {status === 'result' && lastReaction != null && `Result: ${Math.round(lastReaction)} ms`}
        </strong>
      </div>

      <div style={{ marginTop: 18 }}>
        <p>Average: {average ? `${Math.round(average)} ms` : '—'}</p>
        <p>Best: {best ? `${Math.round(best)} ms` : '—'}</p>
        <p>All: {reactionTimes.length ? reactionTimes.map(t => `${Math.round(t)}ms`).join(', ') : '—'}</p>
      </div>
    </div>
  )
}
