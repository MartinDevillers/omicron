/* eslint-disable no-bitwise,no-param-reassign,class-methods-use-this,no-nested-ternary,max-classes-per-file */
import Algorithm from "./algorithm"
import { Complexities } from "../complexities"

type Comparer = (a: string | object | number, b: string | object | number) => number

export default class TimSort extends Algorithm {
  name = "Tim Sort"
  timeComplexityBest = Complexities.linear
  timeComplexityAverage = Complexities.linearithmic
  timeComplexityWorst = Complexities.linearithmic

  execute(array: number[]): void {
    this.sort(array)
  }

  /**
   * Default minimum size of a run.
   */
  static readonly DEFAULT_MIN_MERGE = 32

  /**
   * Minimum ordered subsequece required to do galloping.
   */
  static readonly DEFAULT_MIN_GALLOPING = 7

  /**
   * Default tmp storage length. Can increase depending on the size of the
   * smallest run to merge.
   */
  static readonly DEFAULT_TMP_STORAGE_LENGTH = 256

  /**
   * Pre-computed powers of 10 for efficient lexicographic comparison of
   * small integers.
   */
  static readonly POWERS_OF_TEN = [1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9]

  /**
   * Estimate the logarithm base 10 of a small integer.
   *
   * @param {number} x - The integer to estimate the logarithm of.
   * @return {number} - The estimated logarithm of the integer.
   */
  static log10(x: number): number {
    if (x < 1e5) {
      if (x < 1e2) {
        return x < 1e1 ? 0 : 1
      }

      if (x < 1e4) {
        return x < 1e3 ? 2 : 3
      }

      return 4
    }

    if (x < 1e7) {
      return x < 1e6 ? 5 : 6
    }

    if (x < 1e9) {
      return x < 1e8 ? 7 : 8
    }

    return 9
  }

  /**
   * Default alphabetical comparison of items.
   *
   * @param {string|object|number} a - First element to compare.
   * @param {string|object|number} b - Second element to compare.
   * @return {number} - A positive number if a.toString() > b.toString(), a
   * negative number if .toString() < b.toString(), 0 otherwise.
   */
  alphabeticalCompare(a: string | object | number, b: string | object | number): number {
    this.incrementOpCounter()

    if (a === b) {
      return 0
    }

    if (~~a === a && ~~b === b) {
      if (a === 0 || b === 0) {
        return a < b ? -1 : 1
      }

      if (a < 0 || b < 0) {
        if (b >= 0) {
          return -1
        }

        if (a >= 0) {
          return 1
        }

        a = -a
        b = -b
      }

      const al = TimSort.log10(a)
      const bl = TimSort.log10(b)

      let t = 0

      if (al < bl) {
        a *= TimSort.POWERS_OF_TEN[bl - al - 1]
        b /= 10
        t = -1
      } else if (al > bl) {
        b *= TimSort.POWERS_OF_TEN[al - bl - 1]
        a /= 10
        t = 1
      }

      if (a === b) {
        return t
      }

      return a < b ? -1 : 1
    }

    const aStr = String(a)
    const bStr = String(b)

    if (aStr === bStr) {
      return 0
    }

    return aStr < bStr ? -1 : 1
  }

  /**
   * Compute minimum run length for TimSort
   *
   * @param {number} n - The size of the array to sort.
   */
  minRunLength(n: number): number {
    let r = 0

    while (n >= TimSort.DEFAULT_MIN_MERGE) {
      this.incrementOpCounter()
      r |= n & 1
      n >>= 1
    }

    return n + r
  }

  /**
   * Counts the length of a monotonically ascending or strictly monotonically
   * descending sequence (run) starting at array[lo] in the range [lo, hi). If
   * the run is descending it is made ascending.
   *
   * @param {array} array - The array to reverse.
   * @param {number} lo - First element in the range (inclusive).
   * @param {number} hi - Last element in the range.
   * @param {function} compare - Item comparison function.
   * @return {number} - The length of the run.
   */
  makeAscendingRun(array: number[], lo: number, hi: number, compare: Comparer) {
    let runHi = lo + 1

    if (runHi === hi) {
      return 1
    }

    // Descending
    if (compare(array[runHi++], array[lo]) < 0) {
      while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
        this.incrementOpCounter()
        runHi++
      }

      this.reverseRun(array, lo, runHi)
      // Ascending
    } else {
      while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
        this.incrementOpCounter()
        runHi++
      }
    }

    return runHi - lo
  }

  /**
   * Reverse an array in the range [lo, hi).
   *
   * @param {array} array - The array to reverse.
   * @param {number} lo - First element in the range (inclusive).
   * @param {number} hi - Last element in the range.
   */
  reverseRun(array: number[], lo: number, hi: number) {
    hi--

    while (lo < hi) {
      this.incrementOpCounter()
      const t = array[lo]
      array[lo++] = array[hi]
      array[hi--] = t
    }
  }

  /**
   * Perform the binary sort of the array in the range [lo, hi) where start is
   * the first element possibly out of order.
   *
   * @param {array} array - The array to sort.
   * @param {number} lo - First element in the range (inclusive).
   * @param {number} hi - Last element in the range.
   * @param {number} start - First element possibly out of order.
   * @param {function} compare - Item comparison function.
   */
  binaryInsertionSort(array: number[], lo: number, hi: number, start: number, compare: Comparer) {
    if (start === lo) {
      start++
    }

    for (; start < hi; start++) {
      this.incrementOpCounter()
      const pivot = array[start]

      // Ranges of the array where pivot belongs
      let left = lo
      let right = start

      /*
       *   pivot >= array[i] for i in [lo, left)
       *   pivot <  array[i] for i in  in [right, start)
       */
      while (left < right) {
        this.incrementOpCounter()
        const mid = (left + right) >>> 1

        if (compare(pivot, array[mid]) < 0) {
          right = mid
        } else {
          left = mid + 1
        }
      }

      /*
       * Move elements right to make room for the pivot. If there are elements
       * equal to pivot, left points to the first slot after them: this is also
       * a reason for which TimSort is stable
       */
      let n = start - left
      // Switch is just an optimization for small arrays
      switch (n) {
        case 3:
          array[left + 3] = array[left + 2]
        /* falls through */
        case 2:
          array[left + 2] = array[left + 1]
        /* falls through */
        case 1:
          array[left + 1] = array[left]
          break
        default:
          while (n > 0) {
            this.incrementOpCounter()
            array[left + n] = array[left + n - 1]
            n--
          }
      }

      array[left] = pivot
    }
  }

  /**
   * Find the position at which to insert a value in a sorted range. If the range
   * contains elements equal to the value the leftmost element index is returned
   * (for stability).
   *
   * @param {number} value - Value to insert.
   * @param {array} array - The array in which to insert value.
   * @param {number} start - First element in the range.
   * @param {number} length - Length of the range.
   * @param {number} hint - The index at which to begin the search.
   * @param {function} compare - Item comparison function.
   * @return {number} - The index where to insert value.
   */
  gallopLeft(value: number, array: number[], start: number, length: number, hint: number, compare: Comparer) {
    let lastOffset = 0
    let maxOffset = 0
    let offset = 1

    if (compare(value, array[start + hint]) > 0) {
      maxOffset = length - hint

      while (offset < maxOffset && compare(value, array[start + hint + offset]) > 0) {
        this.incrementOpCounter()
        lastOffset = offset
        offset = (offset << 1) + 1

        if (offset <= 0) {
          offset = maxOffset
        }
      }

      if (offset > maxOffset) {
        offset = maxOffset
      }

      // Make offsets relative to start
      lastOffset += hint
      offset += hint

      // value <= array[start + hint]
    } else {
      maxOffset = hint + 1
      while (offset < maxOffset && compare(value, array[start + hint - offset]) <= 0) {
        this.incrementOpCounter()
        lastOffset = offset
        offset = (offset << 1) + 1

        if (offset <= 0) {
          offset = maxOffset
        }
      }
      if (offset > maxOffset) {
        offset = maxOffset
      }

      // Make offsets relative to start
      const tmp = lastOffset
      lastOffset = hint - offset
      offset = hint - tmp
    }

    /*
     * Now array[start+lastOffset] < value <= array[start+offset], so value
     * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
     * binary search, with invariant array[start + lastOffset - 1] < value <=
     * array[start + offset].
     */
    lastOffset++
    while (lastOffset < offset) {
      this.incrementOpCounter()
      const m = lastOffset + ((offset - lastOffset) >>> 1)

      if (compare(value, array[start + m]) > 0) {
        lastOffset = m + 1
      } else {
        offset = m
      }
    }
    return offset
  }

  /**
   * Find the position at which to insert a value in a sorted range. If the range
   * contains elements equal to the value the rightmost element index is returned
   * (for stability).
   *
   * @param {number} value - Value to insert.
   * @param {array} array - The array in which to insert value.
   * @param {number} start - First element in the range.
   * @param {number} length - Length of the range.
   * @param {number} hint - The index at which to begin the search.
   * @param {function} compare - Item comparison function.
   * @return {number} - The index where to insert value.
   */
  gallopRight(value: number, array: number[], start: number, length: number, hint: number, compare: Comparer) {
    let lastOffset = 0
    let maxOffset = 0
    let offset = 1

    if (compare(value, array[start + hint]) < 0) {
      maxOffset = hint + 1

      while (offset < maxOffset && compare(value, array[start + hint - offset]) < 0) {
        this.incrementOpCounter()
        lastOffset = offset
        offset = (offset << 1) + 1

        if (offset <= 0) {
          offset = maxOffset
        }
      }

      if (offset > maxOffset) {
        offset = maxOffset
      }

      // Make offsets relative to start
      const tmp = lastOffset
      lastOffset = hint - offset
      offset = hint - tmp

      // value >= array[start + hint]
    } else {
      maxOffset = length - hint

      while (offset < maxOffset && compare(value, array[start + hint + offset]) >= 0) {
        this.incrementOpCounter()
        lastOffset = offset
        offset = (offset << 1) + 1

        if (offset <= 0) {
          offset = maxOffset
        }
      }

      if (offset > maxOffset) {
        offset = maxOffset
      }

      // Make offsets relative to start
      lastOffset += hint
      offset += hint
    }

    /*
     * Now array[start+lastOffset] < value <= array[start+offset], so value
     * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
     * binary search, with invariant array[start + lastOffset - 1] < value <=
     * array[start + offset].
     */
    lastOffset++

    while (lastOffset < offset) {
      this.incrementOpCounter()
      const m = lastOffset + ((offset - lastOffset) >>> 1)

      if (compare(value, array[start + m]) < 0) {
        offset = m
      } else {
        lastOffset = m + 1
      }
    }

    return offset
  }

  static TimSortInner = class {
    array: number[]
    tmp: number[]
    compare: Comparer
    minGallop = TimSort.DEFAULT_MIN_GALLOPING
    length = 0
    tmpStorageLength = TimSort.DEFAULT_TMP_STORAGE_LENGTH
    stackLength = 0
    runStart: number[]
    runLength: number[]
    stackSize = 0
    outer: TimSort

    constructor(array: number[], compare: Comparer, outer: TimSort) {
      this.array = array
      this.compare = compare
      this.outer = outer

      this.length = array.length

      if (this.length < 2 * TimSort.DEFAULT_TMP_STORAGE_LENGTH) {
        this.tmpStorageLength = this.length >>> 1
      }

      this.tmp = new Array(this.tmpStorageLength)

      this.stackLength = this.length < 120 ? 5 : this.length < 1542 ? 10 : this.length < 119151 ? 19 : 40

      this.runStart = new Array(this.stackLength)
      this.runLength = new Array(this.stackLength)
    }

    /**
     * Push a new run on TimSort's stack.
     *
     * @param {number} runStart - Start index of the run in the original array.
     * @param {number} runLength - Length of the run;
     */
    pushRun(runStart: number, runLength: number) {
      this.runStart[this.stackSize] = runStart
      this.runLength[this.stackSize] = runLength
      this.stackSize += 1
    }

    /**
     * Merge runs on TimSort's stack so that the following holds for all i:
     * 1) runLength[i - 3] > runLength[i - 2] + runLength[i - 1]
     * 2) runLength[i - 2] > runLength[i - 1]
     */
    mergeRuns() {
      while (this.stackSize > 1) {
        this.outer.incrementOpCounter()
        let n = this.stackSize - 2

        if (
          (n >= 1 && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1]) ||
          (n >= 2 && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1])
        ) {
          if (this.runLength[n - 1] < this.runLength[n + 1]) {
            n--
          }
        } else if (this.runLength[n] > this.runLength[n + 1]) {
          break
        }
        this.mergeAt(n)
      }
    }

    /**
     * Merge all runs on TimSort's stack until only one remains.
     */
    forceMergeRuns() {
      while (this.stackSize > 1) {
        this.outer.incrementOpCounter()
        let n = this.stackSize - 2

        if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
          n--
        }

        this.mergeAt(n)
      }
    }

    /**
     * Merge the runs on the stack at positions i and i+1. Must be always be called
     * with i=stackSize-2 or i=stackSize-3 (that is, we merge on top of the stack).
     *
     * @param {number} i - Index of the run to merge in TimSort's stack.
     */
    mergeAt(i: number) {
      const { compare } = this
      const { array } = this

      let start1 = this.runStart[i]
      let length1 = this.runLength[i]
      const start2 = this.runStart[i + 1]
      let length2 = this.runLength[i + 1]

      this.runLength[i] = length1 + length2

      if (i === this.stackSize - 3) {
        this.runStart[i + 1] = this.runStart[i + 2]
        this.runLength[i + 1] = this.runLength[i + 2]
      }

      this.stackSize--

      /*
       * Find where the first element in the second run goes in run1. Previous
       * elements in run1 are already in place
       */
      const k = this.outer.gallopRight(array[start2], array, start1, length1, 0, compare)
      start1 += k
      length1 -= k

      if (length1 === 0) {
        return
      }

      /*
       * Find where the last element in the first run goes in run2. Next elements
       * in run2 are already in place
       */
      length2 = this.outer.gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare)

      if (length2 === 0) {
        return
      }

      /*
       * Merge remaining runs. A tmp array with length = min(length1, length2) is
       * used
       */
      if (length1 <= length2) {
        this.mergeLow(start1, length1, start2, length2)
      } else {
        this.mergeHigh(start1, length1, start2, length2)
      }
    }

    /**
     * Merge two adjacent runs in a stable way. The runs must be such that the
     * first element of run1 is bigger than the first element in run2 and the
     * last element of run1 is greater than all the elements in run2.
     * The method should be called when run1.length <= run2.length as it uses
     * TimSort temporary array to store run1. Use mergeHigh if run1.length >
     * run2.length.
     *
     * @param {number} start1 - First element in run1.
     * @param {number} length1 - Length of run1.
     * @param {number} start2 - First element in run2.
     * @param {number} length2 - Length of run2.
     */
    mergeLow(start1: number, length1: number, start2: number, length2: number) {
      const { compare } = this
      const { array } = this
      const { tmp } = this
      let i = 0

      for (i = 0; i < length1; i++) {
        this.outer.incrementOpCounter()
        tmp[i] = array[start1 + i]
      }

      let cursor1 = 0
      let cursor2 = start2
      let dest = start1

      array[dest++] = array[cursor2++]

      if (--length2 === 0) {
        for (i = 0; i < length1; i++) {
          this.outer.incrementOpCounter()
          array[dest + i] = tmp[cursor1 + i]
        }
        return
      }

      if (length1 === 1) {
        for (i = 0; i < length2; i++) {
          this.outer.incrementOpCounter()
          array[dest + i] = array[cursor2 + i]
        }
        array[dest + length2] = tmp[cursor1]
        return
      }

      let { minGallop } = this

      while (true) {
        this.outer.incrementOpCounter()
        let count1 = 0
        let count2 = 0
        let exit = false

        do {
          this.outer.incrementOpCounter()
          if (compare(array[cursor2], tmp[cursor1]) < 0) {
            array[dest++] = array[cursor2++]
            count2++
            count1 = 0

            if (--length2 === 0) {
              exit = true
              break
            }
          } else {
            array[dest++] = tmp[cursor1++]
            count1++
            count2 = 0
            if (--length1 === 1) {
              exit = true
              break
            }
          }
        } while ((count1 | count2) < minGallop)

        if (exit) {
          break
        }

        do {
          this.outer.incrementOpCounter()
          count1 = this.outer.gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare)

          if (count1 !== 0) {
            for (i = 0; i < count1; i++) {
              this.outer.incrementOpCounter()
              array[dest + i] = tmp[cursor1 + i]
            }

            dest += count1
            cursor1 += count1
            length1 -= count1
            if (length1 <= 1) {
              exit = true
              break
            }
          }

          array[dest++] = array[cursor2++]

          if (--length2 === 0) {
            exit = true
            break
          }

          count2 = this.outer.gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare)

          if (count2 !== 0) {
            for (i = 0; i < count2; i++) {
              this.outer.incrementOpCounter()
              array[dest + i] = array[cursor2 + i]
            }

            dest += count2
            cursor2 += count2
            length2 -= count2

            if (length2 === 0) {
              exit = true
              break
            }
          }
          array[dest++] = tmp[cursor1++]

          if (--length1 === 1) {
            exit = true
            break
          }

          minGallop--
        } while (count1 >= TimSort.DEFAULT_MIN_GALLOPING || count2 >= TimSort.DEFAULT_MIN_GALLOPING)

        if (exit) {
          break
        }

        if (minGallop < 0) {
          minGallop = 0
        }

        minGallop += 2
      }

      this.minGallop = minGallop

      if (minGallop < 1) {
        this.minGallop = 1
      }

      if (length1 === 1) {
        for (i = 0; i < length2; i++) {
          this.outer.incrementOpCounter()
          array[dest + i] = array[cursor2 + i]
        }
        array[dest + length2] = tmp[cursor1]
      } else if (length1 === 0) {
        throw new Error("mergeLow preconditions were not respected")
      } else {
        for (i = 0; i < length1; i++) {
          this.outer.incrementOpCounter()
          array[dest + i] = tmp[cursor1 + i]
        }
      }
    }

    /**
     * Merge two adjacent runs in a stable way. The runs must be such that the
     * first element of run1 is bigger than the first element in run2 and the
     * last element of run1 is greater than all the elements in run2.
     * The method should be called when run1.length > run2.length as it uses
     * TimSort temporary array to store run2. Use mergeLow if run1.length <=
     * run2.length.
     *
     * @param {number} start1 - First element in run1.
     * @param {number} length1 - Length of run1.
     * @param {number} start2 - First element in run2.
     * @param {number} length2 - Length of run2.
     */
    mergeHigh(start1: number, length1: number, start2: number, length2: number) {
      const { compare } = this
      const { array } = this
      const { tmp } = this
      let i = 0

      for (i = 0; i < length2; i++) {
        this.outer.incrementOpCounter()
        tmp[i] = array[start2 + i]
      }

      let cursor1 = start1 + length1 - 1
      let cursor2 = length2 - 1
      let dest = start2 + length2 - 1
      let customCursor = 0
      let customDest = 0

      array[dest--] = array[cursor1--]

      if (--length1 === 0) {
        customCursor = dest - (length2 - 1)

        for (i = 0; i < length2; i++) {
          this.outer.incrementOpCounter()
          array[customCursor + i] = tmp[i]
        }

        return
      }

      if (length2 === 1) {
        dest -= length1
        cursor1 -= length1
        customDest = dest + 1
        customCursor = cursor1 + 1

        for (i = length1 - 1; i >= 0; i--) {
          this.outer.incrementOpCounter()
          array[customDest + i] = array[customCursor + i]
        }

        array[dest] = tmp[cursor2]
        return
      }

      let { minGallop } = this

      while (true) {
        this.outer.incrementOpCounter()
        let count1 = 0
        let count2 = 0
        let exit = false

        do {
          this.outer.incrementOpCounter()
          if (compare(tmp[cursor2], array[cursor1]) < 0) {
            array[dest--] = array[cursor1--]
            count1++
            count2 = 0
            if (--length1 === 0) {
              exit = true
              break
            }
          } else {
            array[dest--] = tmp[cursor2--]
            count2++
            count1 = 0
            if (--length2 === 1) {
              exit = true
              break
            }
          }
        } while ((count1 | count2) < minGallop)

        if (exit) {
          break
        }

        do {
          // this.outer._operations++;
          count1 = length1 - this.outer.gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare)

          if (count1 !== 0) {
            dest -= count1
            cursor1 -= count1
            length1 -= count1
            customDest = dest + 1
            customCursor = cursor1 + 1

            for (i = count1 - 1; i >= 0; i--) {
              this.outer.incrementOpCounter()
              array[customDest + i] = array[customCursor + i]
            }

            if (length1 === 0) {
              exit = true
              break
            }
          }

          array[dest--] = tmp[cursor2--]

          if (--length2 === 1) {
            exit = true
            break
          }

          count2 = length2 - this.outer.gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare)

          if (count2 !== 0) {
            dest -= count2
            cursor2 -= count2
            length2 -= count2
            customDest = dest + 1
            customCursor = cursor2 + 1

            for (i = 0; i < count2; i++) {
              this.outer.incrementOpCounter()
              array[customDest + i] = tmp[customCursor + i]
            }

            if (length2 <= 1) {
              exit = true
              break
            }
          }

          array[dest--] = array[cursor1--]

          if (--length1 === 0) {
            exit = true
            break
          }

          minGallop--
        } while (count1 >= TimSort.DEFAULT_MIN_GALLOPING || count2 >= TimSort.DEFAULT_MIN_GALLOPING)

        if (exit) {
          break
        }

        if (minGallop < 0) {
          minGallop = 0
        }

        minGallop += 2
      }

      this.minGallop = minGallop

      if (minGallop < 1) {
        this.minGallop = 1
      }

      if (length2 === 1) {
        dest -= length1
        cursor1 -= length1
        customDest = dest + 1
        customCursor = cursor1 + 1

        for (i = length1 - 1; i >= 0; i--) {
          this.outer.incrementOpCounter()
          array[customDest + i] = array[customCursor + i]
        }

        array[dest] = tmp[cursor2]
      } else if (length2 === 0) {
        throw new Error("mergeHigh preconditions were not respected")
      } else {
        customCursor = dest - (length2 - 1)
        for (i = 0; i < length2; i++) {
          this.outer.incrementOpCounter()
          array[customCursor + i] = tmp[i]
        }
      }
    }
  }

  /**
   * Sort an array in the range [lo, hi) using TimSort.
   *
   * @param {array} array - The array to sort.
   * @param {function=} compare - Item comparison function. Default is
   *     alphabetical
   * @param {number} lo - First element in the range (inclusive).
   * @param {number} hi - Last element in the range.
   *     comparator.
   */
  sort(array: number[], compare: Comparer = this.alphabeticalCompare.bind(this), lo = 0, hi: number = array.length) {
    let remaining = hi - lo

    // The array is already sorted
    if (remaining < 2) {
      return
    }

    let runLength = 0
    // On small arrays binary sort can be used directly
    if (remaining < TimSort.DEFAULT_MIN_MERGE) {
      runLength = this.makeAscendingRun(array, lo, hi, compare)
      this.binaryInsertionSort(array, lo, hi, lo + runLength, compare)
      return
    }

    const ts = new TimSort.TimSortInner(array, compare, this)

    const minRun = this.minRunLength(remaining)

    do {
      this.incrementOpCounter()
      runLength = this.makeAscendingRun(array, lo, hi, compare)
      if (runLength < minRun) {
        let force = remaining
        if (force > minRun) {
          force = minRun
        }

        this.binaryInsertionSort(array, lo, lo + force, lo + runLength, compare)
        runLength = force
      }
      // Push new run and merge if necessary
      ts.pushRun(lo, runLength)
      ts.mergeRuns()

      // Go find next run
      remaining -= runLength
      lo += runLength
    } while (remaining !== 0)

    // Force merging of remaining runs
    ts.forceMergeRuns()
  }
}
