/** @jsx jsx */
import React from "react"
import Algorithms from "../algorithms"
import { jsx, Styled } from 'theme-ui'
import { alpha } from '@theme-ui/color'

const rows = Algorithms.all.map(x =>
    <Styled.tr>
        <Styled.td>{x.name}</Styled.td>
        <Styled.td sx={{ color: 'heading', backgroundColor: theme => `${alpha(theme.colors.complexities[x.timeComplexityBest.rating], 0.6)(theme)}` }}><code>{x.timeComplexityBest.notation}</code></Styled.td>
        <Styled.td sx={{ color: 'heading', backgroundColor: theme => `${alpha(theme.colors.complexities[x.timeComplexityAverage.rating], 0.6)(theme)}` }}><code>{x.timeComplexityAverage.notation}</code></Styled.td>
        <Styled.td sx={{ color: 'heading', backgroundColor: theme => `${alpha(theme.colors.complexities[x.timeComplexityWorst.rating], 0.6)(theme)}` }}><code>{x.timeComplexityWorst.notation}</code></Styled.td>
    </Styled.tr>
)

const ComplexityTable = () => (
    <Styled.table role="table">
        <thead>
            <Styled.tr>
                <Styled.th>Name</Styled.th>
                <Styled.th>Best</Styled.th>
                <Styled.th>Average</Styled.th>
                <Styled.th>Worst</Styled.th>
            </Styled.tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </Styled.table>
)

export default ComplexityTable