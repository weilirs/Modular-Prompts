export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) {
      console.log("No state found in local storage")
      return undefined
    }
    console.log("State loaded from local storage")
    return JSON.parse(serializedState)
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
