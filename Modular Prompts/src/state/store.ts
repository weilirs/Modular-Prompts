import blocksReducers from "./reducers/blocksReducers"
import { configureStore } from "@reduxjs/toolkit"

import { loadState, saveState } from "../utils/localStorage"
import _ from "lodash"
export const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    blocks: blocksReducers,
  },
})
store.subscribe(
  _.throttle(() => {
    saveState({
      blocks: {
        dataset: store.getState().blocks.dataset,
      },
    })
  }, 1000)
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
