import { Dispatch, useState } from "react"

function useLocalStorageBackedEnum<TEnum extends string, TEnumValue extends number | string>(
  key: string,
  enumType: { [key in TEnum]: TEnumValue },
  defaultValue: TEnumValue
): [TEnumValue, Dispatch<TEnumValue>] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item === null) return defaultValue
      return (Number.isNaN(Number(item)) ? item : +item) as TEnumValue
    } catch (error) {
      console.log(error)
      return defaultValue
    }
  })

  const setValue = (value: TEnumValue) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, value.toString())
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

export enum PreanalyzedMode {
  Enabled = "enabled",
  Disabled = "disabled",
  Persist = "persist",
}

export enum WebWorkerMode {
  Enabled = 0,
  Disabled = 99999999999999,
  XLOnly = 1000000,
}

export enum StopwatchMode {
  None = "none",
  Analyzer = "analyzer",
  Algorithm = "algorithm",
}

export enum DataSetSize {
  Small = 100,
  Medium = 1000,
  Large = 10000,
}

export const usePreanalyzedMode = () =>
  useLocalStorageBackedEnum("preanalyzed-mode", PreanalyzedMode, PreanalyzedMode.Enabled)
export const useWebWorkerMode = () =>
  useLocalStorageBackedEnum("web-worker-mode", WebWorkerMode, WebWorkerMode.Disabled)
export const useStopwatchMode = () => useLocalStorageBackedEnum("stopwatch-mode", StopwatchMode, StopwatchMode.None)
export const useDataSetSize = () => useLocalStorageBackedEnum("data-set-size", DataSetSize, DataSetSize.Large)
