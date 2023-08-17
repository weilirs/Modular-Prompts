import { DataType } from "../data/DataType"

export const loadState = (): { blocks: { dataset: DataType } } | undefined => {
  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) {
      return undefined
    }
    const persistedState = JSON.parse(serializedState) as { dataset: DataType }
    return { blocks: { dataset: persistedState.dataset } }
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: { blocks: { dataset: DataType } }) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
    console.log("State saved to local storage")
  } catch (err) {
    // Ignore write errors.
  }
}
