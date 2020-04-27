import Algorithm from './algorithm'
import {Complexities} from "../complexities"

export default class BubbleSort extends Algorithm {

    name = "Bubble Sort"
    timeComplexityBest = Complexities.linear
    timeComplexityAverage = Complexities.quadratic
    timeComplexityWorst = Complexities.quadratic

    execute(array:number[]): void {
        let len = array.length,
            swapped
        do {
            this.incrementOpCounter()
            swapped = false
            for (let i = 0; i < len; i++) {
                this.incrementOpCounter()
                if (array[i] > array[i + 1]) {
                    let tmp = array[i]
                    array[i] = array[i + 1]
                    array[i + 1] = tmp
                    swapped = true
                }
            }
        } while (swapped)
    }
}
