import Algorithm from "./algorithm"
import { Complexities } from "../complexities"

export default class InsertionSort extends Algorithm {
  name = "Insertion Sort"
  timeComplexityBest = Complexities.linear
  timeComplexityAverage = Complexities.quadratic
  timeComplexityWorst = Complexities.quadratic

  execute(array: number[]): void {
    const len = array.length
    for (let i = 1; i < len; i++) {
      const key = array[i]
      let j = i - 1
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j]
        j -= 1
        this.incrementOpCounter()
      }
      array[j + 1] = key
      this.incrementOpCounter()
    }
  }
}
