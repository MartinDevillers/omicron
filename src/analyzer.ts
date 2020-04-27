import {DataSet} from "./data-sets"
import Algorithm from "./algorithms/algorithm";

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

const logarithmics = [10, 15, 20, 30, 40, 60, 80, 100, 150, 200, 300, 400, 600, 800, 1000, 1500, 2000, 3000, 4000, 6000, 8000]

export default function analyze(algorithms:Algorithm[], dataSets:DataSet[], sizes:number[] = logarithmics, scatter:boolean = false):Analysis[] {
    const analyses: Analysis[] = [];
    for (let size of sizes) {
        for (let dataSet of dataSets) {
            const array = dataSet.generate(size * (scatter ? (Math.random() * 0.5) + 0.75 : 1))
            const actualSize = array.length
            for (let algorithm of algorithms) {
                const operations = algorithm.executeAndCount(Array.from(array))
                analyses.push({
                    name: algorithms.length === 1 ? dataSet.name : algorithm.name,
                    algorithm: algorithm.name,
                    dataSetName: dataSet.name,
                    dataSetSize: actualSize,
                    actualOperations: operations,
                    expectedOperationsBest: algorithm.timeComplexityBest.calculate(actualSize),
                    expectedOperationsAverage: algorithm.timeComplexityAverage.calculate(actualSize),
                    expectedOperationsWorst: algorithm.timeComplexityWorst.calculate(actualSize)
                })
            }
        }
    }
    // console.log(JSON.stringify(analyses))
    return analyses
}