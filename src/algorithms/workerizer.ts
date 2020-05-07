import { transfer } from "comlink"
import Algorithm from "./algorithm"

// @todo Alright this looks a bit wonky but it has to do with comlink's way of proxifying classes
type Worker = {
  default: any
}

export default function workerize(algorithm: Algorithm, workerFactory: () => Worker) {
  let worker: Worker
  const unworkerizedExecuteAndCount = algorithm.executeAndCount.bind(algorithm)

  const getWorkerAlgorithm = async () => {
    if (!worker) {
      worker = workerFactory()
    }
    // eslint-disable-next-line new-cap
    return new worker.default()
  }

  const workerizedExecuteAndCount = async (array: number[]) => {
    const shouldWorkerize = algorithm.timeComplexityWorst.calculate(array.length) === -1 // @todo always false for now
    if (shouldWorkerize) {
      const workerAlgorithm = await getWorkerAlgorithm()
      const transferable = Float32Array.from(array)
      return workerAlgorithm.executeAndCount(transfer(transferable, [transferable.buffer]))
    }
    return unworkerizedExecuteAndCount(array)
  }

  algorithm.executeAndCount = workerizedExecuteAndCount

  return algorithm
}
