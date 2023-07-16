import { ActionType } from "../action-types"
import { BlockTypes } from "../block"

export interface InsertBlockAfterAction {
  type: ActionType.INSERT_BLOCK_AFTER
  payload: {
    type: BlockTypes
    content: string
  }
}

export interface DeleteBlockAction {
  type: ActionType.DELETE_BLOCK
  payload: {
    type: BlockTypes
    id: string
  }
}

export type Action = InsertBlockAfterAction | DeleteBlockAction
