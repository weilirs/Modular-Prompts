import { createStore } from "redux"
import reducers from "./reducers"
import { loadState, saveState } from "../utils/localStorage"
import throttle from "lodash/throttle"

const persistedState = loadState()

export const store = createStore(reducers, persistedState)

store.subscribe(
  throttle(() => {
    saveState({
      dataset: store.getState().blocks.dataset,
    })
  }, 1000)
)
