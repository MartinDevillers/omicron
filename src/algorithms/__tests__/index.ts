import Algorithms from "../index"
import DataSets from "../../data-sets"

describe.each(Algorithms.all.map((x) => [x.name, x]))(`Algorithm %s `, (name, algorithm) => {
  const size = 100
  it(`should sort the input`, () => {
    const dataSet = DataSets.random.generate(size)
    expect(dataSet).not.toBeSorted()
    algorithm.execute(dataSet)
    expect(dataSet).toBeSorted()
  })
  it(`should count the operations`, () => {
    const dataSet = DataSets.random.generate(size)
    const operations = algorithm.executeAndCount(dataSet)
    expect(operations).resolves.toBeGreaterThan(0)
  })
  it(`should not perform better than best case`, () => {
    const dataSet = DataSets.random.generate(size)
    const operations = algorithm.executeAndCount(dataSet)
    const bestCase = algorithm.timeComplexityBest.calculate(size) / 2 // @todo tighten this
    expect(operations).resolves.toBeGreaterThanOrEqual(bestCase)
  })
  it(`should not perform worse than worst case`, () => {
    const dataSet = DataSets.random.generate(size)
    const operations = algorithm.executeAndCount(dataSet)
    const worstCase = algorithm.timeComplexityWorst.calculate(size) * 3 // @todo tighten this
    expect(operations).resolves.toBeLessThanOrEqual(worstCase)
  })
})
