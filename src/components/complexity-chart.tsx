/** @jsx jsx */
import React from "react"
import { useMediaQuery } from "react-responsive"
import { useColorMode, useThemeUI, jsx } from "theme-ui"
import Highcharts from "highcharts"
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Legend,
  Tooltip,
  Loading,
} from "react-jsx-highcharts"
import applyExporting from "highcharts/modules/exporting"
import darkTheme from "../dark-theme"

if (typeof Highcharts === "object") {
  applyExporting(Highcharts)
}

const plotOptions: Highcharts.PlotOptions = {
  area: {
    lineWidth: 0,
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        lineWidth: 0,
      },
    },
    enableMouseTracking: false,
    showInLegend: false,
    dataLabels: {
      enabled: false,
      crop: false,
      allowOverlap: true,
      overflow: "allow",
      align: "left",
      verticalAlign: "middle",
      format: `{series.userOptions.notation}`,
    },
  },
  scatter: {
    tooltip: {
      headerFormat: "<b>{series.name}</b><br>",
      pointFormat: "O({point.x}) = {point.y}",
    },
  },
}

type ComplexityChartProps = {
  title: string
  children: React.ReactNode
}

const ComplexityChart = ({ title, children }: ComplexityChartProps) => {
  const { theme } = useThemeUI()
  const isDesktop = useMediaQuery({ minDeviceWidth: theme.breakpoints?.[0] as string })
  const yAxisLabels = isDesktop ? { rotation: 0, padding: 5, x: -8 } : { rotation: -90, padding: 0, x: -3 }
  const titleStyle = isDesktop ? { fontSize: theme.fontSizes?.[2] } : { fontSize: theme.fontSizes?.[1] }
  const chartMarginRight = isDesktop ? 70 : 65
  const chartSpacing = isDesktop ? [10, 10, 15, 10] : [10, 5, 15, 5]
  const [colorMode] = useColorMode()
  const isDark = colorMode === `dark`

  const setTheme = (chart: Highcharts.Chart) => {
    if (isDark) {
      const loadingStyle = {
        loading: {
          style: {
            backgroundColor: theme.colors?.chart,
          },
        },
      }
      chart.update(loadingStyle)
      // @todo fix this ugly lifecycle hack
      setTimeout(() => chart.update(darkTheme), 1)
    }
  }

  return (
    <HighchartsChart plotOptions={plotOptions} callback={setTheme} key={colorMode} sx={{ backgroundColor: "chart" }}>
      <Chart marginRight={chartMarginRight} spacing={chartSpacing} zoomType="xy" backgroundColor="transparent" />
      <Title style={titleStyle}>{title}</Title>
      <Loading>Running analysis...</Loading>
      <Legend />
      <Tooltip />
      <XAxis type="logarithmic" min={10} max={10000}>
        <XAxis.Title>Elements (n)</XAxis.Title>
      </XAxis>
      <YAxis type="logarithmic" min={10} max={100000000} labels={yAxisLabels}>
        {isDesktop && <YAxis.Title>Operations (O)</YAxis.Title>}
        {children}
      </YAxis>
    </HighchartsChart>
  )
}
export default withHighcharts(ComplexityChart, Highcharts)
