/** @jsx jsx */
import React from 'react'
import { useColorMode, jsx } from 'theme-ui';
import Highcharts from 'highcharts'
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, Tooltip
} from 'react-jsx-highcharts'
import darkTheme from '../dark-theme'
import applyExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
    applyExporting(Highcharts)
}

const plotOptions: Highcharts.PlotOptions = {
    area: {
        lineWidth: 0,
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false,
        showInLegend: false,
        dataLabels: {
            enabled: false,
            crop: false,
            allowOverlap: true,
            overflow: 'allow',
            align: 'left',
            verticalAlign: 'middle',
            format: `{series.userOptions.notation}`
        },
    },
    scatter: {
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'O({point.x}) = {point.y}'
        },
    },
}

type ComplexityChartProps = {
    title: string,
    children: React.ReactNode
}

const ComplexityChart = (props:ComplexityChartProps) => {
    const [colorMode] = useColorMode()
    const isDark = colorMode === `dark`

    const setTheme = (chart:Highcharts.Chart) => {
        if(isDark) {
            // @todo fix this ugly lifecycle hack
            setTimeout(() => chart.update(darkTheme), 1)
        }
    }

    return <HighchartsChart plotOptions={plotOptions} callback={setTheme} key={colorMode} sx={{ backgroundColor: 'chart' }}>
        <Chart marginRight="70" zoomType="xy" backgroundColor="transparent"/>
        <Title>{props.title}</Title>
        <Legend/>
        <Tooltip/>
        <XAxis type="logarithmic" min="10" max="10000">
            <XAxis.Title>Elements (n)</XAxis.Title>
        </XAxis>
        <YAxis type="logarithmic" min="1" max="100000000">
            <YAxis.Title>Operations (O)</YAxis.Title>
            {props.children}
        </YAxis>
    </HighchartsChart>
}
export default withHighcharts(ComplexityChart, Highcharts)