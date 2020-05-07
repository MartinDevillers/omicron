import { ScatterSeries, ErrorBarSeries } from "react-jsx-highcharts"
import React, { useEffect } from "react"
import Highcharts from "highcharts"
import addHighchartsMore from "highcharts/highcharts-more"
import analyzer, { Analysis } from "../analyzer"
import { DataSet } from "../data-sets"
import Algorithm from "../algorithms/algorithm"
import Stopwatch from "../util/stopwatch"

if (typeof Highcharts === "object") {
  addHighchartsMore(Highcharts)
}

const keyify = (key: string, name: string) => `${key}-${name}`.replace(" ", "-").toLowerCase()

type AnalysisSeriesProps = {
  data: Analysis[]
  algorithms: Algorithm[]
  dataSets: DataSet[]
  sizes: number[]
  scatter: boolean
  showRange: boolean
}

const prepareAnalysisData = async (props: AnalysisSeriesProps) =>
  props.data ? props.data : analyzer(props.algorithms, props.dataSets, props.sizes, props.scatter)

const AnalysisSeries = (props: AnalysisSeriesProps) => {
  const [analysis, setAnalysis] = React.useState([
    {
      name: "Loading",
      dataSetName: "Loading",
      dataSetSize: 0,
      algorithm: "Loading",
      actualOperations: 0,
      expectedOperationsWorst: 0,
      expectedOperationsBest: 0,
      expectedOperationsAverage: 0,
    },
  ] as Analysis[])

  useEffect(() => {
    ;(async function runAnalysis() {
      const stopwatch = new Stopwatch("Analyzer")
      const data = await analyzer(props.algorithms, props.dataSets, props.sizes, props.scatter)
      stopwatch.stop()
      setAnalysis(data)
    })()
  }, [])

  return analysis.reduce((series, current) => {
    const scatterKey = keyify("scatter", current.name)
    const errorKey = keyify("error", current.name)
    let scatterSeries = series.find((s) => s.key === scatterKey)
    let errorSeries = series.find((s) => s.key === errorKey)
    if (scatterSeries === undefined) {
      scatterSeries = <ScatterSeries name={current.name} key={scatterKey} data={[]} />
      errorSeries = <ErrorBarSeries name={current.name} key={errorKey} data={[]} />
      series.push(scatterSeries)
      if (props.showRange) series.push(errorSeries)
    }
    scatterSeries.props.data.push({ x: current.dataSetSize, y: current.actualOperations } as Highcharts.Point)
    if (props.showRange && errorSeries)
      errorSeries.props.data.push({
        x: current.dataSetSize,
        low: current.expectedOperationsBest,
        high: current.expectedOperationsWorst,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any) // @todo find a better solution for this
    return series
  }, [] as React.ReactElement<Highcharts.Series>[])
}

export default AnalysisSeries
