/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useEffect } from "react"
import HeaderTitle from "@lekoarts/gatsby-theme-minimal-blog/src/components/header-title"
import { Flex, Button } from "@theme-ui/components"
import DebugModal from "../../../components/debug-modal"

export default () => {
  const [count, setCount] = React.useState(0)
  const [debugWindowVisible, setDebugWindowVisible] = React.useState(false)

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => Math.max(0, c - 1)), 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (count > 10) {
      setDebugWindowVisible(true)
      setCount(0)
    }
  }, [count])

  return (
    <Flex>
      <HeaderTitle />
      <Button onClick={() => setCount((c) => c + 2)} sx={{ background: "transparent", color: "transparent" }}>{count}</Button>
      {debugWindowVisible && <DebugModal onClose={() => setDebugWindowVisible(false)} />}
    </Flex>
  )
}
