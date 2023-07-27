import { createStore } from "redux"
import reducers from "./reducers"
import { loadState, saveState } from "../utils/localStorage"
import throttle from "lodash/throttle"

export const store = createStore(reducers)

store.subscribe(
  throttle(() => {
    saveState({
      dataset: store.getState().blocks.dataset,
    })
  }, 1000)
)
