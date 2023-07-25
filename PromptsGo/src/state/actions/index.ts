import { ActionType } from "../action-types"
import { BlockTypes } from "../block"

export interface InsertBlockAfterAction {
  type: ActionType.INSERT_BLOCK_AFTER
  payload: {
    type: BlockTypes
    content: string
    detail: string
  }
}

export interface DeleteBlockAction {
  type: ActionType.DELETE_BLOCK
  payload: {
    type: BlockTypes
    id: string
  }
}

export interface UpdateBlockAction {
  type: ActionType.UPDATE_BLOCK
  payload: {
    id: string
    detail: string
  }
}

export interface ClearAction {
  type: ActionType.CLEAR
}

export type Action =
  | InsertBlockAfterAction
  | DeleteBlockAction
  | UpdateBlockAction
  | ClearAction
