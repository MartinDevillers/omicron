/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Flex, Box, Heading, Close, Divider, Label, Radio } from "@theme-ui/components"
import {
  PreanalyzedMode,
  WebWorkerMode,
  usePreanalyzedMode,
  useWebWorkerMode,
  useStopwatchMode,
  StopwatchMode,
} from "../settings"

type DebugModalProps = {
  onClose: () => void
}

export default ({ onClose }: DebugModalProps) => {
  const [preanalyzedMode, setPreanalyzedMode] = usePreanalyzedMode()
  const [webWorkerMode, setWebWorkerMode] = useWebWorkerMode()
  const [stopwatchMode, setStopwatchMode] = useStopwatchMode()

  const changePreanalyzedMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as PreanalyzedMode
    setPreanalyzedMode(value)
  }

  const changeWebWorkerMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value
    setWebWorkerMode(value)
  }

  const changeStopwatchMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as StopwatchMode
    setStopwatchMode(value)
  }

  const styles = {
    position: "fixed",
    zIndex: 1,
    backgroundColor: "background",
    borderWidth: "px",
    borderStyle: "solid",
    borderColor: "primary",
    borderRadius: "lg",
    padding: 3,
    width: "340px",
    boxShadow: "md",
  }

  return (
    <Box as="form" onSubmit={(e) => e.preventDefault()} sx={styles}>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading>Debug Settings</Heading>
        <Close sx={{ size: 8 }} onClick={onClose} />
      </Flex>
      <Divider mx={0} />
      <Label htmlFor="preanalyzed">Pre-analyzed</Label>
      <Flex mb={3}>
        <Label>
          <Radio
            name="preanalyzed"
            value={PreanalyzedMode.Enabled}
            defaultChecked={preanalyzedMode === PreanalyzedMode.Enabled}
            onChange={changePreanalyzedMode}
          />{" "}
          Enabled
        </Label>
        <Label>
          <Radio
            name="preanalyzed"
            value={PreanalyzedMode.Disabled}
            defaultChecked={preanalyzedMode === PreanalyzedMode.Disabled}
            onChange={changePreanalyzedMode}
          />{" "}
          Disabled
        </Label>
        <Label>
          <Radio
            name="preanalyzed"
            value={PreanalyzedMode.Persist}
            defaultChecked={preanalyzedMode === PreanalyzedMode.Persist}
            onChange={changePreanalyzedMode}
          />{" "}
          Persist
        </Label>
      </Flex>
      <Label htmlFor="webworkers">Web Workers</Label>
      <Flex mb={3}>
        <Label>
          <Radio
            name="webworkers"
            value={WebWorkerMode.Enabled}
            defaultChecked={webWorkerMode === WebWorkerMode.Enabled}
            onChange={changeWebWorkerMode}
          />{" "}
          Enabled
        </Label>
        <Label>
          <Radio
            name="webworkers"
            value={WebWorkerMode.Disabled}
            defaultChecked={webWorkerMode === WebWorkerMode.Disabled}
            onChange={changeWebWorkerMode}
          />{" "}
          Disabled
        </Label>
        <Label>
          <Radio
            name="webworkers"
            value={WebWorkerMode.XLOnly}
            defaultChecked={webWorkerMode === WebWorkerMode.XLOnly}
            onChange={changeWebWorkerMode}
          />{" "}
          XL only
        </Label>
      </Flex>
      <Label htmlFor="stopwatch">Stopwatch</Label>
      <Flex mb={3}>
        <Label>
          <Radio
            name="stopwatch"
            value={StopwatchMode.None}
            defaultChecked={stopwatchMode === StopwatchMode.None}
            onChange={changeStopwatchMode}
          />{" "}
          None
        </Label>
        <Label>
          <Radio
            name="stopwatch"
            value={StopwatchMode.Analyzer}
            defaultChecked={stopwatchMode === StopwatchMode.Analyzer}
            onChange={changeStopwatchMode}
          />{" "}
          Analyzer
        </Label>
        <Label>
          <Radio
            name="stopwatch"
            value={StopwatchMode.Algorithm}
            defaultChecked={stopwatchMode === StopwatchMode.Algorithm}
            onChange={changeStopwatchMode}
          />{" "}
          Algorithm
        </Label>
      </Flex>
    </Box>
  )
}
