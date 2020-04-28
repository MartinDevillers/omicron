import Algorithm from "./algorithm"
import { Complexities } from "../complexities"

export default class CountingSort extends Algorithm {
  name = "Counting Sort"
  timeComplexityBest = Complexities.bilinear
  timeComplexityAverage = Complexities.bilinear
  timeComplexityWorst = Complexities.bilinear

  execute(array: number[]): void {
    let min = Number.MAX_VALUE
    let max = Number.MIN_VALUE

    for (let i = 0; i < array.length; i++) {
      this.incrementOpCounter()
      min = Math.min(min, array[i])
      max = Math.max(max, array[i])
    }

    let i = min
    let j = 0
    const len = array.length
    const count = []

    for (i; i <= max; i++) {
      this.incrementOpCounter()
      count[i] = 0
    }

    for (i = 0; i < len; i++) {
      this.incrementOpCounter()
      count[array[i]] += 1
    }

    for (i = min; i <= max; i++) {
      this.incrementOpCounter()
      while (count[i] > 0) {
        this.incrementOpCounter()
        array[j] = i
        j++
        count[i]--
      }
    }
  }
}
