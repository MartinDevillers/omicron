/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Button, Label, Checkbox, Select, Flex, Box, Grid, Divider} from '@theme-ui/components'
import React from "react"
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview
} from 'react-live'
import theme from "prism-react-renderer/themes/nightOwl"
import { tint } from "@theme-ui/color"

import Algorithm from "../algorithms/algorithm";
import ComplexityChart from "./complexity-chart"
import AnalysisSeries from "./analysis-series"
import ComplexitySeries from "./complexity-series"
import Algorithms from "../algorithms"
import DataSets from "../data-sets"
import Complexities from "../complexities"
import examples from "../live-examples"

const scope = {Algorithm, ComplexityChart, AnalysisSeries, ComplexitySeries, Algorithms, DataSets, Complexities}

const LiveAlgorithm = () => {
    const [selectedExample, setSelectedExample] = React.useState('0')
    const [codeEditor, setCodeEditor] = React.useState(examples[0].code)
    const [codePreview, setCodePreview] = React.useState(examples[0].code)
    const [isLiveModeEnabled, setLiveMode] = React.useState(true)

    const changeLiveUpdateEnabled = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLiveMode(event.target.checked)
    }

    const changeSelectedExample = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedExample(event.target.value)
    }

    const onCodeChanged = (code: string) => {
        setCodeEditor(code)
        if (isLiveModeEnabled)
            setCodePreview(code)
    }

    const updatePreview = () => {
        setCodePreview(codeEditor)
    }

    const loadExample = () => {
        const example = examples[+selectedExample]
        setCodeEditor(example.code)
        setCodePreview(example.code)
    }

    return (<div>
        <div className="code-title">
            <div>Live Editor</div>
        </div>
        <LiveProvider code={codeEditor} theme={theme} scope={scope} noInline>
            <LiveEditor data-name="live-editor" onChange={onCodeChanged}/>
            <LiveError sx={{backgroundColor: 'background'}}/>
        </LiveProvider>
        <LiveProvider code={codePreview} theme={theme} scope={scope} noInline>
            <Flex sx={{ p: 3, mx: [0,0,0,-3], backgroundColor: 'toolbar' }} pb={0}>
                <Box>
                    <Button disabled={isLiveModeEnabled} variant={isLiveModeEnabled ? 'disabled' : 'simple'}
                            onClick={updatePreview}>Update chart</Button>
                </Box>
                <Box p={2}>
                    <Label>
                        <Checkbox checked={isLiveModeEnabled} onChange={changeLiveUpdateEnabled}/>
                        Live mode
                    </Label>
                </Box>
                <Box pr={3}>
                    <Select defaultValue='Awesome Sort' sx={{width: '48'}} onChange={changeSelectedExample}>
                        {examples.map((e, i) => <option key={i} value={i}>{e.name}</option>)}
                    </Select>
                </Box>
                <Box>
                    <Button variant="simple" onClick={loadExample}>Load example</Button>
                </Box>
            </Flex>
            <LivePreview sx={{ pt: 0, mx: [0,0,0,-3] }}/>
        </LiveProvider>
    </div>)
}

export default LiveAlgorithm