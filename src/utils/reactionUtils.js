// Utility helpers for the reaction-time game logic

// Returns an integer random delay between minMs and maxMs (inclusive)
export function getRandomDelay(minMs, maxMs) {
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
}

// Calculate average of numeric array (ms)
export function calculateAverage(arr) {
  if (!arr || arr.length === 0) return null
  const sum = arr.reduce((s, v) => s + v, 0)
  return sum / arr.length
}
