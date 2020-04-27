import {Complexity} from "../complexities";

export default abstract class Algorithm {
    private _operations!: number

    public executeAndCount(array: number[]): number {
        this._operations = 0
        try {
            this.execute(array)
        } catch{}
        return this._operations
    }

    protected incrementOpCounter(): void {
        this._operations++
    }

    abstract readonly name: string
    abstract readonly timeComplexityBest: Complexity
    abstract readonly timeComplexityAverage: Complexity
    abstract readonly timeComplexityWorst: Complexity

    abstract execute(array: number[]): void
}