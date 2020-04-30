import Algorithm from "./algorithm"
import { Complexities } from "../complexities"

export default class MergeSort extends Algorithm {
  name = "Merge Sort"
  timeComplexityBest = Complexities.linearithmic
  timeComplexityAverage = Complexities.linearithmic
  timeComplexityWorst = Complexities.linearithmic

  execute(array: number[]): void {
    this.mergeSort(array)
  }

  mergeSort(array: number[]): number[] {
    const len = array.length
    if (len < 2) {
      return array
    }

    const mid = Math.floor(len / 2)
    const left = this.slice(array, 0, mid)
    const right = this.slice(array, mid)

    return this.merge(this.mergeSort(left), this.mergeSort(right))
  }

  merge(left: number[], right: number[]): number[] {
    const leftLen = left.length
    const rightLen = right.length
    let l = 0
    let r = 0
    const result = []

    while (l < leftLen && r < rightLen) {
      if (left[l] < right[r]) {
        result.push(left[l++])
      } else {
        result.push(right[r++])
      }
      this.incrementOpCounter()
    }

    return result.concat(this.slice(left, l).concat(this.slice(right, r)))
  }

  slice(array: number[], start: number, end: number = array.length): number[] {
    const copy = []
    for (let i = start; i < end; i++) {
      this.incrementOpCounter()
      copy.push(array[i])
    }
    return copy
  }
}
