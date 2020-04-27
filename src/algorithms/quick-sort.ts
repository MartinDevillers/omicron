import Algorithm from './algorithm'
import {Complexities} from "../complexities"

export default class QuickSort extends Algorithm {

    name = "Quick Sort"
    timeComplexityBest = Complexities.linearithmic
    timeComplexityAverage = Complexities.linearithmic
    timeComplexityWorst = Complexities.quadratic

    execute(array:number[]): void {
        this.quickSort(array)
    }

    swap(array: number[], i: number, j: number): void {
        let tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
    }

    partition(array: number[], left: number, right: number): number {
        let q = left,
            i
        for (i = left; i < right; i++) {
            if (array[i] < array[right]) {
                this.swap(array, i, q)
                q++
            }
            this.incrementOpCounter()
        }
        this.swap(array, i, q)
        return q
    }

    quickSort(array: number[], left: number = 0, right: number = array.length - 1): number[] {
        this.incrementOpCounter()
        if (left < right) {
            let pivot = this.partition(array, left, right)
            this.quickSort(array, left, pivot - 1)
            this.quickSort(array, pivot + 1, right)
        }
        return array
    }
}