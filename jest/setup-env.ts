const isSorted = (array: number[]): boolean => {
  if (array.length <= 1) return true
  for (let i = 1; i < array.length; i++) if (array[i] < array[i - 1]) return false
  return true
}

expect.extend({
  toBeSorted(received) {
    const pass = isSorted(received)
    if (pass) {
      return {
        message: () => `expected ${received} not to be sorted`,
        pass: true,
      }
    }
    return {
      message: () => `expected ${received} to be sorted`,
      pass: false,
    }
  },
})
