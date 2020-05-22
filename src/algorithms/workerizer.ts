/* eslint-disable import/no-webpack-loader-syntax */
import { transfer } from "comlink"
import BubbleSortWorker, { Comlink, Worker } from "comlink-loader!./bubble-sort"
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

const memoize = <T>(factory: () => T): (() => T) => {
  let instance: T
  return () => {
    if (!instance) {
      instance = factory()
    }
    return instance
  }
}

type AlgorithmContructor = { new (): Algorithm }

const workerized: Map<AlgorithmContructor, () => Worker<AlgorithmContructor>> = new Map([
  [BubbleSort, memoize(() => new BubbleSortWorker<AlgorithmContructor>())],
  [CountingSort, memoize(() => new CountingSortWorker<AlgorithmContructor>())],
  [HeapSort, memoize(() => new HeapSortWorker<AlgorithmContructor>())],
  [InsertionSort, memoize(() => new InsertionSortWorker<AlgorithmContructor>())],
  [MergeSort, memoize(() => new MergeSortWorker<AlgorithmContructor>())],
  [QuickSort, memoize(() => new QuickSortWorker<AlgorithmContructor>())],
  [SelectionSort, memoize(() => new SelectionSortWorker<AlgorithmContructor>())],
  [TimSort, memoize(() => new TimSortWorker<AlgorithmContructor>())],
])

export default function workerizeExecuteAndCount(algorithm: Algorithm) {
  const key = algorithm.constructor as AlgorithmContructor
  if (workerized.has(key)) {
    const worker = workerized.get(key)!()
    return async (array: number[]) => {
      // eslint-disable-next-line new-cap
      const workerAlgorithm = await new worker.default()
      const transferable = Float32Array.from(array)
      return workerAlgorithm.executeAndCount(transfer(transferable, [transferable.buffer]))
    }
  }
  return algorithm.executeAndCount.bind(algorithm)
}
