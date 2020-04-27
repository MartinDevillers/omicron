import Algorithm from './algorithm'
import {Complexities} from "../complexities"

export default class SelectionSort extends Algorithm {

    name = "Selection Sort"
    timeComplexityBest = Complexities.quadratic
    timeComplexityAverage = Complexities.quadratic
    timeComplexityWorst = Complexities.quadratic

    execute(array: number[]): void {
        let len = array.length
        for (let i = 0; i < len; i++) {
            this.incrementOpCounter()
            let min = i
            for (let j = i + 1; j < len; j++) {
                this.incrementOpCounter()
                if (array[min] > array[j]) {
                    min = j
                }
            }
            if (min !== i) {
                let tmp = array[i]
                array[i] = array[min]
                array[min] = tmp
            }
        }
    }
}
