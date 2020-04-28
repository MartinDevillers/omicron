import { ScatterSeries, ErrorBarSeries, ErrorBarPoint } from "react-jsx-highcharts"
import React from "react"
import Highcharts from "highcharts"
import addHighchartsMore from "highcharts/highcharts-more"
import analyzer, { Analysis } from "../analyzer"
import { DataSet } from "../data-sets"
import Algorithm from "../algorithms/algorithm"

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

const prepareAnalysisData = (props: AnalysisSeriesProps) =>
  props.data ? props.data : analyzer(props.algorithms, props.dataSets, props.sizes, props.scatter)

const AnalysisSeries = (props: AnalysisSeriesProps) =>
  prepareAnalysisData(props).reduce((series, current) => {
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
    if (props.showRange)
      errorSeries.props.data.push({
        x: current.dataSetSize,
        low: current.expectedOperationsBest,
        high: current.expectedOperationsWorst,
      } as ErrorBarPoint)
    return series
  }, [] as React.ReactElement<Highcharts.Series>[])

export default AnalysisSeries
