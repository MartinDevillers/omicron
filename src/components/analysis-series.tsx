import { ScatterSeries, ErrorBarSeries, useChart } from "react-jsx-highcharts"
import React, { useEffect } from "react"
import Highcharts from "highcharts"
import addHighchartsMore from "highcharts/highcharts-more"
import analyzer, { Analysis } from "../analyzer"
import { DataSet } from "../data-sets"
import Algorithm from "../algorithms/algorithm"
import Stopwatch from "../util/stopwatch"
import { persist, preanalyzed } from "../preanalyzed"
import { PreanalyzedMode, StopwatchMode, usePreanalyzedMode, useStopwatchMode, useWebWorkerMode } from "../settings"

if (typeof Highcharts === "object") {
  addHighchartsMore(Highcharts)
}

const keyify = (key: string, name: string) => `${key}-${name}`.replace(" ", "-").toLowerCase()

type AnalysisSeriesProps = {
  id: string
  data: Analysis[]
  algorithms: Algorithm[]
  dataSets: DataSet[]
  sizes: number[]
  scatter: boolean
  showRange: boolean
}

const AnalysisSeries = (props: AnalysisSeriesProps) => {
  const chart = useChart()
  const [analysis, setAnalysis] = React.useState([] as Analysis[])
  const [preanalyzedMode] = usePreanalyzedMode()
  const [webWorkerMode] = useWebWorkerMode()
  const [stopwatchMode] = useStopwatchMode()

  useEffect(() => {
    // @todo this hack is definitely NSFW; actually I should rewrite this whole part
    setTimeout(() => {
      ;(async function runAnalysis() {
        let data = preanalyzed(props.id)
        if (preanalyzedMode !== PreanalyzedMode.Enabled || !data) {
          const stopwatch = new Stopwatch("Analyzer")
          data = await analyzer(props.algorithms, props.dataSets, props.sizes, props.scatter, webWorkerMode)
          if (stopwatchMode === StopwatchMode.Analyzer) {
            stopwatch.stop()
          }
          if (preanalyzedMode === PreanalyzedMode.Persist) {
            persist(props.id, data)
          }
        }
        chart.hideLoading()
        setAnalysis(data)
      })()
    }, 1)
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
