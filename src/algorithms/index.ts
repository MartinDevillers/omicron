import Algorithm from "./algorithm"
import BubbleSort from "./bubble-sort"
import CountingSort from "./counting-sort"
import HeapSort from "./heap-sort"
import InsertionSort from "./insertion-sort"
import MergeSort from "./merge-sort"
import QuickSort from "./quick-sort"
import SelectionSort from "./selection-sort"
import TimSort from "./tim-sort"

export abstract class Algorithms {
  static readonly bubbleSort: Algorithm = new BubbleSort()
  static readonly countingSort: Algorithm = new CountingSort()
  static readonly heapSort: Algorithm = new HeapSort()
  static readonly insertionSort: Algorithm = new InsertionSort()
  static readonly mergeSort: Algorithm = new MergeSort()
  static readonly quickSort: Algorithm = new QuickSort()
  static readonly selectionSort: Algorithm = new SelectionSort()
  static readonly timSort: Algorithm = new TimSort()
  static readonly all: Algorithm[] = [
    Algorithms.bubbleSort,
    Algorithms.countingSort,
    Algorithms.heapSort,
    Algorithms.insertionSort,
    Algorithms.mergeSort,
    Algorithms.quickSort,
    Algorithms.selectionSort,
    Algorithms.timSort,
  ]
}

export default Algorithms
