import { sequenceness, sortedness, uniqueness } from "../array-stats"
import DataSets from "../../data-sets"

describe(`uniqueness`, () => {
  it(`should be close to zero for identical values`, () => {
    const array = DataSets.same.generate(100)
    expect(uniqueness(array)).toBe(1 / array.length)
  })
  it(`should be one for unique values`, () => {
    const array = DataSets.millions.generate(100)
    expect(uniqueness(array)).toBe(1)
  })
})

describe(`sortedness`, () => {
  it(`should be zero for reversed array`, () => {
    const array = DataSets.reversed.generate(100)
    expect(sortedness(array)).toBe(0)
  })
  it(`should be one for sorted array`, () => {
    const array = DataSets.sorted.generate(100)
    expect(sortedness(array)).toBe(1)
  })
})

describe(`sequenceness`, () => {
  it(`should be close to zero for alternating array`, () => {
    const array = DataSets.zigzag.generate(100)
    expect(sequenceness(array)).toBe(0.02)
  })
  it(`should be close to one for reversed array`, () => {
    const array = DataSets.reversed.generate(100)
    expect(sequenceness(array)).toBe(0.99)
  })
  it(`should be close to one for sorted array`, () => {
    const array = DataSets.sorted.generate(100)
    expect(sequenceness(array)).toBe(0.99)
  })
})
