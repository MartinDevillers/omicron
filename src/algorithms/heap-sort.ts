import Algorithm from './algorithm'
import {Complexities} from "../complexities"

export default class HeapSort extends Algorithm {

    name = "Heap Sort"
    timeComplexityBest = Complexities.linearithmic
    timeComplexityAverage = Complexities.linearithmic
    timeComplexityWorst = Complexities.linearithmic

    execute(array: number[]): void {
        this.buildHeap(array)
        for (let i = array.length - 1; i > 0; i--) {
            this.swap(array, 0, i)
            this.heapify(array, 0, i)
        }
    }

    buildHeap(array: number[]) {
        for (let i = Math.floor((array.length / 2)); i >= 0; i--) {
            this.incrementOpCounter()
            this.heapify(array, i, array.length)
        }
    }

    heapify(array: number[], i: number, length: number) {
        this.incrementOpCounter()
        let left = 2 * i + 1,
            right = 2 * i + 2,
            largest = i

        if (left < length && array[left] > array[largest]) {
            largest = left
        }

        if (right < length && array[right] > array[largest]) {
            largest = right
        }

        if (largest !== i) {
            this.swap(array, i, largest)
            this.heapify(array, largest, length)
        }
    }

    swap(array: number[], i: number, j: number): void {
        let tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
    }
}
