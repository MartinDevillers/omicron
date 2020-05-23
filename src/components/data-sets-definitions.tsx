import React from "react"
import { Grid, Box, Button } from "theme-ui"
import { DataSet, DataSets } from "../data-sets"
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

const renderDataSet = (dataSet: DataSet) => (
  <Grid key={dataSet.name} gap={[1, 2, 2]} mb={[3, 4, 4]} columns="min-content auto" sx={styles}>
    <Box>Name</Box>
    <Box>{dataSet.name}</Box>
    <Box>Description</Box>
    <Box>{dataSet.description}</Box>
    <Box>Uniqueness</Box>
    <Box>{formatPercentage(uniqueness(dataSet.generate(1000)))}</Box>
    <Box>Sortedness</Box>
    <Box>{formatPercentage(sortedness(dataSet.generate(1000)))}</Box>
    <Box>Sequenceness</Box>
    <Box>{formatPercentage(sequenceness(dataSet.generate(1000)))}</Box>
    <Box>
      Example <code>(n=30)</code>
    </Box>
    <Box>
      <code>
        [
        {dataSet
          .generate(30)
          .map((y) => y.toFixed())
          .join(", ")}
        ]
      </code>
    </Box>
  </Grid>
)

const DataSetsDefinitions = () => {
  const reducer = (state: DataSet[]) => state.concat(DataSets.all.slice(state.length, state.length + 5))
  const [dataSets, showMoreDataSets] = React.useReducer(reducer, DataSets.all.slice(0, 5))
  const buttonVariant = dataSets.length < DataSets.all.length ? "outline" : "disabled"

  return (
    <>
      {dataSets.map(renderDataSet)}
      <Button variant={buttonVariant} onClick={showMoreDataSets}>Show more data sets</Button>
    </>
  )
}

export default DataSetsDefinitions
