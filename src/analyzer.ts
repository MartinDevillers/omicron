import { DataSet } from "./data-sets"
import Algorithm from "./algorithms/algorithm"
import workerizeExecuteAndCount from "./algorithms/workerizer"

export interface Analysis {
  readonly name: string
  readonly algorithm: string
  readonly dataSetName: string
  readonly dataSetSize: number
  readonly actualOperations: number
  readonly expectedOperationsBest: number
  readonly expectedOperationsAverage: number
  readonly expectedOperationsWorst: number
}

export async function analyze(
  algorithms: Algorithm[],
  dataSets: DataSet[],
  sizes: number[],
  scatter = false,
  workerizeFrom = 0
): Promise<Analysis[]> {
  const analyses: Promise<Analysis>[] = []
  for (const size of sizes) {
    for (const dataSet of dataSets) {
      const array = dataSet.generate(size * (scatter ? Math.random() * 0.5 + 0.75 : 1))
      const actualSize = array.length
      for (const algorithm of algorithms) {
        const shouldWorkerize = algorithm.timeComplexityWorst.calculate(array.length) >= workerizeFrom
        const executeAndCount = shouldWorkerize
          ? workerizeExecuteAndCount(algorithm)
          : algorithm.executeAndCount.bind(algorithm)
        const analysis = executeAndCount(Array.from(array)).then((operations) => ({
          name: algorithms.length === 1 ? dataSet.name : algorithm.name,
          algorithm: algorithm.name,
          dataSetName: dataSet.name,
          dataSetSize: actualSize,
          actualOperations: operations,
          expectedOperationsBest: algorithm.timeComplexityBest.calculate(actualSize),
          expectedOperationsAverage: algorithm.timeComplexityAverage.calculate(actualSize),
          expectedOperationsWorst: algorithm.timeComplexityWorst.calculate(actualSize),
        }))
        analyses.push(analysis)
      }
    }
  }
  return Promise.all(analyses)
}

export default analyze
