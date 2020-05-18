import React from "react"
import { Grid, Box } from "theme-ui"
import { DataSets } from "../data-sets"
import { sequenceness, sortedness, uniqueness } from "../util/array-stats"

const formatPercentage = (percentage: number) => `${(percentage * 100).toFixed()}%`

const styles = {
  fontSize: [1, 1, 2],
  paddingLeft: [1, 2, 3],
  borderLeftColor: `primary`,
  borderLeftStyle: `solid`,
  borderLeftWidth: `6px`,
  ">:nth-child(odd)": {
    color: "primary",
  },
  ">:nth-child(even)": {
    paddingLeft: [1, 2, 3],
    borderLeftColor: `divide`,
    borderLeftStyle: `solid`,
    borderLeftWidth: `px`,
    borderBottomColor: `divide`,
    borderBottomStyle: `solid`,
    borderBottomWidth: `px`,
  },
}

const DataSetsDefinitions = () =>
  DataSets.all.map((x) => (
    <Grid key={x.name} gap={[1, 2, 2]} mb={[3, 4, 4]} columns="min-content auto" sx={styles}>
      <Box>Name</Box>
      <Box>{x.name}</Box>
      <Box>Description</Box>
      <Box>{x.description}</Box>
      <Box>Uniqueness</Box>
      <Box>{formatPercentage(uniqueness(x.generate(1000)))}</Box>
      <Box>Sortedness</Box>
      <Box>{formatPercentage(sortedness(x.generate(1000)))}</Box>
      <Box>Sequenceness</Box>
      <Box>{formatPercentage(sequenceness(x.generate(1000)))}</Box>
      <Box>
        Example <code>(n=30)</code>
      </Box>
      <Box>
        <code>
          [
          {x
            .generate(30)
            .map((y) => y.toFixed())
            .join(", ")}
          ]
        </code>
      </Box>
    </Grid>
  ))

export default DataSetsDefinitions
