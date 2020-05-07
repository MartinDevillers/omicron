/* eslint-disable import/no-webpack-loader-syntax */
import BubbleSortWorker from "comlink-loader!./bubble-sort"
import CountingSortWorker from "comlink-loader!./counting-sort"
import HeapSortWorker from "comlink-loader!./heap-sort"
import InsertionSortWorker from "comlink-loader!./insertion-sort"
import MergeSortWorker from "comlink-loader!./merge-sort"
import QuickSortWorker from "comlink-loader!./quick-sort"
import SelectionSortWorker from "comlink-loader!./selection-sort"
import TimSortWorker from "comlink-loader!./tim-sort"
import Algorithm from "./algorithm"
import BubbleSort from "./bubble-sort"
import CountingSort from "./counting-sort"
import HeapSort from "./heap-sort"
import InsertionSort from "./insertion-sort"
import MergeSort from "./merge-sort"
import QuickSort from "./quick-sort"
import SelectionSort from "./selection-sort"
import TimSort from "./tim-sort"
import workerize from "./workerizer"

export abstract class Algorithms {
  static readonly bubbleSort: Algorithm = workerize(new BubbleSort(), () => new BubbleSortWorker())
  static readonly countingSort: Algorithm = workerize(new CountingSort(), () => new CountingSortWorker())
  static readonly heapSort: Algorithm = workerize(new HeapSort(), () => new HeapSortWorker())
  static readonly insertionSort: Algorithm = workerize(new InsertionSort(), () => new InsertionSortWorker())
  static readonly mergeSort: Algorithm = workerize(new MergeSort(), () => new MergeSortWorker())
  static readonly quickSort: Algorithm = workerize(new QuickSort(), () => new QuickSortWorker())
  static readonly selectionSort: Algorithm = workerize(new SelectionSort(), () => new SelectionSortWorker())
  static readonly timSort: Algorithm = workerize(new TimSort(), () => new TimSortWorker())
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
