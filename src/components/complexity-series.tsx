import { useThemeUI } from "theme-ui"
import { AreaSeries } from "react-jsx-highcharts"
import React from "react"
import { Complexities } from "../complexities"

const ComplexitySeries = () => {
  const { theme } = useThemeUI()
  const xPoints = Array.from({ length: 42 }, (v, i) => Math.min(10000, 2 ** i / 3))
  const complexitySeries = Complexities.common.map((r) => (
    <AreaSeries
      key={r.name}
      name={r.name}
      color={theme.colors.complexities[r.rating]}
      notation={r.notation}
      data={xPoints.map((x) => ({ x, y: r.calculate(x) }))}
    />
  ))
  complexitySeries.forEach((x) =>
    Object.assign(x.props.data[x.props.data.length - 1], { dataLabels: { enabled: true } })
  )
  return complexitySeries
}

export default ComplexitySeries
