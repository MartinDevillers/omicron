/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "react-jsx-highcharts"
declare module "@mdx-js/react" {
  export const MDXProvider: (props: any) => JSX.Element
}
declare module "*.mdx" {
  const MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}
