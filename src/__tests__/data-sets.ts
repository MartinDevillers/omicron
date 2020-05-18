import DataSets from "../data-sets"

describe.each(DataSets.all.map((x) => [x.name, x]))(`Data Set %s `, (name, dataSet) => {
  it(`should generate data`, () => {
    expect(dataSet.generate(100)).toHaveLength(100)
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Random %s`, (size) => {
  const array = DataSets.random.generate(size)
  it(`should generate random data`, () => {
    const unique = new Set(array)
    expect(unique.size).toBeGreaterThanOrEqual(size * 0.5)
    expect(unique.size).toBeLessThanOrEqual(size * 0.8)
  })
  it(`should keep a variance equal to the size`, () => {
    const min = Math.min(...array)
    const max = Math.max(...array)
    expect(min).toBeGreaterThanOrEqual(0)
    expect(max).toBeLessThanOrEqual(size)
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Sorted %s`, (size) => {
  const array = DataSets.sorted.generate(size)
  it(`should generate sorted data`, () => {
    expect(array).toBeSorted()
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Half Sorted %s`, (size) => {
  const array = DataSets.halfSorted.generate(size)
  it(`should generate sorted data in the first half`, () => {
    expect(array.slice(0, size / 2)).toBeSorted()
  })
  it(`should generate random data in the second half`, () => {
    const unique = new Set(array.slice(size / 2))
    expect(unique.size).toBeGreaterThanOrEqual(size * 0.2)
    expect(unique.size).toBeLessThanOrEqual(size * 0.5)
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Sorted Half %s`, (size) => {
  const array = DataSets.sortedHalf.generate(size)

  it(`should generate random data in the first half`, () => {
    const unique = new Set(array.slice(0, size / 2))
    expect(unique.size).toBeGreaterThanOrEqual(size * 0.2)
    expect(unique.size).toBeLessThanOrEqual(size * 0.5)
  })
  it(`should generate sorted data in the second half`, () => {
    expect(array.slice(size / 2)).toBeSorted()
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Semi Sorted %s`, (size) => {
  const array = DataSets.semiSorted.generate(size)
  const random = array.filter((x, i) => i % 20 >= 10)
  const sorted = array.filter((x, i) => i % 20 < 10)
  it(`should generate random data every 10 items`, () => {
    if (size > 10) {
      const unique = new Set(random)
      expect(unique.size).toBeGreaterThanOrEqual(size * 0.5)
      expect(unique.size).toBeLessThanOrEqual(size * 0.75)
    }
  })
  it(`should keep random date within a variance equal to the size`, () => {
    const min = Math.min(...random)
    const max = Math.max(...random)
    expect(min).toBeGreaterThanOrEqual(0)
    expect(max).toBeLessThanOrEqual(size)
  })
  it(`should generate sorted data every 10 items`, () => {
    expect(sorted).toBeSorted()
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Reversed %s`, (size) => {
  const array = DataSets.reversed.generate(size)
  it(`should generate reversed data`, () => {
    expect(array.reverse()).toBeSorted()
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Same %s`, (size) => {
  const array = DataSets.same.generate(size)
  it(`should generate identical data`, () => {
    const unique = new Set(array)
    expect(unique.size).toBe(1)
    expect(unique.has(size)).toBeTruthy()
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Zig Zag  %s`, (size) => {
  const array = DataSets.zigzag.generate(size)
  it(`should generate interwoven sorted and reversed data`, () => {
    expect(array[0]).toBe(0)
    expect(array[1]).toBe(size - 1)
    expect(array[2]).toBe(2)
    expect(array[3]).toBe(size - 3)
    expect(array[4]).toBe(4)
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Sawtooth %s`, (size) => {
  const array = DataSets.sawtooth.generate(size)
  const toothSize = Math.floor(Math.sqrt(size))
  it(`should generate sorted teeth`, () => {
    const tooth = array.slice(0, toothSize)
    expect(tooth).toBeSorted()
  })
  it(`should generate repeated teeth`, () => {
    const firstTooth = array.slice(0, toothSize)
    const secondTooth = array.slice(toothSize, 2 * toothSize)
    expect(firstTooth).toEqual(secondTooth)
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Square %s`, (size) => {
  const array = DataSets.square.generate(size)
  it(`should generate only zeroes or size`, () => {
    const unique = new Set(array)
    expect(unique.size).toBe(2)
    expect(unique.has(0)).toBeTruthy()
    expect(unique.has(size)).toBeTruthy()
  })
  it(`should generate about the same amount of zeroes and size`, () => {
    const zeroCount = array.reduce((n, val) => n + (val === 0 ? 1 : 0))
    const sizeCount = array.reduce((n, val) => n + (val === size ? 1 : 0))
    expect(zeroCount / sizeCount).toBeGreaterThanOrEqual(0.5)
    expect(zeroCount / sizeCount).toBeLessThan(2)
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Zeroes %s`, (size) => {
  const array = DataSets.zeroes.generate(size)
  it(`should generate only zeroes`, () => {
    const unique = new Set(array)
    expect(unique.size).toBe(1)
    expect(unique.values().next().value).toBe(0)
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Thousands %s`, (size) => {
  const array = DataSets.thousands.generate(size)
  it(`should generate random data`, () => {
    const unique = new Set(array)
    expect(unique.size).toBeGreaterThanOrEqual(Math.min(1000, size * 0.09999999))
    expect(unique.size).toBeLessThanOrEqual(Math.min(1000, size))
  })
  it(`should keep a variance equal to one thousand`, () => {
    const min = Math.min(...array)
    const max = Math.max(...array)
    expect(min).toBeGreaterThanOrEqual(0)
    expect(max).toBeLessThanOrEqual(1000)
  })
})

describe.each([10, 100, 500, 1000, 5000, 10000])(`Data Set Millions %s`, (size) => {
  const array = DataSets.millions.generate(size)
  it(`should generate random data`, () => {
    const unique = new Set(array)
    expect(unique.size).toBeGreaterThanOrEqual(size * 0.9)
    expect(unique.size).toBeLessThanOrEqual(size)
  })
  it(`should keep a variance equal to one million`, () => {
    const min = Math.min(...array)
    const max = Math.max(...array)
    expect(min).toBeGreaterThanOrEqual(0)
    expect(max).toBeLessThanOrEqual(1000000)
  })
})