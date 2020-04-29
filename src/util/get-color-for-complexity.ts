import { ColorMode, Theme } from "theme-ui"
import * as CSS from "csstype"
import { alpha } from "@theme-ui/color"
import { Complexity } from "../complexities"

export default (theme: Theme, complexity: Complexity): CSS.ColorProperty =>
  alpha((theme.colors?.complexities as ColorMode)[complexity.rating] as string, 0.6)(theme)
