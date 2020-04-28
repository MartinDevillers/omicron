import { Complexity } from "../complexities"

export default abstract class Algorithm {
  private operations!: number

  public executeAndCount(array: number[]): number {
    this.operations = 0
    try {
      this.execute(array)
    } catch {
      // continue regardless of error
    }
    return this.operations
  }

  protected incrementOpCounter(): void {
    this.operations++
  }

  abstract readonly name: string
  abstract readonly timeComplexityBest: Complexity
  abstract readonly timeComplexityAverage: Complexity
  abstract readonly timeComplexityWorst: Complexity
  abstract execute(array: number[]): void
}
