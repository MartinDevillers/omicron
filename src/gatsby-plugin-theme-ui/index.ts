// @ts-ignore
import baseTheme from '@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui'

export default {
    ...baseTheme,
    colors: {
        ...baseTheme.colors,
        toolbar: '#d2c7ec',
        chart: '#fff',
        //tinted: baseTheme.colors.purple[7],
        complexities: {
            bad: '#f8a6a9',
            poor: '#ffd0ae',
            fair: '#fffad2',
            good: '#d4e0b1',
            excellent: '#a5c796'
        },
        modes: {
            dark: {
                ...baseTheme.colors.modes.dark,
                toolbar: '#4b3187',
                chart: '#2d3748',//'#2d3748', 011627
                complexities: {
                    bad: '#8d5e60',
                    poor: '#ba8d7a',
                    fair: '#dfc29b',
                    good: '#878a5a',
                    excellent: '#2e552d'
                },
            }
        }
    }
}