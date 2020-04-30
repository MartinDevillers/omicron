/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Algorithms } from "../algorithms"
import getColorForComplexity from "../util/get-color-for-complexity"

const linkify = (name: string) => `/sorting/${name.toLowerCase().replace(" ", "-")}`

const rows = Algorithms.all.map((x) => (
  <Styled.tr key={x.name}>
    <Styled.td>
      <Styled.a href={linkify(x.name)}>{x.name}</Styled.a>
    </Styled.td>
    <Styled.td
      sx={{
        color: "heading",
        backgroundColor: (theme) => getColorForComplexity(theme, x.timeComplexityBest),
      }}
    >
      <code>{x.timeComplexityBest.notation}</code>
    </Styled.td>
    <Styled.td
      sx={{
        color: "heading",
        backgroundColor: (theme) => getColorForComplexity(theme, x.timeComplexityAverage),
      }}
    >
      <code>{x.timeComplexityAverage.notation}</code>
    </Styled.td>
    <Styled.td
      sx={{
        color: "heading",
        backgroundColor: (theme) => getColorForComplexity(theme, x.timeComplexityWorst),
      }}
    >
      <code>{x.timeComplexityWorst.notation}</code>
    </Styled.td>
  </Styled.tr>
))

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
    <tbody>{rows}</tbody>
  </Styled.table>
)

export default ComplexityTable
