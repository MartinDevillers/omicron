interface Node<T> {
  value: T
  prev: Node<T>
  next: Node<T>
}

export default class DoublyLinkedLoop<T> {
  root!: Node<T>
  length: number

  constructor(array: T[]) {
    this.length = 0
    array.forEach(this.add.bind(this))
  }

  add(item: T) {
    const node = {
      value: item,
    } as Node<T>
    if (this.length === 0) {
      // eslint-disable-next-line no-multi-assign
      node.prev = node.next = this.root = node
    } else {
      const last = this.root.prev
      this.root.prev = node
      last.next = node
      node.prev = last
      node.next = this.root
    }
    this.length++
  }

  find(item: T): Node<T> | undefined {
    let node = this.root
    for (let i = 0; i < this.length; i++) {
      if (node.value === item) {
        return node
      }
      node = node.next
    }
    return undefined
  }

  contains(item: T): boolean {
    return this.find(item) !== undefined
  }

  next(item: T): T | undefined {
    const node = this.find(item)
    return node?.next?.value
  }

  prev(item: T): T | undefined {
    const node = this.find(item)
    return node?.prev?.value
  }
}
