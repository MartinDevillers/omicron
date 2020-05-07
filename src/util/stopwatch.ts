export default class Stopwatch {
  private mark: string

  constructor(name: string) {
    const byteArray = new Uint32Array(1)
    const hash = crypto.getRandomValues(byteArray)[0].toString(16)
    this.mark = `${name}-${hash}`
    performance.mark(this.mark)
  }

  stop() {
    performance.mark(this.mark)
    const marks = performance.getEntriesByName(this.mark)
    console.info(`${this.mark}: ${marks[1].startTime - marks[0].startTime}`)
  }
}
