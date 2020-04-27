import Algorithm from './algorithm'
import {Complexities} from "../complexities";

export default class MergeSort extends Algorithm {

    name = "Merge Sort"
    timeComplexityBest = Complexities.linearithmic;
    timeComplexityAverage = Complexities.linearithmic;
    timeComplexityWorst = Complexities.linearithmic;

    execute(array: number[]): void {
        this.mergeSort(array)
    }

    mergeSort(array: number[]): number[] {
        let len = array.length
        if (len < 2) {
            return array
        }

        let mid = Math.floor(len / 2),
            left = array.slice(0, mid),
            right = array.slice(mid)

        return this.merge(this.mergeSort(left), this.mergeSort(right))
    }

    merge(left: number[], right: number[]): number[] {
        let leftLen = left.length,
            rightLen = right.length,
            l = 0,
            r = 0,
            result = []

        while (l < leftLen && r < rightLen) {
            if (left[l] < right[r]) {
                result.push(left[l++])
            } else {
                result.push(right[r++])
            }
            this.incrementOpCounter()
        }

        return result.concat(left.slice(l)).concat(right.slice(r))
    }
}
