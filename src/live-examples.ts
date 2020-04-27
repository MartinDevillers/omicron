export interface LiveExample {
    readonly name: string,
    readonly code: string
}

const examples: LiveExample[] = [
    {
        name: 'Awesome Sort',
        code: `class AwesomeSort extends Algorithm {

    constructor() {
        this.name = "Awesome Sort" // Ok, it's actually just Bubble Sort.
        this.timeComplexityBest = Complexities.linear
        this.timeComplexityAverage = Complexities.quadratic
        this.timeComplexityWorst = Complexities.quadratic
    }

    execute(array) {
        // Replace this with your own algoritm.
        // Don't forget to add this.incrementOpCounter() in order to count the ops!
        let len = array.length,
            swapped
        do {
            this.incrementOpCounter()
            swapped = false
            for (let i = 0; i < len; i++) {
                this.incrementOpCounter()
                if (array[i] > array[i + 1]) {
                    let tmp = array[i]
                    array[i] = array[i + 1]
                    array[i + 1] = tmp
                    swapped = true
                }
            }
        } while (swapped)
    }
}

// Compare your custom algorithm with other algorithms
const algorithms = [ new AwesomeSort(), Algorithms.timSort ]
// Below are all the available algoritms
// const algorithms = [ Algorithms.bubbleSort, Algorithms.countingSort, Algorithms.heapSort, Algorithms.insertionSort, Algorithms.mergeSort, Algorithms.quickSort, Algorithms.selectionSort, Algorithms.timSort ]
// const algorithms = Algorithms.all  // Shortcut for using all available algoritms (does not include your custom one!)

// Use the following data sets 
const dataSets = [ DataSets.random, DataSets.sorted ]
// Below are the rest of the built-in data sets
// const dataSets = [ DataSets.halfSorted, DataSets.sortedHalf, DataSets.semiSorted, DataSets.reversed, DataSets.same, DataSets.zigzag, DataSets.sawtooth, DataSets.square, DataSets.zeroes, DataSets.thousands, DataSets.millions ]
// const dataSets = DataSets.all // Shortcut for using all available data sets

render(
    <ComplexityChart title="Time complexity of Awesome Sort versus Tim Sort">
        <ComplexitySeries/>
        <AnalysisSeries algorithms={algorithms} dataSets={dataSets}/>
    </ComplexityChart>
)
`},{
        name: 'Demo Charts',
        code: `render(
    <div>
      <ComplexityChart title="Time complexity of sorting algorithms on a random list of numbers">
          <ComplexitySeries/>
          <AnalysisSeries algorithms={Algorithms.all} dataSets={[DataSets.random]}/>
      </ComplexityChart>
      <br/>
      <ComplexityChart title="Time complexity of sorting algorithms on a sorted list of numbers">
        <ComplexitySeries/>
        <AnalysisSeries  algorithms={Algorithms.all} dataSets={[DataSets.sorted]}/>
      </ComplexityChart>
      <br/>
      <ComplexityChart title="Time complexity of Counting Sort on various lists of numbers">
        <ComplexitySeries/>
        <AnalysisSeries algorithms={[Algorithms.countingSort]} dataSets={DataSets.all}/>
      </ComplexityChart>
      <br/>
      <ComplexityChart title="Time complexity of linearithmic algorithms on various lists of numbers">
        <ComplexitySeries/>
        <AnalysisSeries algorithms={[Algorithms.mergeSort, Algorithms.timSort, Algorithms.heapSort]} dataSets={DataSets.all} scatter={true}/>
      </ComplexityChart>
    </div>
)`}, {
        name: 'Fibonacci Set',
        code: `
const fibonacciSet = {
    name: 'Fibonacci',
    generate: (num) => {
        if (num === 0) return 0;
        const arr = [0, 1];
        let counter = 2;
        while (counter <= num) {
            arr[counter] = arr[counter - 1] + arr[counter - 2]
            counter++
        }
        return arr
    }
}

render(
    <ComplexityChart title="Time complexity of Tim Sort">
        <ComplexitySeries/>
        <AnalysisSeries algorithms={[Algorithms.timSort]} dataSets={[DataSets.random, DataSets.sorted, fibonacciSet]}/>
    </ComplexityChart>
)`}, {
    name: 'Improved Quick Sort',
        code: `class ImprovedQuickSort extends Algorithm {

    constructor() {
        this.name = "Improved Quick Sort"
        this.timeComplexityBest = Complexities.linearithmic
        this.timeComplexityAverage = Complexities.linearithmic
        this.timeComplexityWorst = Complexities.quadratic
    }

    execute(array) {
        this.quickSort(array, 0, array.length - 1);
    }
    
    quickSort(items, left, right) {
        this.incrementOpCounter()
        var index;
        if (items.length > 1) {
            index = this.partition(items, left, right); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                this.quickSort(items, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                this.quickSort(items, index, right);
            }
        }
        return items;
    }
    
    partition(items, left, right) {
        var pivot   = items[Math.floor((right + left) / 2)], //middle element
            i       = left, //left pointer
            j       = right; //right pointer
        while (i <= j) {
            this.incrementOpCounter()
            while (items[i] < pivot) {
                this.incrementOpCounter()
                i++;
            }
            while (items[j] > pivot) {
                this.incrementOpCounter()
                j--;
            }
            if (i <= j) {
                this.swap(items, i, j); //sawpping two elements
                i++;
                j--;
            }
        }
        return i;
    }
    
    swap(items, leftIndex, rightIndex){
        var temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
    }
}

render(
    <ComplexityChart title="Time complexity of Improved Quick Sort vs Naive Quick Sort">
        <ComplexitySeries/>
        <AnalysisSeries algorithms={[new ImprovedQuickSort(), Algorithms.quickSort]} dataSets={DataSets.all}/>
    </ComplexityChart>
)`
    }
]

export default examples