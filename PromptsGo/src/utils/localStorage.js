export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) {
      return undefined
    }
    const persistedState = JSON.parse(serializedState)
    return { blocks: { dataset: persistedState.dataset } }
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
    console.log("State saved to local storage")
  } catch (err) {
    // Ignore write errors.
  }
}
