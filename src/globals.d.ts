/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "react-jsx-highcharts"

declare module "@mdx-js/react" {
  export const MDXProvider: (props: any) => JSX.Element
}

declare module "*.mdx" {
  const MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare module "@theme-ui/color" {
  import type { Theme } from "theme-ui"

  export const alpha: (c: string, n: number) => (t: Theme) => string
}

declare module "@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui" {
  import type { Theme } from "theme-ui"
  import type * as CSS from "csstype"
  import type { ObjectOrArray } from "styled-system"

  type TailwindTheme = Theme & {
    inputs?: ObjectOrArray<CSS.StandardProperties>
    text?: ObjectOrArray<CSS.StandardProperties>
    dividers?: ObjectOrArray<CSS.StandardProperties>
    links?: ObjectOrArray<CSS.StandardProperties>
  }
  const theme: TailwindTheme
  export default theme
}

declare module "comlink-loader!*"
