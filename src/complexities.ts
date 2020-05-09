export interface Complexity {
  readonly name: string
  readonly notation: string
  readonly rating: string

  calculate(n: number): number
}

export abstract class Complexities {
  static readonly logarithmic: Complexity = {
    name: "Logarithmic",
    notation: "Ο(log n)",
    rating: "excellent",
    calculate: (n) => Math.round(Math.log2(n)),
  }

  static readonly linear: Complexity = {
    name: "Linear",
    notation: "Ο(n)",
    rating: "good",
    calculate: (n) => n,
  }

  static readonly bilinear: Complexity = {
    name: "Bilinear",
    notation: "Ο(n+k)",
    rating: "good",
    calculate: (n) => 2 * n,
  }

  static readonly linearithmic: Complexity = {
    name: "Linearithmic",
    notation: "Ο(n log n)",
    rating: "fair",
    calculate: (n) => Math.round(n * Math.log2(n)),
  }

  static readonly quadratic: Complexity = {
    name: "Quadratic",
    notation: "Ο(n²)",
    rating: "poor",
    calculate: (n) => n * n,
  }

  static readonly exponential: Complexity = {
    name: "Exponential",
    notation: "Ο(2ⁿ)",
    rating: "bad",
    calculate: (n) => 2 ** Math.min(n, 32),
  }

  static readonly common: Complexity[] = [
    Complexities.exponential,
    Complexities.quadratic,
    Complexities.linearithmic,
    Complexities.linear,
    Complexities.logarithmic,
  ]
}

export default Complexities
