import { combineReducers } from "redux"
import blocksReducers from "./blocksReducers"

const reducers = combineReducers({
  blocks: blocksReducers,
})

export default reducers
export type RootState = ReturnType<typeof reducers>
