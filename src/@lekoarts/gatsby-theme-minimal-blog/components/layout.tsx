import React from "react"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import { MDXProvider } from "@mdx-js/react"

import ComplexityChart from "../../../components/complexity-chart"
import AnalysisSeries from "../../../components/analysis-series"
import ComplexitySeries from "../../../components/complexity-series"
import ComplexityTable from "../../../components/complexity-table"
import DataSetsDefinitions from "../../../components/data-sets-definitions"
import LiveAlgorithm from "../../../components/live-algorithm"
// import Algorithms from "../../../algorithms"
// import DataSets from "../../../data-sets"

// @todo figure out a way to get the scope injected as well
// const scope = { Algorithms, DataSets }
const shortcodes = {
  ComplexityChart,
  AnalysisSeries,
  ComplexitySeries,
  ComplexityTable,
  DataSetsDefinitions,
  LiveAlgorithm,
}

type LayoutProps = { children: React.ReactNode; className?: string }

export default (props: LayoutProps) => (
  <MDXProvider components={shortcodes}>
    <Layout {...props} />
  </MDXProvider>
)
