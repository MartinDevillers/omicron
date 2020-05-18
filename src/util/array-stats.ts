const compare = (x: number, y: number) => x - y

export const uniqueness = (array: number[]) => {
  const unique = new Set(array)
  return unique.size / array.length
}

export const sortedness = (array: number[]) => {
  const sorted = Array.from(array).sort(compare)
  let count = 0
  for (let i = 0; i < array.length; i++) if (array[i] === sorted[i]) count++
  return count / array.length
}

export const sequenceness = (array: number[]) => {
  let count = 0
  let previous = compare(array[0], array[1])
  for (let i = 1; i < array.length; i++) {
    const current = compare(array[i - 1], array[i])
    if (previous < 0 && current < 0) count++
    else if (previous > 0 && current > 0) count++
    else if (previous === 0 && current === 0) count++
    previous = current
  }
  return count / array.length
}
