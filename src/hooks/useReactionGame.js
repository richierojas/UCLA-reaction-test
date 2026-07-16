import { useState, useRef, useEffect, useCallback } from 'react'
import { getRandomDelay, calculateAverage } from '../utils/reactionUtils'

// A hook for the reaction game.
export default function useReactionGame() {
  const [status, setStatus] = useState('idle')
  const [reactionTimes, setReactionTimes] = useState([]) // ms values
  const [lastReaction, setLastReaction] = useState(null) // last single result in ms

  // Refs to hold timer and start time without causing re-renders
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)

  // Start the round: choose a random delay then set status to 'go'
  const start = useCallback(() => {
    // If already waiting, ignore duplicate start requests
    if (status === 'waiting') return

    // Clear any existing timers and reset transient values
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    startTimeRef.current = null
    setLastReaction(null)
    setStatus('waiting')

    const delay = getRandomDelay(2000, 5000) // 2s - 5s
    timerRef.current = setTimeout(() => {
      // When delay finishes, record start time and signal 'go'
      startTimeRef.current = performance.now()
      timerRef.current = null
      setStatus('go')
    }, delay)
  }, [status])

  // Called by UI when the user clicks/taps the main area
  const userClick = useCallback(() => {
    if (status === 'idle') return // nothing to do

    if (status === 'waiting') {
      // Clicked too early -> false start
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      startTimeRef.current = null
      setLastReaction(null)
      setStatus('too_soon')
      return
    }

    if (status === 'go') {
      // Valid reaction: compute ms since GO
      const now = performance.now()
      const rt = Math.max(0, now - (startTimeRef.current || now))
      setReactionTimes(prev => {
        const next = [...prev, rt]
        return next
      })
      setLastReaction(rt)
      setStatus('result')
      startTimeRef.current = null
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      return
    }

    // If status is 'too_soon' or 'result', additional clicks are ignored.
  }, [status])

  // Restart the whole game (clears results)
  const restart = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    startTimeRef.current = null
    setStatus('idle')
    setLastReaction(null)
    setReactionTimes([])
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Derived stats
  const average = reactionTimes.length ? calculateAverage(reactionTimes) : null
  const best = reactionTimes.length ? Math.min(...reactionTimes) : null

  return {
    status,
    reactionTimes,
    lastReaction,
    average,
    best,
    // actions for UI to call
    start,
    userClick,
    restart,
  }
}
