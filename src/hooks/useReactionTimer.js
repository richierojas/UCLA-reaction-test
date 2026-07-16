import { useState, useRef, useCallback, useEffect } from 'react'

// A custom hook for the reaction timer game.
// It handles the timer, the game state, and the score tracking.
export default function useReactionTimer() {
  // Possible states: idle, waiting, go, too soon, result
  const [status, setStatus] = useState('idle')

  // Stores all reaction times in milliseconds
  const [reactionTimes, setReactionTimes] = useState([])
  const [lastReaction, setLastReaction] = useState(null)

  // Keeps track of the timer and the time the round started
  const timerRef = useRef(null)
  const startTsRef = useRef(null)

  // Pick a random wait time between 2 and 5 seconds
  const getRandomDelay = (minMs = 2000, maxMs = 5000) =>
    Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs

  // Start a new round
  const startGame = useCallback(() => {
    // Ignore extra clicks if a round is already running
    if (status === 'waiting') return

    // Clear old timer just in case
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    setLastReaction(null)
    setStatus('waiting')

    const delay = getRandomDelay(2000, 5000)
    timerRef.current = setTimeout(() => {
      // Time to click
      startTsRef.current = Date.now()
      timerRef.current = null
      setStatus('go')
    }, delay)
  }, [status])

  // React when the user clicks
  const registerClick = useCallback(() => {
    if (status === 'waiting') {
      // They clicked too early
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      startTsRef.current = null
      setLastReaction(null)
      setStatus('too_soon')
      return
    }

    if (status === 'go') {
      const now = Date.now()
      const rt = Math.max(0, now - (startTsRef.current || now))
      setReactionTimes(prev => [...prev, rt])
      setLastReaction(rt)
      setStatus('result')
      startTsRef.current = null
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      return
    }

    // Do nothing for the other states
  }, [status])

  // Reset everything
  const reset = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    startTsRef.current = null
    setStatus('idle')
    setReactionTimes([])
    setLastReaction(null)
  }, [])

  // Clean up the timer when the component is removed
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Get simple stats from the saved times
  const average = reactionTimes.length
    ? reactionTimes.reduce((s, v) => s + v, 0) / reactionTimes.length
    : null
  const best = reactionTimes.length ? Math.min(...reactionTimes) : null

  return {
    status,
    reactionTimes,
    lastReaction,
    average,
    best,
    startGame,
    registerClick,
    reset,
  }
}
